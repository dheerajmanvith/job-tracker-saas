from flask import (
    Blueprint,
    request,
    jsonify,
    send_from_directory
)

from marshmallow import ValidationError

from schemas.application_schema import (
    ApplicationSchema
)

from services.file_service import (
    FileService
)

from extensions import db

from models.job_application import (
    JobApplication
)

application_bp = Blueprint(
    "applications",
    __name__
)


# ------------------------------------
# Day 4 - Validation Endpoint
# ------------------------------------
@application_bp.route(
    "/api/applications",
    methods=["POST"]
)
def create_application():

    schema = ApplicationSchema()

    try:

        data = schema.load(
            request.get_json()
        )

        return jsonify(
            {
                "message": "Validation Passed",
                "data": data
            }
        )

    except ValidationError as err:

        return jsonify(
            {
                "error": "Validation Error",
                "details": err.messages,
                "status_code": 400
            }
        ), 400


# ------------------------------------
# Day 5 - Upload Resume Only
# ------------------------------------
@application_bp.route(
    "/api/upload",
    methods=["POST"]
)
def upload_resume():

    if "file" not in request.files:

        return jsonify(
            {
                "error": "No file uploaded"
            }
        ), 400

    file = request.files["file"]

    if file.filename == "":

        return jsonify(
            {
                "error": "No file selected"
            }
        ), 400

    filepath = FileService.save_file(
        file
    )

    return jsonify(
        {
            "message": "Upload successful",
            "path": filepath
        }
    )


# ------------------------------------
# Day 5 - Serve Uploaded Files
# ------------------------------------
@application_bp.route(
    "/files/<filename>",
    methods=["GET"]
)
def get_file(filename):

    return send_from_directory(
        "uploads",
        filename
    )


# ------------------------------------
# Day 5 - Extract PDF Text
# ------------------------------------
@application_bp.route(
    "/api/extract/<filename>",
    methods=["GET"]
)
def extract_resume_text(filename):

    filepath = f"uploads/{filename}"

    try:

        text = FileService.extract_text(
            filepath
        )

        return jsonify(
            {
                "filename": filename,
                "text": text[:2000]
            }
        )

    except Exception as e:

        return jsonify(
            {
                "error": str(e)
            }
        ), 500


# ------------------------------------
# Day 5 - Create Application + Resume
# ------------------------------------
@application_bp.route(
    "/api/application-with-resume",
    methods=["POST"]
)
def create_application_with_resume():

    if "file" not in request.files:

        return jsonify(
            {
                "error": "Resume file required"
            }
        ), 400

    file = request.files["file"]

    if file.filename == "":

        return jsonify(
            {
                "error": "No file selected"
            }
        ), 400

    company = request.form.get(
        "company"
    )

    role = request.form.get(
        "role"
    )

    if not company or not role:

        return jsonify(
            {
                "error": "company and role are required"
            }
        ), 400

    filepath = FileService.save_file(
        file
    )

    application = JobApplication(
        company=company,
        role=role,
        status="Applied",
        resume_path=filepath
    )

    db.session.add(
        application
    )

    db.session.commit()

    return jsonify(
        {
            "message": "Application created successfully",
            "application_id": application.id,
            "company": application.company,
            "role": application.role,
            "resume_path": application.resume_path
        }
    ), 201


@application_bp.route("/test-db")
def test_db():

    return jsonify(
        {
            "db_id": id(db)
        }
    )