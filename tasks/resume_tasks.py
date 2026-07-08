from PyPDF2 import PdfReader

from celery_app import celery


@celery.task
def parse_resume(filepath):

    reader = PdfReader(filepath)

    text = ""

    for page in reader.pages:
        extracted = page.extract_text()

        if extracted:
            text += extracted

    print("=" * 50)
    print("Resume Parsed Successfully")
    print(text[:500])
    print("=" * 50)

    return text