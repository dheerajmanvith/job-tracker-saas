import os

from dotenv import load_dotenv

load_dotenv()


class Config:

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY"
    )

    ADZUNA_APP_ID = os.getenv(
        "ADZUNA_APP_ID"
    )

    ADZUNA_APP_KEY = os.getenv(
        "ADZUNA_APP_KEY"
    )

    CACHE_TYPE = "RedisCache"

    CACHE_REDIS_HOST = "localhost"

    CACHE_REDIS_PORT = 6379

    CACHE_DEFAULT_TIMEOUT = 1800

    MAIL_SERVER = os.getenv(
        "MAIL_SERVER"
    )

    MAIL_PORT = int(
        os.getenv(
            "MAIL_PORT"
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
            "MAIL_USE_TLS"
        )
        ==
        "True"
    )

    MAIL_USE_SSL = (
        os.getenv(
            "MAIL_USE_SSL"
        )
        ==
        "True"
    )

    MAIL_DEFAULT_SENDER = os.getenv(
        "MAIL_DEFAULT_SENDER"
    )