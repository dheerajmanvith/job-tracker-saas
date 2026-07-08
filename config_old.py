import os


class Config:

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "super-secret-key"
    )

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    CELERY_BROKER_URL = "redis://localhost:6379/0"
    
    CELERY_RESULT_BACKEND = "redis://localhost:6379/0"

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "jwt-secret-key"
    )

    CACHE_TYPE = "SimpleCache"

    MAIL_SERVER = os.getenv(
        "MAIL_SERVER"
    )

    MAIL_PORT = int(
        os.getenv(
            "MAIL_PORT",
            587
        )
    )

    MAIL_USERNAME = os.getenv(
        "MAIL_USERNAME"
    )

    MAIL_PASSWORD = os.getenv(
        "MAIL_PASSWORD"
    )

    MAIL_USE_TLS = (
        os.getenv(
            "MAIL_USE_TLS",
            "True"
        )
        == "True"
    )

    MAIL_USE_SSL = (
        os.getenv(
            "MAIL_USE_SSL",
            "False"
        )
        == "True"
    )

    MAIL_DEFAULT_SENDER = os.getenv(
        "MAIL_DEFAULT_SENDER"
    )

    # -----------------------------
    # Webhook Configuration
    # -----------------------------

    WEBHOOK_URL = os.getenv(
    "WEBHOOK_URL",
    "https://webhook.site/9cb84781-69f8-41e8-b829-09a4029734c2"
)
    WEBHOOK_SECRET = os.getenv(

        "WEBHOOK_SECRET",

        "job-tracker-secret"

    )

    # -----------------------------
    # Slack Configuration
    # -----------------------------

    SLACK_WEBHOOK_URL = os.getenv(

        "SLACK_WEBHOOK_URL",

        ""

    )