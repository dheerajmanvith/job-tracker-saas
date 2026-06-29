from flask_mail import Message
from flask import render_template

from extensions import mail


class EmailService:

    @staticmethod
    def send_registration_email(user):
        """
        Send welcome email after user registration.
        """

        msg = Message(
            subject="Welcome to Job Tracker SaaS",
            recipients=[user.email]
        )

        msg.html = f"""
        <h2>Welcome, {user.username}!</h2>

        <p>Your account has been created successfully.</p>

        <p>Happy Job Hunting 🚀</p>
        """

        mail.send(msg)

    @staticmethod
    def send_weekly_digest(user):
        """
        Send weekly digest email.
        """

        msg = Message(
            subject="Your Weekly Job Tracker Summary",
            recipients=[user.email]
        )

        msg.html = render_template(
            "emails/weekly_digest.html",
            user=user
        )

        mail.send(msg)

    @staticmethod
    def send_interview_reminder(user, application):
        """
        Send interview reminder email.
        """

        msg = Message(
            subject="Interview Reminder",
            recipients=[user.email]
        )

        msg.html = render_template(
            "emails/interview_reminder.html",
            user=user,
            application=application
        )

        mail.send(msg)