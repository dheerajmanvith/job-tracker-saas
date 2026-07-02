from functools import wraps

from flask import jsonify
from flask_jwt_extended import get_jwt_identity

from models.user import User, Role


def admin_required(fn):

    @wraps(fn)
    def wrapper(*args, **kwargs):

        user_id = int(get_jwt_identity())

        user = User.query.get(user_id)

        if not user:
            return jsonify({
                "message": "User not found"
            }), 404

        if user.role != Role.ADMIN:
            return jsonify({
                "message": "Admin access required"
            }), 403

        return fn(*args, **kwargs)

    return wrapper