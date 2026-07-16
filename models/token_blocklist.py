from datetime import datetime

from extensions import db


class TokenBlocklist(db.Model):

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    jti = db.Column(
        db.String(255),
        nullable=False,
        unique=True
    )

    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.utcnow
    )