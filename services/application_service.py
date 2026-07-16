from extensions import db

from models.job_application import JobApplication

from services.exceptions import (
    ApplicationNotFound
)


class ApplicationService:

    # -----------------------------------------
    # CREATE APPLICATION
    # -----------------------------------------

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

        if hasattr(application, "notes"):
            application.notes = notes

        db.session.add(application)

        db.session.commit()

        return application

    # -----------------------------------------
    # LIST APPLICATIONS
    # -----------------------------------------

    @staticmethod
    def list_applications(user_id):

        return JobApplication.query.filter_by(

            user_id=user_id

        ).order_by(

            JobApplication.id.desc()

        ).all()

    # -----------------------------------------
    # GET SINGLE APPLICATION
    # -----------------------------------------

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

            raise ApplicationNotFound(

                f"Application {application_id} not found"

            )

        return application

    # -----------------------------------------
    # UPDATE APPLICATION
    # -----------------------------------------

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

        if application is None:

            raise ApplicationNotFound(

                f"Application {application_id} not found"

            )

        allowed_fields = [

            "company",

            "role",

            "status",

            "notes",

            "resume_path"

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

    # -----------------------------------------
    # DELETE APPLICATION
    # -----------------------------------------

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

            raise ApplicationNotFound(

                f"Application {application_id} not found"

            )

        db.session.delete(application)

        db.session.commit()

        return True

    # -----------------------------------------
    # APPLICATION STATS
    # -----------------------------------------

    @staticmethod
    def get_stats(user_id):

        applications = JobApplication.query.filter_by(
            user_id=user_id
        ).all()

        stats = {

            "total": len(applications),

            "Applied": 0,

            "Interview": 0,

            "Offer": 0,

            "Rejected": 0

        }

        for app in applications:

            status = app.status

            if hasattr(status, "value"):
                status = status.value

            if status in stats:
                stats[status] += 1

        return stats