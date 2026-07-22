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


# ==========================
# REGISTER
# ==========================

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
        ),400


    existing = User.query.filter(
        (User.username == username) |
        (User.email == email)
    ).first()


    if existing:

        return jsonify(
            {
                "error": "User already exists"
            }
        ),400


    user = User(
        username=username,
        email=email
    )

    user.set_password(password)


    db.session.add(user)
    db.session.commit()


    return jsonify(
        {
            "message":"User registered successfully"
        }
    ),201



# ==========================
# LOGIN
# ==========================

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
                "error":"Invalid credentials"
            }
        ),401


    return jsonify(
        {
            "access_token":create_access_token(
                identity=str(user.id)
            ),

            "refresh_token":create_refresh_token(
                identity=str(user.id)
            )
        }
    )



# ==========================
# REFRESH TOKEN
# ==========================

@auth_bp.route(
    "/refresh",
    methods=["POST"]
)
@jwt_required(refresh=True)
def refresh():

    current_user = get_jwt_identity()


    return jsonify(
        {
            "access_token":
            create_access_token(
                identity=current_user
            )
        }
    )



# ==========================
# GET PROFILE
# ==========================

@auth_bp.route(
    "/profile",
    methods=["GET"]
)
@jwt_required()
def profile():

    user_id = int(
        get_jwt_identity()
    )


    user = User.query.get(user_id)


    if not user:

        return jsonify(
            {
                "error":"User not found"
            }
        ),404


    return jsonify(
        user.to_dict()
    ),200



# ==========================
# UPDATE PROFILE
# ==========================

@auth_bp.route(
    "/profile",
    methods=["PUT"]
)
@jwt_required()
def update_profile():

    user_id = int(
        get_jwt_identity()
    )


    user = User.query.get(user_id)

    if not user:

        return jsonify(
            {
                "error":"User not found"
            }
        ),404


    data = request.get_json()


    if "username" in data:
        user.username = data["username"]


    if "email" in data:
        user.email = data["email"]


    if "timezone" in data:
        user.timezone = data["timezone"]


    db.session.commit()


    return jsonify(
        {
            "message":"Profile updated",
            "user":user.to_dict()
        }
    ),200



# ==========================
# CHANGE PASSWORD
# ==========================

@auth_bp.route(
    "/profile/password",
    methods=["PUT"]
)
@jwt_required()
def change_password():

    user_id = int(
        get_jwt_identity()
    )


    user = User.query.get(user_id)


    data = request.get_json()


    current_password = data.get(
        "current_password"
    )

    new_password = data.get(
        "new_password"
    )


    if not user.check_password(
        current_password
    ):

        return jsonify(
            {
                "error":"Current password incorrect"
            }
        ),400


    user.set_password(
        new_password
    )


    db.session.commit()


    return jsonify(
        {
            "message":"Password changed successfully"
        }
    ),200



# ==========================
# UPDATE WEBHOOK
# ==========================

@auth_bp.route(
    "/profile/webhook",
    methods=["PUT"]
)
@jwt_required()
def update_webhook():

    user_id = int(
        get_jwt_identity()
    )


    user = User.query.get(user_id)


    data = request.get_json()


    user.webhook_url = data.get(
        "webhook_url"
    )


    db.session.commit()


    return jsonify(
        {
            "message":"Webhook updated",
            "webhook_url":user.webhook_url
        }
    ),200



# ==========================
# DELETE ACCOUNT
# ==========================

@auth_bp.route(
    "/profile",
    methods=["DELETE"]
)
@jwt_required()
def delete_account():

    user_id = int(
        get_jwt_identity()
    )


    user = User.query.get(user_id)


    if not user:

        return jsonify(
            {
                "error":"User not found"
            }
        ),404


    db.session.delete(
        user
    )

    db.session.commit()


    return jsonify(
        {
            "message":"Account deleted successfully"
        }
    ),200



# ==========================
# LOGOUT
# ==========================

@auth_bp.route(
    "/logout",
    methods=["POST"]
)
@jwt_required()
def logout():

    jti = get_jwt()["jti"]


    db.session.add(
        TokenBlocklist(
            jti=jti
        )
    )


    db.session.commit()


    return jsonify(
        {
            "message":"Logout successful"
        }
    ),200