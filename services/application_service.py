from models.job_application import JobApplication
from extensions import db
from services.exceptions import ApplicationNotFound


class ApplicationService:

    @staticmethod
    def create_application(
        company,
        role,
        status,
        user_id,
        notes=None
    ):

        application = JobApplication(
            company=company,
            role=role,
            status=status.value if hasattr(status, "value") else status,
            user_id=user_id
        )

        # only if model has notes column
        if hasattr(application, "notes"):
            application.notes = notes

        db.session.add(application)
        db.session.commit()

        return application


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

        if application is None:
            raise ApplicationNotFound(f"Application {application_id} not found")

        return application


    @staticmethod
    def update_application(
        application_id,
        user_id,
        **data
    ):

        application = JobApplication.query.filter_by(
            id=application_id,
            user_id=user_id
        ).first()

        if not application:
            raise ApplicationNotFound(f"Application {application_id} not found")


        allowed_fields = [
            "company",
            "role",
            "status",
            "resume_path",
            "notes"
        ]


        for field in allowed_fields:

            if field in data and hasattr(application, field):

                setattr(
                    application,
                    field,
                    data[field]
                )


        db.session.commit()

        return application


    @staticmethod
    def delete_application(
        application_id,
        user_id
    ):

        application = JobApplication.query.filter_by(
            id=application_id,
            user_id=user_id
        ).first()


        if application is None:
            raise ApplicationNotFound(f"Application {application_id} not found")

        db.session.delete(application)
        db.session.commit()
        return True




