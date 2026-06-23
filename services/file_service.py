import os
from werkzeug.utils import secure_filename
from PyPDF2 import PdfReader

UPLOAD_FOLDER = "uploads"


class FileService:

    @staticmethod
    def save_file(file):

        filename = secure_filename(file.filename)

        filepath = os.path.join(
            UPLOAD_FOLDER,
            filename
        )

        file.save(filepath)

        return filepath


    @staticmethod
    def extract_text(filepath):

        reader = PdfReader(filepath)

        text = ""

        for page in reader.pages:
            text += page.extract_text() or ""

        return text