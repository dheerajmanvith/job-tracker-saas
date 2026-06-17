from app import app
from models.job_application import JobApplication, Status

with app.app_context():

    interviews = JobApplication.query.filter_by(
        status=Status.INTERVIEW
    ).all()

    for job in interviews:
        print(job.company)