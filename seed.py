from app import app, db
from models.job_application import JobApplication

with app.app_context():
    jobs = [
        JobApplication(
            company="Google",
            role="SWE Intern",
            status="Applied"
        ),
        JobApplication(
            company="Amazon",
            role="Backend Intern",
            status="Interview"
        ),
        JobApplication(
            company="Microsoft",
            role="SDE Intern",
            status="Rejected"
        )
    ]

    db.session.add_all(jobs)
    db.session.commit()

    print("Seeded 3 job applications!")