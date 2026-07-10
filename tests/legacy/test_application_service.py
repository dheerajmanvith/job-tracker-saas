from app import app

from services.application_service import (
    ApplicationService
)

from services.exceptions import (
    ApplicationNotFound,
    DuplicateApplication
)

from models.job_application import (
    Status
)

import pytest
import uuid


def unique_company():
    return f"Test_{uuid.uuid4().hex[:8]}"


def test_list_applications():

    with app.app_context():

        apps = ApplicationService.list_applications()

        assert isinstance(apps, list)


def test_create_application():

    with app.app_context():

        company = unique_company()

        application = (
            ApplicationService.create_application(
                company=company,
                role="Backend Intern",
                status=Status.APPLIED
            )
        )

        assert application.company == company


def test_get_application():

    with app.app_context():

        company = unique_company()

        application = (
            ApplicationService.create_application(
                company=company,
                role="SWE Intern",
                status=Status.APPLIED
            )
        )

        fetched = (
            ApplicationService.get_application(
                application.id
            )
        )

        assert fetched.id == application.id


def test_update_application():

    with app.app_context():

        company = unique_company()

        application = (
            ApplicationService.create_application(
                company=company,
                role="Backend Intern",
                status=Status.APPLIED
            )
        )

        updated = (
            ApplicationService.update_application(
                application.id,
                company="Amazon_Updated"
            )
        )

        assert updated.company == "Amazon_Updated"


def test_delete_application():

    with app.app_context():

        company = unique_company()

        application = (
            ApplicationService.create_application(
                company=company,
                role="Intern",
                status=Status.APPLIED
            )
        )

        ApplicationService.delete_application(
            application.id
        )

        with pytest.raises(
            ApplicationNotFound
        ):
            ApplicationService.get_application(
                application.id
            )


def test_duplicate_application():

    with app.app_context():

        company = unique_company()

        ApplicationService.create_application(
            company=company,
            role="Intern",
            status=Status.APPLIED
        )

        with pytest.raises(
            DuplicateApplication
        ):
            ApplicationService.create_application(
                company=company,
                role="Intern",
                status=Status.APPLIED
            )


def test_application_not_found():

    with app.app_context():

        with pytest.raises(
            ApplicationNotFound
        ):
            ApplicationService.get_application(
                99999
            )