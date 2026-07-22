from enum import Enum

from extensions import db

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)


class Role(Enum):
    USER = "USER"
    ADMIN = "ADMIN"


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    username = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.Enum(Role),
        nullable=False,
        default=Role.USER
    )

    # ==========================
    # Profile Settings
    # ==========================

    timezone = db.Column(
        db.String(100),
        nullable=False,
        default="UTC"
    )

    webhook_url = db.Column(
        db.String(500),
        nullable=True
    )


    # ==========================
    # Audit Fields
    # ==========================

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        nullable=False
    )

    updated_at = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        onupdate=db.func.now(),
        nullable=False
    )


    # ==========================
    # Relationships
    # ==========================

    applications = db.relationship(
        "JobApplication",
        back_populates="user",
        lazy=True,
        cascade="all, delete-orphan"
    )


    # ==========================
    # Password Methods
    # ==========================

    def set_password(self, password):
        """
        Hash and store user password.
        """
        self.password_hash = generate_password_hash(
            password
        )


    def check_password(self, password):
        """
        Verify password.
        """
        return check_password_hash(
            self.password_hash,
            password
        )


    # ==========================
    # Serialization
    # ==========================

    def to_dict(self):
        """
        Convert user object into JSON response.
        """

        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": (
                self.role.value
                if self.role
                else None
            ),
            "timezone": self.timezone,
            "webhook_url": self.webhook_url,
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
            "updated_at": (
                self.updated_at.isoformat()
                if self.updated_at
                else None
            )
        }


    def __repr__(self):
        return f"<User {self.username}>"