import requests

from flask import current_app


class SlackService:

    @staticmethod
    def send_offer_notification(application):

        webhook = current_app.config[
            "SLACK_WEBHOOK_URL"
        ]

        if not webhook:

            return False

        payload = {

            "text":

            (
                "🎉 New Offer Received!\n\n"

                f"Company: {application.company}\n"

                f"Role: {application.role}\n"

                f"Status: {application.status.value}"
            )

        }

        try:

            response = requests.post(

                webhook,

                json=payload,

                timeout=10

            )

            response.raise_for_status()

            print(
                "Slack notification sent."
            )

            return True

        except requests.RequestException as e:

            print(
                f"Slack Error: {e}"
            )

            return False