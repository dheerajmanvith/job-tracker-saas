from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from services.analytics_service import AnalyticsService
from services.audit_service import AuditService

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


@analytics_bp.route(
    "/audit-logs",
    methods=["GET"]
)
@jwt_required()
def get_audit_logs():

    logs = AuditService.get_logs()

    return jsonify([
        {
            "id": log.id,
            "admin_id": log.admin_id,
            "action": log.action,
            "created_at": log.created_at.isoformat()
        }
        for log in logs
    ]), 200