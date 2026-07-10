import uuid


def auth_headers(client):

    email = f"{uuid.uuid4().hex}@test.com"
    username = f"user_{uuid.uuid4().hex}"

    register_response = client.post(
        "/register",
        json={
            "username": username,
            "email": email,
            "password": "Password123!"
        }
    )

    assert register_response.status_code == 201


    login_response = client.post(
        "/login",
        json={
            "email": email,
            "password": "Password123!"
        }
    )


    assert login_response.status_code == 200


    token = login_response.json["access_token"]


    return {
        "Authorization": f"Bearer {token}"
    }



def create_application(client, headers):

    response = client.post(
        "/api/v2/applications",
        headers=headers,
        json={
            "company": "Google",
            "role": "Backend Engineer"
        }
    )


    assert response.status_code == 201


    data = response.json


    return data["id"], data




def test_create_application(client):

    headers = auth_headers(client)

    application_id, data = create_application(
        client,
        headers
    )


    assert application_id
    assert data["message"] == "Application created"




def test_list_applications(client):

    headers = auth_headers(client)

    create_application(
        client,
        headers
    )


    response = client.get(
        "/api/v2/applications",
        headers=headers
    )


    assert response.status_code == 200

    assert len(response.json) >= 1




def test_get_application(client):

    headers = auth_headers(client)

    application_id, _ = create_application(
        client,
        headers
    )


    response = client.get(
        f"/api/v2/applications/{application_id}",
        headers=headers
    )


    assert response.status_code == 200

    assert response.json["id"] == application_id




def test_update_application(client):

    headers = auth_headers(client)


    application_id, _ = create_application(
        client,
        headers
    )


    response = client.patch(
        f"/api/v2/applications/{application_id}",
        headers=headers,
        json={
            "status": "INTERVIEW"
        }
    )


    assert response.status_code == 200




def test_delete_application(client):

    headers = auth_headers(client)


    application_id, _ = create_application(
        client,
        headers
    )


    response = client.delete(
        f"/api/v2/applications/{application_id}",
        headers=headers
    )


    assert response.status_code == 200




def test_invalid_application(client):

    headers = auth_headers(client)


    response = client.get(
        "/api/v2/applications/999999",
        headers=headers
    )


    assert response.status_code == 404




def test_update_invalid_application(client):

    headers = auth_headers(client)


    response = client.patch(
        "/api/v2/applications/999999",
        headers=headers,
        json={
            "status":"REJECTED"
        }
    )


    assert response.status_code == 404




def test_delete_invalid_application(client):

    headers = auth_headers(client)


    response = client.delete(
        "/api/v2/applications/999999",
        headers=headers
    )


    assert response.status_code == 404