import factory

from models.job_application import (
    JobApplication,
    Status
)

from models.user import User


class UserFactory(factory.Factory):

    class Meta:
        model = User

    username = factory.Sequence(
        lambda n: f"user{n}"
    )

    email = factory.Sequence(
        lambda n: f"user{n}@test.com"
    )


class ApplicationFactory(factory.Factory):

    class Meta:
        model = JobApplication

    company = factory.Sequence(
        lambda n: f"Company_{n}"
    )

    role = "Backend Intern"

    status = Status.APPLIED

    resume_path = None