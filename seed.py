from app import app
from extensions import db
from models.user import User
from models.job_application import JobApplication, Status


with app.app_context():

    # Clear existing data
    JobApplication.query.delete()
    User.query.delete()
    db.session.commit()

    # Create user
    user = User(
        username="darshan",
        email="darshan@example.com"
    )

    user.set_password("password123")

    db.session.add(user)
    db.session.commit()

    # Create job applications
    jobs = [
        JobApplication(
            company="Google",
            role="SWE Intern",
            status=Status.APPLIED.value,
            user_id=user.id
        ),

        JobApplication(
            company="Amazon",
            role="Backend Intern",
            status=Status.INTERVIEW.value,
            user_id=user.id
        ),

        JobApplication(
            company="Microsoft",
            role="SDE Intern",
            status=Status.REJECTED.value,
            user_id=user.id
        )
    ]

    db.session.add_all(jobs)
    db.session.commit()

    print("✅ Seed complete!")