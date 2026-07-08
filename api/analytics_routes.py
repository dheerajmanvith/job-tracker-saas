from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from extensions import (
    limiter,
    cache
)

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
@limiter.limit("30 per minute")
@cache.cached(timeout=300)
def get_analytics():

    applications = AnalyticsService.get_applications()

    return jsonify({
        "total_applications": len(applications),

        "applications_per_status":
            AnalyticsService.get_status_counts(applications),

        "response_rate":
            AnalyticsService.get_response_rate(applications),

        "best_day_to_apply":
            AnalyticsService.get_best_day_to_apply(applications),

        "average_days_per_status":
            AnalyticsService.get_average_days_per_status(applications)
    }), 200


@analytics_bp.route(
    "/audit-logs",
    methods=["GET"]
)
@jwt_required()
@limiter.limit("20 per minute")
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