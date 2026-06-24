from flask import (
    Blueprint,
    request,
    jsonify
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from services.application_service import (
    ApplicationService
)

from models.job_application import (
    Status
)

application_bp = Blueprint(
    "applications",
    __name__
)


@application_bp.route(
    "/api/applications",
    methods=["POST"]
)
@jwt_required()
def create_application():

    current_user = int(
        get_jwt_identity()
    )

    data = request.get_json()

    company = data.get(
        "company"
    )

    role = data.get(
        "role"
    )

    status = data.get(
        "status",
        "Applied"
    )

    application = (
        ApplicationService.create_application(
            company=company,
            role=role,
            status=status,
            user_id=current_user
        )
    )

    return jsonify(
        {
            "message":
            "Application created successfully",
            "id":
            application.id
        }
    ), 201


@application_bp.route(
    "/api/applications",
    methods=["GET"]
)
@jwt_required()
def list_applications():

    current_user = int(
        get_jwt_identity()
    )

    applications = (
        ApplicationService.list_applications(
            current_user
        )
    )

    results = []

    for app in applications:

        results.append(
            {
                "id": app.id,
                "company": app.company,
                "role": app.role,
                "status": app.status,
                "resume_path": app.resume_path
            }
        )

    return jsonify(results)


@application_bp.route(
    "/api/applications/<int:application_id>",
    methods=["GET"]
)
@jwt_required()
def get_application(
    application_id
):

    current_user = int(
        get_jwt_identity()
    )

    app = (
        ApplicationService.get_application(
            application_id,
            current_user
        )
    )

    return jsonify(
        {
            "id": app.id,
            "company": app.company,
            "role": app.role,
            "status": app.status,
            "resume_path": app.resume_path
        }
    )


@application_bp.route(
    "/api/applications/<int:application_id>",
    methods=["PUT"]
)
@jwt_required()
def update_application(
    application_id
):

    current_user = int(
        get_jwt_identity()
    )

    data = request.get_json()

    app = (
        ApplicationService.update_application(
            application_id,
            current_user,
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
    "/api/applications/<int:application_id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_application(
    application_id
):

    current_user = int(
        get_jwt_identity()
    )

    ApplicationService.delete_application(
        application_id,
        current_user
    )

    return jsonify(
        {
            "message":
            "Application deleted"
        }
    )