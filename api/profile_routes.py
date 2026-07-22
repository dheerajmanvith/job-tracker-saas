from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from services.profile_service import ProfileService

profile_bp = Blueprint(
    "profile",
    __name__,
    url_prefix="/api/v2"
)


@profile_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():
    try:
        profile = ProfileService.get_profile()
        return jsonify(profile), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@profile_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():
    try:
        profile = ProfileService.update_profile(
            request.get_json()
        )

        return jsonify(profile), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@profile_bp.route("/profile/password", methods=["PUT"])
@jwt_required()
def change_password():
    try:
        result = ProfileService.change_password(
            request.get_json()
        )

        return jsonify(result), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@profile_bp.route("/profile/webhook", methods=["PUT"])
@jwt_required()
def update_webhook():
    try:
        profile = ProfileService.update_webhook(
            request.get_json()
        )

        return jsonify(profile), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@profile_bp.route("/profile", methods=["DELETE"])
@jwt_required()
def delete_account():
    try:
        result = ProfileService.delete_account()

        return jsonify(result), 200

    except ValueError as e:
        return jsonify({"error": str(e)}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500