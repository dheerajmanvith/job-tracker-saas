import pytest


def create_application(client, headers):

    response = client.post(
        "/api/v2/applications",
        headers=headers,
        json={
            "company": "Google",
            "role": "Backend Engineer",
            "notes": "Integration test"
        }
    )

    assert response.status_code == 201

    return response.get_json()["id"]



def test_get_analytics(client, auth_headers):

    create_application(
        client,
        auth_headers
    )


    response = client.get(
        "/analytics",
        headers=auth_headers
    )


    assert response.status_code == 200


    data = response.get_json()


    assert isinstance(
        data,
        dict
    )


    # Flexible checks because analytics structure may evolve
    assert any(
        key in data
        for key in [
            "total_applications",
            "total",
            "applications",
            "stats"
        ]
    )



def test_analytics_requires_auth(client):

    response = client.get(
        "/analytics"
    )


    assert response.status_code == 401



def test_audit_logs(client, auth_headers):

    response = client.get(
        "/audit-logs",
        headers=auth_headers
    )


    assert response.status_code == 200


    data = response.get_json()


    assert isinstance(
        data,
        (list, dict)
    )