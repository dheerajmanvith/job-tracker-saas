from datetime import datetime

from models.job_application import JobApplication, Status
from extensions import db

from services.webhook_service import WebhookService
from services.slack_service import SlackService


class ApplicationService:

    @staticmethod
    def update_application(application_id, data):

        application = Application.query.get(application_id)

        if not application:
            return None

        old_status = application.status

        # -----------------------------
        # Update fields if present
        # -----------------------------
        if "company" in data:
            application.company = data["company"]

        if "role" in data:
            application.role = data["role"]

        if "status" in data:

            new_status = Status(data["status"])

            application.status = new_status

            # If moved to OFFER, set timestamp
            if new_status == Status.OFFER:
                application.offer_date = datetime.utcnow()

        application.updated_at = datetime.utcnow()

        db.session.commit()

        # -----------------------------
        # Build webhook payload
        # -----------------------------
        payload = {
            "id": application.id,
            "company": application.company,
            "role": application.role,
            "status": application.status.value,
            "old_status": old_status.value,
            "updated_at": str(application.updated_at),
        }

        # -----------------------------
        # Send webhook notification
        # -----------------------------
        WebhookService.send_webhook(payload)

        # -----------------------------
        # Slack notification (ONLY on OFFER)
        # -----------------------------
        if application.status == Status.OFFER:
            SlackService.send_offer_notification(application)

        return application

    # --------------------------------------------------

    @staticmethod
    def create_application(data):

        application = Application(
            company=data.get("company"),
            role=data.get("role"),
            status=Status(data.get("status", "APPLIED")),
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        db.session.add(application)
        db.session.commit()

        return application

    # --------------------------------------------------

    @staticmethod
    def get_application(application_id):

        return Application.query.get(application_id)

    # --------------------------------------------------

    @staticmethod
    def get_all_applications():

        return Application.query.all()

    # --------------------------------------------------

    @staticmethod
    def delete_application(application_id):

        application = Application.query.get(application_id)

        if not application:
            return False

        db.session.delete(application)
        db.session.commit()

        return True