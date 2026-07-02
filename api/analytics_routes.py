from flask import Blueprint, jsonify

from services.analytics_service import AnalyticsService

analytics_bp = Blueprint(
    "analytics",
    __name__
)


@analytics_bp.route(
    "/analytics",
    methods=["GET"]
)
def get_analytics():

    return jsonify({
        "total_applications": len(
            AnalyticsService.get_applications()
        ),
        "applications_per_status":
            AnalyticsService.get_status_counts(),

        "response_rate":
            AnalyticsService.get_response_rate(),

        "best_day_to_apply":
            AnalyticsService.get_best_day_to_apply(),

        "average_days_per_status":
            AnalyticsService.get_average_days_per_status()
    }), 200