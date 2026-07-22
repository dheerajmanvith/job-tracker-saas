from flask_jwt_extended import get_jwt_identity

from extensions import db
from models.user import User


class ProfileService:

    @staticmethod
    def get_profile():
        """
        Return the currently authenticated user's profile.
        """
        user_id = get_jwt_identity()

        user = User.query.get(user_id)

        if not user:
            raise ValueError("User not found.")

        return user.to_dict()

    @staticmethod
    def update_profile(data):
        """
        Update username, email and timezone.
        """
        user_id = get_jwt_identity()

        user = User.query.get(user_id)

        if not user:
            raise ValueError("User not found.")

        if "username" in data:
            user.username = data["username"]

        if "email" in data:
            user.email = data["email"]

        if "timezone" in data:
            user.timezone = data["timezone"]

        db.session.commit()

        return user.to_dict()

    @staticmethod
    def change_password(data):
        """
        Change user password.
        """
        user_id = get_jwt_identity()

        user = User.query.get(user_id)

        if not user:
            raise ValueError("User not found.")

        current_password = data.get("current_password")
        new_password = data.get("new_password")

        if not current_password or not new_password:
            raise ValueError(
                "Current and new passwords are required."
            )

        if not user.check_password(current_password):
            raise ValueError(
                "Current password is incorrect."
            )

        user.set_password(new_password)

        db.session.commit()

        return {
            "message": "Password updated successfully."
        }

    @staticmethod
    def update_webhook(data):
        """
        Update webhook URL.
        """
        user_id = get_jwt_identity()

        user = User.query.get(user_id)

        if not user:
            raise ValueError("User not found.")

        user.webhook_url = data.get("webhook_url")

        db.session.commit()

        return user.to_dict()

    @staticmethod
    def delete_account():
        """
        Permanently delete the authenticated user.
        """
        user_id = get_jwt_identity()

        user = User.query.get(user_id)

        if not user:
            raise ValueError("User not found.")

        db.session.delete(user)
        db.session.commit()

        return {
            "message": "Account deleted successfully."
        }