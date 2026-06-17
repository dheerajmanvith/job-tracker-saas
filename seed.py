from app import app, db
from models.user import User
from models.job_application import (
    JobApplication,
    Status
)

with app.app_context():

    user = User(
        username="darshan",
        email="darshan@example.com"
    )

    db.session.add(user)
    db.session.commit()

    jobs = [
        JobApplication(
            company="Google",
            role="SWE Intern",
            status=Status.APPLIED,
            notes="Applied via careers page",
            user_id=user.id
        ),

        JobApplication(
            company="Amazon",
            role="Backend Intern",
            status=Status.INTERVIEW,
            user_id=user.id
        ),

        JobApplication(
            company="Microsoft",
            role="SDE Intern",
            status=Status.REJECTED,
            user_id=user.id
        )
    ]

    db.session.add_all(jobs)
    db.session.commit()

    print("Seed complete!")