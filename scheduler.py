from apscheduler.schedulers.background import BackgroundScheduler

from models.user import User
from models.job_application import JobApplication

from services.email_service import EmailService


scheduler = BackgroundScheduler()


def send_weekly_digest():
    """
    Send weekly digest to all users.
    """
    users = User.query.all()

    for user in users:
        try:
            EmailService.send_weekly_digest(user)
            print(f"Weekly email sent to {user.email}")
        except Exception as e:
            print(e)


def send_interview_reminder():
    """
    Send interview reminders.
    """
    users = User.query.all()

    application = JobApplication.query.first()

    if not application:
        return

    for user in users:
        try:
            EmailService.send_interview_reminder(
                user,
                application
            )
            print(f"Reminder sent to {user.email}")
        except Exception as e:
            print(e)


def start_scheduler(app):
    """
    Start background scheduler.
    """

    def weekly_job():
        with app.app_context():
            send_weekly_digest()

    def reminder_job():
        with app.app_context():
            send_interview_reminder()

    scheduler.add_job(
        weekly_job,
        "interval",
        minutes=1,
        id="weekly_digest"
    )

    scheduler.add_job(
        reminder_job,
        "interval",
        minutes=1,
        id="interview_reminder"
    )

    scheduler.start()

    print("=" * 50)
    print("Scheduler Started Successfully")
    print("Weekly Digest : Every 1 minute")
    print("Interview Reminder : Every 1 minute")
    print("=" * 50)