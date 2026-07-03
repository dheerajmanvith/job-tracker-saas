import requests


class WebhookService:

    WEBHOOK_URL = "https://webhook.site/9cb84781-69f8-41e8-b829-09a4029734c2"

    @staticmethod
    def send(event, data):
        """
        Send webhook to Webhook.site
        """

        payload = {
            "event": event,
            "data": data
        }

        try:

            response = requests.post(
                WebhookService.WEBHOOK_URL,
                json=payload,
                timeout=10
            )

            print("=" * 50)
            print("Webhook Sent Successfully")
            print("Status Code :", response.status_code)
            print("Response :", response.text)
            print("=" * 50)

            return True

        except Exception as e:

            print("=" * 50)
            print("Webhook Failed")
            print(e)
            print("=" * 50)

            return False