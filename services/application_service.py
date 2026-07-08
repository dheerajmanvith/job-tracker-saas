from models.job_application import JobApplication
from extensions import db


class ApplicationService:

    @staticmethod
    def create_application(company, role, status, user_id):

        application = JobApplication(
            company=company,
            role=role,
            status=status,
            user_id=user_id
        )

        db.session.add(application)
        db.session.commit()

        return application

    @staticmethod
    def list_applications(user_id):

        return JobApplication.query.filter_by(
            user_id=user_id
        ).all()

    @staticmethod
    def get_application(application_id, user_id):

        return JobApplication.query.filter_by(
            id=application_id,
            user_id=user_id
        ).first()

    @staticmethod
    def update_application(application_id, user_id, **data):

        application = JobApplication.query.filter_by(
            id=application_id,
            user_id=user_id
        ).first()

        if not application:
            return None

        if "company" in data:
            application.company = data["company"]

        if "role" in data:
            application.role = data["role"]

        if "status" in data:
            application.status = data["status"]

        if "resume_path" in data:
            application.resume_path = data["resume_path"]

        db.session.commit()

        return application

    @staticmethod
    def delete_application(application_id, user_id):

        application = JobApplication.query.filter_by(
            id=application_id,
            user_id=user_id
        ).first()

        if application:
            db.session.delete(application)
            db.session.commit()