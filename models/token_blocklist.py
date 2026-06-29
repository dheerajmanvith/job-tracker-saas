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