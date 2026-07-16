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

from models.user import User
from models.token_blocklist import TokenBlocklist


auth_bp = Blueprint(
    "auth",
    __name__
)


@auth_bp.route(
    "/register",
    methods=["POST"]
)
@limiter.limit("10 per minute")
def register():

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:

        return jsonify(
            {
                "error": "username, email and password are required"
            }
        ), 400

    existing = User.query.filter(
        (User.username == username) |
        (User.email == email)
    ).first()

    if existing:

        return jsonify(
            {
                "error": "User already exists"
            }
        ), 400

    user = User(
        username=username,
        email=email
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify(
        {
            "message": "User registered successfully"
        }
    ), 201


@auth_bp.route(
    "/login",
    methods=["POST"]
)
@limiter.limit("5 per minute")
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(
        email=email
    ).first()

    if not user or not user.check_password(password):

        return jsonify(
            {
                "error": "Invalid credentials"
            }
        ), 401

    access_token = create_access_token(
        identity=str(user.id)
    )

    refresh_token = create_refresh_token(
        identity=str(user.id)
    )

    return jsonify(
        {
            "access_token": access_token,
            "refresh_token": refresh_token
        }
    )


@auth_bp.route(
    "/refresh",
    methods=["POST"]
)
@jwt_required(refresh=True)
@limiter.limit("10 per minute")
def refresh():

    current_user = get_jwt_identity()

    access_token = create_access_token(
        identity=current_user
    )

    return jsonify(
        {
            "access_token": access_token
        }
    )


@auth_bp.route(
    "/profile",
    methods=["GET"]
)
@jwt_required()
@limiter.limit("30 per minute")
def profile():

    current_user_id = get_jwt_identity()

    user = User.query.get(
        int(current_user_id)
    )

    if not user:

        return jsonify(
            {
                "error": "User not found"
            }
        ), 404

    return jsonify(
        {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    )


@auth_bp.route(
    "/logout",
    methods=["POST"]
)
@jwt_required()
@limiter.limit("20 per minute")
def logout():

    jti = get_jwt()["jti"]

    db.session.add(
        TokenBlocklist(jti=jti)
    )

    db.session.commit()

    return jsonify(
        {
            "message": "Logout successful"
        }
    ), 200