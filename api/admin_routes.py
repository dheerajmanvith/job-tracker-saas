import os

print("=" * 60)
print("ADMIN ROUTES FILE:", os.path.abspath(__file__))
print("=" * 60)


from flask import (
    Blueprint,
    jsonify,
    request
)

from flask_jwt_extended import (
    jwt_required
)

from extensions import (
    db
)

from decorators.admin_required import (
    admin_required
)

from models.user import (
    User
)


# =====================================
# ADMIN BLUEPRINT
# =====================================

admin_bp = Blueprint(
    "admin",
    __name__,
    url_prefix="/api/admin"
)

print(
    "Blueprint URL Prefix:",
    admin_bp.url_prefix
)



# =====================================
# GET ALL USERS
# =====================================

@admin_bp.route(
    "/users",
    methods=["GET"]
)
@jwt_required()
@admin_required
def get_users():

    users = User.query.all()

    return jsonify(
        [
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role.value
                    if hasattr(user.role, "value")
                    else user.role,
                "is_active": user.is_active
            }
            for user in users
        ]
    ), 200




# =====================================
# TOGGLE USER ACTIVE STATUS
# =====================================

@admin_bp.route(
    "/users/<int:user_id>/toggle",
    methods=["PUT"]
)
@jwt_required()
@admin_required
def toggle_user(user_id):

    user = User.query.get_or_404(
        user_id
    )


    user.is_active = not user.is_active


    db.session.commit()


    return jsonify(
        {
            "message": "User status updated",
            "user_id": user.id,
            "is_active": user.is_active
        }
    ), 200




# =====================================
# CHANGE USER ROLE
# =====================================

@admin_bp.route(
    "/users/<int:user_id>/role",
    methods=["PUT"]
)
@jwt_required()
@admin_required
def change_role(user_id):

    user = User.query.get_or_404(
        user_id
    )


    data = request.get_json()


    if not data or "role" not in data:

        return jsonify(
            {
                "error": "Role is required"
            }
        ), 400



    new_role = data["role"]


    valid_roles = [
        role.value
        for role in type(user.role)
    ]



    if new_role not in valid_roles:

        return jsonify(
            {
                "error": "Invalid role",
                "allowed_roles": valid_roles
            }
        ), 400



    user.role = type(user.role)(
        new_role
    )


    db.session.commit()



    return jsonify(
        {
            "message": "Role updated",
            "user_id": user.id,
            "role": user.role.value
        }
    ), 200




# =====================================
# DELETE USER
# =====================================

@admin_bp.route(
    "/users/<int:user_id>",
    methods=["DELETE"]
)
@jwt_required()
@admin_required
def delete_user(user_id):


    user = User.query.get_or_404(
        user_id
    )


    db.session.delete(
        user
    )


    db.session.commit()



    return jsonify(
        {
            "message": "User deleted successfully",
            "deleted_user_id": user_id
        }
    ), 200