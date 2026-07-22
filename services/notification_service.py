from extensions import db
from models.notification import Notification


class NotificationService:

    @staticmethod
    def create_notification(
        user_id,
        title,
        message
    ):
        notification = Notification(
            user_id=user_id,
            title=title,
            message=message
        )

        db.session.add(notification)
        db.session.commit()

        return notification


    @staticmethod
    def get_user_notifications(
        user_id,
        limit=20
    ):
        notifications = (
            Notification.query
            .filter_by(user_id=user_id)
            .order_by(
                Notification.created_at.desc()
            )
            .limit(limit)
            .all()
        )

        return notifications


    @staticmethod
    def mark_as_read(
        notification_id,
        user_id
    ):
        notification = (
            Notification.query
            .filter_by(
                id=notification_id,
                user_id=user_id
            )
            .first()
        )

        if not notification:
            return None


        notification.is_read = True

        db.session.commit()

        return notification


    @staticmethod
    def unread_count(
        user_id
    ):
        count = (
            Notification.query
            .filter_by(
                user_id=user_id,
                is_read=False
            )
            .count()
        )

        return count