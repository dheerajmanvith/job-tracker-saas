from tests.factories import (
    ApplicationFactory
)


def test_application_factory():

    application = (
        ApplicationFactory()
    )

    assert application.company is not None

    assert (
        application.role
        ==
        "Backend Intern"
    )