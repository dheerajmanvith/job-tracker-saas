import csv
import os

from extensions import db
from models.job_application import JobApplication


class CSVService:

    @staticmethod
    def export_applications():

        os.makedirs("uploads", exist_ok=True)

        filename = "uploads/applications.csv"

        applications = JobApplication.query.all()

        with open(filename, mode="w", newline="", encoding="utf-8") as csv_file:

            writer = csv.writer(csv_file)

            writer.writerow([
                "company",
                "role",
                "status",
                "resume_path",
                "user_id"
            ])

            for app in applications:

                writer.writerow([
                    app.company,
                    app.role,
                    app.status,
                    app.resume_path,
                    app.user_id
                ])

        return filename

    @staticmethod
    def import_applications(file):

        expected_headers = [
            "company",
            "role",
            "status",
            "resume_path",
            "user_id"
        ]

        reader = csv.DictReader(
            file.stream.read().decode("utf-8").splitlines()
        )

        # -----------------------------
        # Validate CSV Headers
        # -----------------------------
        if reader.fieldnames != expected_headers:
            return {
                "error": "Invalid CSV headers",
                "expected": expected_headers,
                "received": reader.fieldnames
            }

        imported = 0
        skipped = 0

        for row in reader:

            try:
                company = row.get("company")
                role = row.get("role")
                status = row.get("status")
                resume_path = row.get("resume_path")

                user_id = int(row.get("user_id"))

                existing = JobApplication.query.filter_by(
                    company=company,
                    role=role,
                    user_id=user_id
                ).first()

                if existing:
                    skipped += 1
                    continue

                application = JobApplication(
                    company=company,
                    role=role,
                    status=status,
                    resume_path=resume_path,
                    user_id=user_id
                )

                db.session.add(application)
                imported += 1

            except Exception:
                skipped += 1

        db.session.commit()

        return {
            "imported": imported,
            "skipped": skipped
        }