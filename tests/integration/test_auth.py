import uuid


def unique_user():
    uid = uuid.uuid4().hex[:8]
    return {
        "username": f"user_{uid}",
        "email": f"user_{uid}@test.com",
        "password": "Password123!"
    }


def test_register_success(client):
    payload = unique_user()

    response = client.post("/register", json=payload)

    assert response.status_code == 201
    assert response.get_json()["message"] == "User registered successfully"


def test_register_duplicate_email(client):
    payload = unique_user()

    client.post("/register", json=payload)

    response = client.post("/register", json=payload)

    assert response.status_code == 400
    assert "error" in response.get_json()


def test_register_missing_fields(client):
    response = client.post(
        "/register",
        json={
            "email": "abc@test.com"
        }
    )

    assert response.status_code == 400


def test_login_success(client):
    payload = unique_user()

    client.post("/register", json=payload)

    response = client.post(
        "/login",
        json={
            "email": payload["email"],
            "password": payload["password"]
        }
    )

    data = response.get_json()

    assert response.status_code == 200
    assert "access_token" in data
    assert "refresh_token" in data


def test_login_invalid_password(client):
    payload = unique_user()

    client.post("/register", json=payload)

    response = client.post(
        "/login",
        json={
            "email": payload["email"],
            "password": "WrongPassword"
        }
    )

    assert response.status_code == 401


def test_profile_requires_auth(client):
    response = client.get("/profile")

    assert response.status_code == 401


def test_profile_success(client):
    payload = unique_user()

    client.post("/register", json=payload)

    login = client.post(
        "/login",
        json={
            "email": payload["email"],
            "password": payload["password"]
        }
    )

    token = login.get_json()["access_token"]

    response = client.get(
        "/profile",
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    data = response.get_json()

    assert response.status_code == 200
    assert data["email"] == payload["email"]


def test_refresh_token(client):
    payload = unique_user()

    client.post("/register", json=payload)

    login = client.post(
        "/login",
        json={
            "email": payload["email"],
            "password": payload["password"]
        }
    )

    refresh = login.get_json()["refresh_token"]

    response = client.post(
        "/refresh",
        headers={
            "Authorization": f"Bearer {refresh}"
        }
    )

    assert response.status_code == 200
    assert "access_token" in response.get_json()


def test_logout(client):
    payload = unique_user()

    client.post("/register", json=payload)

    login = client.post(
        "/login",
        json={
            "email": payload["email"],
            "password": payload["password"]
        }
    )

    token = login.get_json()["access_token"]

    response = client.post(
        "/logout",
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    assert response.status_code == 200
    assert response.get_json()["message"] == "Logout successful"