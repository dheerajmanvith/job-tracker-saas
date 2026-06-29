from flask import (
    Blueprint,
    jsonify,
    request
)

from services.jobs_service import (
    JobsService
)

jobs_bp = Blueprint(
    "jobs",
    __name__
)


@jobs_bp.route(
    "/api/jobs/search",
    methods=["GET"]
)
def search_jobs():

    keyword = request.args.get(
        "q"
    )

    location = request.args.get(
        "location"
    )

    if not keyword:

        return jsonify(
            {
                "error":
                "q parameter required"
            }
        ), 400

    jobs = (
        JobsService.search_jobs(
            keyword,
            location
        )
    )

    return jsonify(
        jobs
    )