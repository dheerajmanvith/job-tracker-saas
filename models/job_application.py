from extensions import db


class JobApplication(db.Model):
    __tablename__ = "job_applications"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    company = db.Column(
        db.String(100),
        nullable=False
    )

    role = db.Column(
        db.String(100),
        nullable=False
    )

    status = db.Column(
        db.String(50),
        nullable=False,
        default="Applied"
    )

    resume_path = db.Column(
        db.String(255)
    )

    def __repr__(self):
        return (
            f"<JobApplication "
            f"{self.company} - "
            f"{self.role}>"
        )