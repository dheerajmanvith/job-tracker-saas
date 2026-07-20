import os

from dotenv import load_dotenv

load_dotenv()


class Config:

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "super-secret-key"
    )

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "jwt-secret-key"
    )

    # -----------------------------
    # Cache Configuration (Redis)
    # -----------------------------
    CACHE_TYPE = "RedisCache"
    CACHE_REDIS_HOST = os.getenv(
        "REDIS_HOST",
        "localhost"
    )
    CACHE_REDIS_PORT = int(
        os.getenv(
            "REDIS_PORT",
            6380
        )
    )
    CACHE_REDIS_DB = int(
        os.getenv(
            "REDIS_DB",
            0
        )
    )
    CACHE_DEFAULT_TIMEOUT = 300

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
        ) == "True"
    )

    MAIL_USE_SSL = (
        os.getenv(
            "MAIL_USE_SSL",
            "False"
        ) == "True"
    )

    MAIL_DEFAULT_SENDER = os.getenv(
        "MAIL_DEFAULT_SENDER"
    )

    WEBHOOK_URL = os.getenv(
        "WEBHOOK_URL"
    )

    WEBHOOK_SECRET = os.getenv(
        "WEBHOOK_SECRET",
        "job-tracker-secret"
    )

    SLACK_WEBHOOK_URL = os.getenv(
        "SLACK_WEBHOOK_URL"
    )

    CELERY_BROKER_URL = os.getenv(
        "CELERY_BROKER_URL",
        "redis://localhost:6380/0"
    )

    CELERY_RESULT_BACKEND = os.getenv(
        "CELERY_RESULT_BACKEND",
        "redis://localhost:6380/0"
    )

    UPLOAD_FOLDER = "uploads"

    MAX_CONTENT_LENGTH = 16 * 1024 * 1024


class TestingConfig(Config):
    TESTING = True

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "TEST_DATABASE_URL",
        Config.SQLALCHEMY_DATABASE_URI
    )

    CACHE_TYPE = "NullCache"

    RATELIMIT_ENABLED = False

    WTF_CSRF_ENABLED = False

    ADZUNA_APP_ID = os.getenv("ADZUNA_APP_ID")
    ADZUNA_APP_KEY = os.getenv("ADZUNA_APP_KEY")