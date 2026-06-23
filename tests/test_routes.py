from app import app


def test_home():

    client = app.test_client()

    response = client.get("/")

    assert response.status_code == 200


def test_validation_success():

    client = app.test_client()

    response = client.post(
        "/api/applications",
        json={
            "company": "Google",
            "role": "Intern"
        }
    )

    assert response.status_code == 200


def test_validation_missing_company():

    client = app.test_client()

    response = client.post(
        "/api/applications",
        json={
            "role": "Intern"
        }
    )

    assert response.status_code == 400


def test_validation_empty_company():

    client = app.test_client()

    response = client.post(
        "/api/applications",
        json={
            "company": "",
            "role": "Intern"
        }
    )

    assert response.status_code == 400


def test_upload_without_file():

    client = app.test_client()

    response = client.post(
        "/api/upload"
    )

    assert response.status_code == 400


def test_application_with_resume_no_file():

    client = app.test_client()

    response = client.post(
        "/api/application-with-resume"
    )

    assert response.status_code == 400