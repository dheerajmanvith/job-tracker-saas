from flask import (
    Blueprint,
    request,
    jsonify
)

from marshmallow import (
    ValidationError
)

from schemas.application_schema import (
    ApplicationSchema
)

application_bp = Blueprint(
    "applications",
    __name__
)


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