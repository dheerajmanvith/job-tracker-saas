from schemas.application_schema import (
    ApplicationSchema
)

from marshmallow import ValidationError

from datetime import (
    date,
    timedelta
)

import pytest


schema = ApplicationSchema()


def test_valid_data():

    data = schema.load(
        {
            "company": "Google",
            "role": "Intern"
        }
    )

    assert data["company"] == "Google"


def test_empty_company():

    with pytest.raises(
        ValidationError
    ):
        schema.load(
            {
                "company": "",
                "role": "Intern"
            }
        )


def test_future_date():

    future_date = (
        date.today()
        +
        timedelta(days=1)
    )

    with pytest.raises(
        ValidationError
    ):
        schema.load(
            {
                "company": "Google",
                "role": "Intern",
                "applied_date": future_date
            }
        )


def test_missing_company():

    with pytest.raises(
        ValidationError
    ):
        schema.load(
            {
                "role": "Intern"
            }
        )


def test_missing_role():

    with pytest.raises(
        ValidationError
    ):
        schema.load(
            {
                "company": "Google"
            }
        )