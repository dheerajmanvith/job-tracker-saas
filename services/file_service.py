import os
from werkzeug.utils import secure_filename


class FileService:

    UPLOAD_FOLDER = "uploads"

    @staticmethod
    def save_resume(file):

        os.makedirs(FileService.UPLOAD_FOLDER, exist_ok=True)

        filename = secure_filename(file.filename)

        filepath = os.path.join(
            FileService.UPLOAD_FOLDER,
            filename
        )

        file.save(filepath)

        return filepath