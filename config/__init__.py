import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.getenv(
        "JWT_SECRET_KEY",
        "super-secret-key"
    )

    ADZUNA_APP_ID = os.getenv(
        "ADZUNA_APP_ID"
    )

    ADZUNA_APP_KEY = os.getenv(
        "ADZUNA_APP_KEY"
    )