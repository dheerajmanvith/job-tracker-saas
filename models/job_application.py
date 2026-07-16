from datetime import datetime
from enum import Enum

from extensions import db


class Status(Enum):
    APPLIED = "Applied"
    INTERVIEW = "Interview"
    REJECTED = "Rejected"
    OFFER = "Offer"


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
        default=Status.APPLIED.value,
        index=True
    )

    resume_path = db.Column(
        db.String(255)
    )

    applied_date = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow,
        index=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    user = db.relationship(
        "User",
        back_populates="applications"
    )
    
    notes = db.Column(
    db.Text,
    nullable=True
    )
    
    def __repr__(self):
        return f"<JobApplication {self.company} - {self.role}>"