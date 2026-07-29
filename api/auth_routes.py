from flask import (
    Blueprint,
    request,
    jsonify
)

from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)

from extensions import (
    db,
    limiter
)

from models.user import User, Role
from models.token_blocklist import TokenBlocklist


auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/v2/auth"
)


# ==========================================================
# REGISTER
# ==========================================================

@auth_bp.route("/register", methods=["POST"])
@limiter.limit("10 per minute")
def register():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({
            "error": "username, email and password are required"
        }), 400

    existing = User.query.filter(
        (User.username == username) |
        (User.email == email)
    ).first()

    if existing:
        return jsonify({
            "error": "User already exists"
        }), 400

    user = User(
        username=username,
        email=email,
        role=Role.USER,
        is_active=True,
        timezone="UTC"
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully"
    }), 201


# ==========================================================
# LOGIN
# ==========================================================

@auth_bp.route("/login", methods=["POST"])
@limiter.limit("5 per minute")
def login():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "Request body is required"
        }), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "error": "Email and password are required"
        }), 400

    user = User.query.filter_by(
        email=email
    ).first()

    if not user or not user.check_password(password):
        return jsonify({
            "error": "Invalid credentials"
        }), 401

    if not user.is_active:
        return jsonify({
            "error": "Account is disabled"
        }), 403

    claims = {
        "role": user.role.value
    }

    access_token = create_access_token(
        identity=str(user.id),
        additional_claims=claims
    )

    refresh_token = create_refresh_token(
        identity=str(user.id),
        additional_claims=claims
    )

    return jsonify({
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role.value,
            "is_active": user.is_active
        }
    }), 200


# ==========================================================
# REFRESH TOKEN
# ==========================================================

@auth_bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)
def refresh():

    current_user = get_jwt_identity()

    user = db.session.get(
        User,
        int(current_user)
    )

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    if not user.is_active:
        return jsonify({
            "error": "Account is disabled"
        }), 403

    new_access_token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role.value
        }
    )

    return jsonify({
        "access_token": new_access_token
    }), 200


# ==========================================================
# LOGOUT
# ==========================================================

@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():

    jti = get_jwt()["jti"]

    db.session.add(
        TokenBlocklist(
            jti=jti
        )
    )

    db.session.commit()

    return jsonify({
        "message": "Logout successful"
    }), 200