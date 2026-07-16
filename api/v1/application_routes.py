from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from extensions import limiter

from models.job_application import Status

from services.application_service import (
    ApplicationService
)

from services.exceptions import (
    ApplicationNotFound
)

application_bp = Blueprint(
    "applications_v1",
    __name__,
    url_prefix="/api/v1"
)


# -----------------------------------------
# GET ALL APPLICATIONS
# -----------------------------------------

@application_bp.route(
    "/applications",
    methods=["GET"]
)
@jwt_required()
@limiter.limit("100 per minute")
def list_applications():

    user_id = int(get_jwt_identity())

    applications = ApplicationService.list_applications(
        user_id
    )

    return jsonify(
        [
            {
                "id": app.id,
                "company": app.company,
                "role": app.role,
                "status": app.status,
                "notes": app.notes,
                "resume_path": app.resume_path
            }
            for app in applications
        ]
    )


# -----------------------------------------
# GET SINGLE APPLICATION
# -----------------------------------------

@application_bp.route(
    "/applications/<int:application_id>",
    methods=["GET"]
)
@jwt_required()
@limiter.limit("100 per minute")
def get_application(application_id):

    user_id = int(get_jwt_identity())

    try:

        app = ApplicationService.get_application(
            application_id,
            user_id
        )

        return jsonify(
            {
                "id": app.id,
                "company": app.company,
                "role": app.role,
                "status": app.status,
                "notes": app.notes,
                "resume_path": app.resume_path
            }
        )

    except ApplicationNotFound as e:

        return jsonify(
            {
                "error": str(e)
            }
        ), 404


# -----------------------------------------
# CREATE APPLICATION
# -----------------------------------------

@application_bp.route(
    "/applications",
    methods=["POST"]
)
@jwt_required()
@limiter.limit("30 per minute")
def create_application():

    user_id = int(get_jwt_identity())

    data = request.get_json(silent=True) or {}

    company = data.get("company")
    role = data.get("role")

    if not company or not role:

        return jsonify(
            {
                "error": "company and role are required"
            }
        ), 400

    application = ApplicationService.create_application(

        company=company,

        role=role,

        status=Status.APPLIED,

        user_id=user_id,

        notes=data.get("notes")

    )

    return jsonify(

        {
            "message": "Application created successfully",

            "id": application.id
        }

    ), 201


# -----------------------------------------
# UPDATE APPLICATION
# -----------------------------------------

@application_bp.route(
    "/applications/<int:application_id>",
    methods=["PATCH"]
)
@jwt_required()
@limiter.limit("60 per minute")
def update_application(application_id):

    user_id = int(get_jwt_identity())

    data = request.get_json(silent=True) or {}

    application = ApplicationService.update_application(

        application_id,

        user_id,

        **data

    )

    return jsonify(

        {
            "message": "Application updated",

            "id": application.id
        }

    )


# -----------------------------------------
# DELETE APPLICATION
# -----------------------------------------

@application_bp.route(
    "/applications/<int:application_id>",
    methods=["DELETE"]
)
@jwt_required()
@limiter.limit("20 per minute")
def delete_application(application_id):

    user_id = int(get_jwt_identity())

    ApplicationService.delete_application(

        application_id,

        user_id

    )

    return jsonify(

        {
            "message": "Application deleted"
        }

    )


# -----------------------------------------
# APPLICATION STATS
# -----------------------------------------

@application_bp.route(
    "/applications/stats",
    methods=["GET"]
)
@jwt_required()
@limiter.limit("30 per minute")
def application_stats():

    user_id = int(get_jwt_identity())

    applications = ApplicationService.list_applications(
        user_id
    )

    stats = {
        "total": len(applications),
        "Applied": 0,
        "Interview": 0,
        "Offer": 0,
        "Rejected": 0
    }

    for app in applications:

        if app.status in stats:
            stats[app.status] += 1

    return jsonify(stats)