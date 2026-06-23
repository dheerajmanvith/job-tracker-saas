from services.exceptions import (
    ApplicationNotFound,
    DuplicateApplication
)


def test_application_not_found_exception():

    exception = ApplicationNotFound(
        "Not Found"
    )

    assert str(exception) == "Not Found"


def test_duplicate_application_exception():

    exception = DuplicateApplication(
        "Duplicate"
    )

    assert str(exception) == "Duplicate"