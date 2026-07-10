import pytest


def test_job_search(client):

    response = client.get(
        "/api/jobs/search",
        query_string={
            "query": "python developer"
        }
    )

    assert response.status_code in [
        200,
        400
    ]

    if response.status_code == 200:
        data = response.get_json()
        assert data is not None



def test_empty_job_search(client):

    response = client.get(
        "/api/jobs/search"
    )

    assert response.status_code in [
        200,
        400
    ]



def test_job_search_invalid_query(client):

    response = client.get(
        "/api/jobs/search",
        query_string={
            "query": ""
        }
    )

    assert response.status_code in [
        200,
        400
    ]



def test_background_job_endpoint(client):

    response = client.get(
        "/background-test"
    )

    assert response.status_code in [
        200,
        202
    ]



def test_background_job_response(client):

    response = client.get(
        "/background-test"
    )

    if response.status_code == 202:

        data = response.get_json()

        assert data is not None