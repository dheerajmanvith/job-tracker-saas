from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from services.resume_service import ResumeService

resume_bp = Blueprint(
    "resume",
    __name__
)


@resume_bp.route(
    "/resume/upload",
    methods=["POST"]
)
@jwt_required()
def upload_resume():
    if "file" not in request.files:
        return jsonify({
            "message": "No file uploaded."
        }), 400

    file = request.files["file"]

    try:
        resume = ResumeService.upload_resume(
            file=file,
            user_id=get_jwt_identity()
        )

        return jsonify({
            "message": "Resume uploaded successfully.",
            "resume": resume.to_dict()
        }), 201

    except ValueError as e:
        return jsonify({
            "message": str(e)
        }), 400

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500


@resume_bp.route(
    "/resume",
    methods=["GET"]
)
@jwt_required()
def get_resume():
    resume = ResumeService.get_resume(
        get_jwt_identity()
    )

    if not resume:
        return jsonify({
            "message": "Resume not found."
        }), 404

    return jsonify(
        resume.to_dict()
    ), 200


@resume_bp.route(
    "/resume",
    methods=["DELETE"]
)
@jwt_required()
def delete_resume():
    deleted = ResumeService.delete_resume(
        get_jwt_identity()
    )

    if not deleted:
        return jsonify({
            "message": "Resume not found."
        }), 404

    return jsonify({
        "message": "Resume deleted successfully."
    }), 200