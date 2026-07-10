import pytest

from app import app
from extensions import db


@pytest.fixture(scope="session")
def flask_app():

    app.config.update(
        TESTING=True,
        RATELIMIT_ENABLED=False,
        WTF_CSRF_ENABLED=False
    )

    with app.app_context():

        db.create_all()

        yield app

        db.session.remove()

        db.drop_all()



@pytest.fixture(scope="session")
def client(flask_app):

    return flask_app.test_client()



@pytest.fixture(scope="function")
def database(flask_app):

    with flask_app.app_context():

        yield db

        db.session.rollback()