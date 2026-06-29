import os

from dotenv import load_dotenv

load_dotenv()


class Config:

    # -------------------------
    # Database
    # -------------------------

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # -------------------------
    # JWT
    # -------------------------

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "super-secret-key"
    )

    # -------------------------
    # Adzuna API
    # -------------------------

    ADZUNA_APP_ID = os.getenv(
        "ADZUNA_APP_ID"
    )

    ADZUNA_APP_KEY = os.getenv(
        "ADZUNA_APP_KEY"
    )

    # -------------------------
    # Redis Cache
    # -------------------------

    CACHE_TYPE = "RedisCache"

    CACHE_REDIS_URL = os.getenv(
        "REDIS_URL",
        "redis://localhost:6379/0"
    )

    # -------------------------
    # Mail Configuration
    # -------------------------

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