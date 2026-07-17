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
    __name__,
    url_prefix="/api/v2"
)


@analytics_bp.route(
    "/analytics",
    methods=["GET"]
)
@limiter.limit("30 per minute")
@jwt_required()
# @cache.cached(timeout=300)
def get_analytics():

    print("1")

    applications = AnalyticsService.get_applications()

    print("2")

    total = len(applications)

    print("3")

    status = AnalyticsService.get_status_counts(applications)

    print("4")

    weekly = AnalyticsService.get_applications_per_week(applications)

    print("5")

    response_rate = AnalyticsService.get_response_rate(applications)

    print("6")

    best_day = AnalyticsService.get_best_day_to_apply(applications)

    print("7")

    average_days = AnalyticsService.get_average_days_per_status(applications)

    print("8")

    return jsonify({
        "total_applications": total,
        "applications_per_week": weekly,
        "applications_per_status": status,
        "response_rate": response_rate,
        "best_day_to_apply": best_day,
        "average_days_per_status": average_days
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