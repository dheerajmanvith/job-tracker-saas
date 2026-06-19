from schemas.application_schema import (
    ApplicationSchema
)

import pytest

from marshmallow import (
    ValidationError
)


def test_company_validation():

    schema = ApplicationSchema()

    with pytest.raises(
        ValidationError
    ):

        schema.load(
            {
                "company": "",
                "role": "Backend"
            }
        )