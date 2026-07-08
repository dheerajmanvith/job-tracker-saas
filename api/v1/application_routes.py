from flask import (
    Blueprint,
    request,
    jsonify,
    make_response
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
    "applications_v1",
    __name__,
    url_prefix="/api/v1"
)

# -----------------------------
# Deprecation Helper
# -----------------------------

def deprecated_response(
        data,
        status_code=200):

    response = make_response(
        jsonify(data),
        status_code
    )

    response.headers[
        "Deprecation"
    ] = "true"

    response.headers[
        "Sunset"
    ] = "2027-01-01"

    response.headers[
        "Link"
    ] = (
        '</api/v2/applications>; '
        'rel="successor-version"'
    )

    return response

@application_bp.route(
    "/applications",
    methods=["GET"]
)
@limiter.limit(
    "100 per minute"
)
def list_applications():

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

    applications = (
        ApplicationService.list_applications(
            page,
            per_page
        )
    )

    return deprecated_response(
        {
            "total":
            applications.total,

            "page":
            applications.page,

            "pages":
            applications.pages,

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
                    app.status.value,

                    "notes":
                    app.notes
            }

            for app in applications.items
        ]
    }
)

@application_bp.route(
    "/applications/<int:application_id>",
    methods=["GET"]
)
@limiter.limit(
    "100 per minute"
)
def get_application(
        application_id):

    try:

        app = (
            ApplicationService.get_application(
                application_id
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
                app.status.value,

                "notes":
                app.notes,

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


@application_bp.route(
    "/applications",
    methods=["POST"]
)
@limiter.limit(
    "30 per minute"
)
def create_application():

    data = request.get_json()

    try:

        app = (
            ApplicationService.create_application(
                company=data["company"],
                role=data["role"],
                status=Status.APPLIED,
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


@application_bp.route(
    "/applications/<int:application_id>",
    methods=["PATCH"]
)
@limiter.limit(
    "60 per minute"
)
def update_application(
        application_id):

    data = request.get_json()

    app = (
        ApplicationService.update_application(
            application_id,
            **data
        )
    )

    return jsonify(
        {
            "message":
            "Application updated",

            "id":
            app.id
        }
    )


@application_bp.route(
    "/applications/<int:application_id>",
    methods=["DELETE"]
)
@limiter.limit(
    "20 per minute"
)
def delete_application(
        application_id):

    ApplicationService.delete_application(
        application_id
    )

    return jsonify(
        {
            "message":
            "Application deleted"
        }
    )


@application_bp.route(
    "/applications/stats",
    methods=["GET"]
)
@limiter.limit(
    "30 per minute"
)
def application_stats():

    return jsonify(
        ApplicationService.get_stats()
    )