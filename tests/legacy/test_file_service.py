from services.file_service import (
    FileService
)

from unittest.mock import (
    Mock,
    patch
)


def test_save_file():

    fake_file = Mock()

    fake_file.filename = "resume.pdf"

    fake_file.save = Mock()

    path = FileService.save_file(
        fake_file
    )

    assert "resume.pdf" in path


@patch(
    "services.file_service.PdfReader"
)
def test_extract_text(
        mock_reader):

    page = Mock()

    page.extract_text.return_value = (
        "Backend Engineer"
    )

    mock_reader.return_value.pages = [
        page
    ]

    text = FileService.extract_text(
        "dummy.pdf"
    )

    assert (
        "Backend Engineer"
        in text
    )