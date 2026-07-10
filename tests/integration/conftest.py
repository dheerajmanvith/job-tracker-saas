import os

os.environ["RATELIMIT_ENABLED"] = "false"
os.environ["CACHE_TYPE"] = "SimpleCache"

import pytest

from app import app
from extensions import db


@pytest.fixture(scope="session")
def flask_app():

    app.config.update(
        TESTING=True,
        RATELIMIT_ENABLED=False,
        WTF_CSRF_ENABLED=False,
        CACHE_TYPE="SimpleCache"
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



@pytest.fixture
def auth_headers(client):

    # unique user every test
    import uuid

    email = f"analytics_{uuid.uuid4()}@test.com"


    client.post(
        "/register",
        json={
            "username": f"analytics_user_{uuid.uuid4().hex[:8]}",
            "email": email,
            "password": "password123"
        }
    )


    response = client.post(
        "/login",
        json={
            "email": email,
            "password": "password123"
        }
    )


    data = response.get_json()


    print(data)


    token = (
        data.get("access_token")
        or
        data.get("access")
        or
        data.get("token")
    )


    assert token is not None


    return {
        "Authorization": f"Bearer {token}"
    }

