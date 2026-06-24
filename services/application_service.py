from extensions import db

from models.job_application import (
    JobApplication,
    Status
)

from services.exceptions import (
    ApplicationNotFound,
    DuplicateApplication
)


class ApplicationService:

    @staticmethod
    def list_applications(user_id):

        return JobApplication.query.filter_by(
            user_id=user_id
        ).all()

    @staticmethod
    def get_application(
        application_id,
        user_id
    ):

        application = JobApplication.query.filter_by(
            id=application_id,
            user_id=user_id
        ).first()

        if not application:

            raise ApplicationNotFound(
                f"Application {application_id} not found"
            )

        return application

    @staticmethod
    def create_application(
        company,
        role,
        user_id,
        status=Status.APPLIED,
        resume_path=None
    ):

        existing = JobApplication.query.filter_by(
            company=company,
            role=role,
            user_id=user_id
        ).first()

        if existing:

            raise DuplicateApplication(
                "Application already exists"
            )

        application = JobApplication(
            company=company,
            role=role,
            user_id=user_id,
            status=(
                status.value
                if isinstance(status, Status)
                else status
            ),
            resume_path=resume_path
        )

        db.session.add(application)
        db.session.commit()

        return application

    @staticmethod
    def update_application(
        application_id,
        user_id,
        **kwargs
    ):

        application = (
            ApplicationService.get_application(
                application_id,
                user_id
            )
        )

        for key, value in kwargs.items():

            if hasattr(application, key):

                if (
                    key == "status"
                    and isinstance(value, Status)
                ):
                    value = value.value

                setattr(
                    application,
                    key,
                    value
                )

        db.session.commit()

        return application

    @staticmethod
    def delete_application(
        application_id,
        user_id
    ):

        application = (
            ApplicationService.get_application(
                application_id,
                user_id
            )
        )

        db.session.delete(application)
        db.session.commit()

        return True