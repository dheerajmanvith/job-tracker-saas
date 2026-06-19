from app import db
from datetime import datetime
import enum


class Status(enum.Enum):
    APPLIED = "Applied"
    PHONE_SCREEN = "Phone Screen"
    INTERVIEW = "Interview"
    OFFER = "Offer"
    REJECTED = "Rejected"


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
        db.Enum(Status),
        nullable=False,
        default=Status.APPLIED
    )

    applied_date = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    notes = db.Column(db.Text)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id")
    )