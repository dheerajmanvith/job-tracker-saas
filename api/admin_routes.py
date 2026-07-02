from flask import (
    Blueprint,
    jsonify
)

from flask_jwt_extended import (
    jwt_required
)

from decorators import admin_required
from models.user import User


admin_bp = Blueprint(
    "admin",
    __name__
)


@admin_bp.route(
    "/users",
    methods=["GET"]
)
@jwt_required()
@admin_required
def get_users():

    users = User.query.all()

    result = []

    for user in users:

        result.append(
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role.value
            }
        )

    return jsonify(result)