import os
from werkzeug.utils import secure_filename

from extensions import db
from models.resume import Resume


class ResumeService:
    ALLOWED_EXTENSIONS = {"pdf"}

    @staticmethod
    def allowed_file(filename):
        return (
            "." in filename
            and filename.rsplit(".", 1)[1].lower()
            in ResumeService.ALLOWED_EXTENSIONS
        )

    @staticmethod
    def upload_resume(file, user_id):
        if not file:
            raise ValueError("No file provided.")

        if not ResumeService.allowed_file(file.filename):
            raise ValueError("Only PDF files are allowed.")

        upload_folder = os.path.join("uploads", "resumes")
        os.makedirs(upload_folder, exist_ok=True)

        filename = secure_filename(file.filename)
        filepath = os.path.join(upload_folder, filename)

        file.save(filepath)

        # Remove previous resume (optional: keep only one per user)
        old_resume = Resume.query.filter_by(user_id=user_id).first()

        if old_resume:
            if os.path.exists(old_resume.filepath):
                os.remove(old_resume.filepath)

            db.session.delete(old_resume)
            db.session.commit()

        resume = Resume(
            filename=filename,
            filepath=filepath,
            user_id=user_id,
        )

        db.session.add(resume)
        db.session.commit()

        return resume

    @staticmethod
    def get_resume(user_id):
        return Resume.query.filter_by(user_id=user_id).first()

    @staticmethod
    def delete_resume(user_id):
        resume = Resume.query.filter_by(user_id=user_id).first()

        if not resume:
            return False

        if os.path.exists(resume.filepath):
            os.remove(resume.filepath)

        db.session.delete(resume)
        db.session.commit()

        return True