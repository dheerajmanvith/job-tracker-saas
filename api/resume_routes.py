from flask import Blueprint
from flask import request
from flask import jsonify

from services.file_service import FileService
from tasks.resume_tasks import parse_resume

resume_bp = Blueprint(
    "resume",
    __name__
)


@resume_bp.route(
    "/resume/upload",
    methods=["POST"]
)
def upload_resume():

    if "resume" not in request.files:
        return jsonify({
            "message": "Resume file is required"
        }), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({
            "message": "No file selected"
        }), 400

    filepath = FileService.save_resume(file)

    task = parse_resume.delay(filepath)

    return jsonify({
        "message": "Resume uploaded successfully",
        "task_id": task.id,
        "file_path": filepath
    }), 202