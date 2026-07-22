from flask import (
    Blueprint,
    jsonify,
    request
)

from services.jobs_service import JobsService
from tasks.sample_tasks import long_running_task

jobs_bp = Blueprint(
    "jobs",
    __name__
)


# -----------------------------------------
# Search Jobs
# -----------------------------------------
@jobs_bp.route(
    "/api/jobs/search",
    methods=["GET"]
)
def search_jobs():

    keyword = request.args.get("query", "").strip()

    location = request.args.get("location", "").strip()

    if not keyword:
        return jsonify(
            {
                "error": "query parameter required"
            }
        ), 400

    try:
        jobs = JobsService.search_jobs(
            keyword,
            location
        )

        return jsonify(
            {
                "jobs": jobs
            }
        ), 200

    except Exception as e:
        return jsonify(
            {
                "error": str(e)
            }
        ), 500


# -----------------------------------------
# Background Task Test
# -----------------------------------------
@jobs_bp.route(
    "/background-test",
    methods=["GET"]
)
def background_test():

    task = long_running_task.delay()

    return jsonify(
        {
            "message": "Background task started",
            "task_id": task.id
        }
    ), 202