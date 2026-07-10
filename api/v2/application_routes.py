API_VERSION = "2.0.0"
from flask import (
    Blueprint,
    request,
    jsonify
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from extensions import (
    limiter
)

from models.job_application import (
    Status
)

from services.application_service import (
    ApplicationService
)

from services.exceptions import (
    ApplicationNotFound,
    DuplicateApplication
)

application_bp = Blueprint(
    "applications_v2",
    __name__,
    url_prefix="/api/v2"
)

# -----------------------------
# List Applications
# -----------------------------

@application_bp.route(
    "/applications",
    methods=["GET"]
)
@limiter.limit(
    "100 per minute"
)
@jwt_required()
def list_applications():

    user_id = int(get_jwt_identity())

    page = int(
        request.args.get(
            "page",
            1
        )
    )

    per_page = int(
        request.args.get(
            "per_page",
            10
        )
    )

    format_type = request.args.get(
        "format",
        "full"
    )

    all_applications = (
        ApplicationService.list_applications(
            user_id
        )
    )

    total = len(all_applications)
    start = (page - 1) * per_page
    end = start + per_page
    paged_applications = all_applications[start:end]

    if format_type.lower() == "summary":

        return jsonify(
            {
                "total":
                total,

                "applications":
                [
                    {
                        "id":
                        app.id,

                        "company":
                        app.company,

                        "status":
                        app.status
                    }

                    for app in paged_applications
                ]
            }
        )

    return jsonify(
        {
            "total":
            total,

            "page":
            page,

            "pages":
            (total + per_page - 1) // per_page if per_page else 1,

            "applications":
            [
                {
                    "id":
                    app.id,

                    "company":
                    app.company,

                    "role":
                    app.role,

                    "status":
                    app.status,

                    "notes":
                    getattr(app, "notes", None)
                }

                for app in paged_applications
            ]
        }
    )


# -----------------------------
# Get Application
# -----------------------------

@application_bp.route(
    "/applications/<int:application_id>",
    methods=["GET"]
)
@limiter.limit(
    "100 per minute"
)
@jwt_required()
def get_application(
        application_id):

    user_id = int(get_jwt_identity())

    try:

        app = (
            ApplicationService.get_application(
                application_id,
                user_id=user_id
            )
        )

        return jsonify(
            {
                "id":
                app.id,

                "company":
                app.company,

                "role":
                app.role,

                "status":
                app.status,

                "notes":
                getattr(app, "notes", None),

                "resume_path":
                app.resume_path
            }
        )

    except ApplicationNotFound as e:

        return jsonify(
            {
                "error":
                str(e)
            }
        ), 404


# -----------------------------
# Create Application
# -----------------------------

@application_bp.route(
    "/applications",
    methods=["POST"]
)
@limiter.limit(
    "30 per minute"
)
@jwt_required()
def create_application():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    try:

        app = (
            ApplicationService.create_application(
                data["company"],
                data["role"],
                Status.APPLIED,
                user_id,
                notes=data.get(
                    "notes"
                )
            )
        )

        return jsonify(
            {
                "message":
                "Application created",

                "id":
                app.id
            }
        ), 201

    except DuplicateApplication as e:

        return jsonify(
            {
                "error":
                str(e)
            }
        ), 400


# -----------------------------
# Update Application
# -----------------------------

@application_bp.route(
    "/applications/<int:application_id>",
    methods=["PATCH"]
)
@limiter.limit(
    "60 per minute"
)
@jwt_required()
def update_application(
        application_id):

    user_id = int(get_jwt_identity())

    data = request.get_json()

    try:

        app = (
            ApplicationService.update_application(
                application_id,
                user_id=user_id,
                **data
            )
        )

    except ApplicationNotFound as e:

        return jsonify(
            {
                "error":
                str(e)
            }
        ), 404

    return jsonify(
        {
            "message":
            "Application updated",

            "id":
            app.id
        }
    )


# -----------------------------
# Delete Application
# -----------------------------

@application_bp.route(
    "/applications/<int:application_id>",
    methods=["DELETE"]
)
@limiter.limit(
    "20 per minute"
)
@jwt_required()
def delete_application(
        application_id):

    user_id = int(get_jwt_identity())

    try:

        ApplicationService.delete_application(
            application_id,
            user_id=user_id
        )

    except ApplicationNotFound as e:

        return jsonify(
            {
                "error":
                str(e)
            }
        ), 404

    return jsonify(
        {
            "message":
            "Application deleted"
        }
    )


# -----------------------------
# Application Statistics
# -----------------------------

@application_bp.route(
    "/applications/stats",
    methods=["GET"]
)
@limiter.limit(
    "30 per minute"
)
@jwt_required()
def application_stats():

    user_id = int(get_jwt_identity())

    return jsonify(
        ApplicationService.get_stats(user_id=user_id)
    )
