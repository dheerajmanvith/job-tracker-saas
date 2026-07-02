from extensions import db
from models.audit_log import AuditLog


class AuditService:

    @staticmethod
    def log_action(admin_id: int, action: str):

        log = AuditLog(
            admin_id=admin_id,
            action=action
        )

        db.session.add(log)
        db.session.commit()

    @staticmethod
    def get_logs():

        return AuditLog.query.order_by(
            AuditLog.created_at.desc()
        ).all()