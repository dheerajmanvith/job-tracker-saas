from flask import Blueprint, jsonify

from models.user import User
from models.job_application import JobApplication

from services.email_service import EmailService

email_bp = Blueprint("email", __name__)


@email_bp.route("/test-registration", methods=["GET"])
def test_registration_email():
    user = User.query.first()

    if not user:
        return jsonify({"message": "No users found."}), 404

    EmailService.send_registration_email(user)

    return jsonify({
        "message": "Registration email sent successfully."
    }), 200


@email_bp.route("/test-weekly", methods=["GET"])
def test_weekly_email():
    user = User.query.first()

    if not user:
        return jsonify({"message": "No users found."}), 404

    EmailService.send_weekly_digest(user)

    return jsonify({
        "message": "Weekly digest email sent successfully."
    }), 200


@email_bp.route("/test-interview", methods=["GET"])
def test_interview_email():
    user = User.query.first()

    if not user:
        return jsonify({"message": "No users found."}), 404

    application = JobApplication.query.first()

    if not application:
        return jsonify({"message": "No job applications found."}), 404

    EmailService.send_interview_reminder(
        user,
        application
    )

    return jsonify({
        "message": "Interview reminder email sent successfully."
    }), 200