from collections import Counter
from datetime import datetime

from models.job_application import JobApplication


class AnalyticsService:

    @staticmethod
    def get_applications():
        return JobApplication.query.all()

    @staticmethod
    def get_status_counts():
        applications = AnalyticsService.get_applications()

        status_counts = {}

        for application in applications:
            status = application.status
            status_counts[status] = status_counts.get(status, 0) + 1

        return status_counts

    @staticmethod
    def get_response_rate():
        status_counts = AnalyticsService.get_status_counts()

        total = sum(status_counts.values())

        if total == 0:
            return 0

        responded = (
            status_counts.get("Interview", 0)
            + status_counts.get("Offer", 0)
        )

        return round((responded / total) * 100, 2)

    @staticmethod
    def get_best_day_to_apply():
        applications = AnalyticsService.get_applications()

        days = [
            application.created_at.strftime("%A")
            for application in applications
            if application.created_at
        ]

        if not days:
            return None

        return Counter(days).most_common(1)[0][0]

    @staticmethod
    def get_average_days_per_status():
        applications = AnalyticsService.get_applications()

        status_days = {}

        now = datetime.utcnow()

        for application in applications:
            if not application.created_at:
                continue

            days = (now - application.created_at).days

            status_days.setdefault(application.status, []).append(days)

        averages = {}

        for status, values in status_days.items():
            averages[status] = round(sum(values) / len(values), 2)

        return averages