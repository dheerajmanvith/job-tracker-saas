from flask import Blueprint, jsonify, request, send_file

from services.csv_service import CSVService

csv_bp = Blueprint("csv", __name__)


@csv_bp.route("/api/applications/export", methods=["GET"])
def export_csv():

    filename = CSVService.export_applications()

    return send_file(
        filename,
        as_attachment=True,
        download_name="applications.csv",
        mimetype="text/csv"
    )


@csv_bp.route("/api/applications/import", methods=["POST"])
def import_csv():

    if "file" not in request.files:
        return jsonify({
            "error": "CSV file is required"
        }), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({
            "error": "No file selected"
        }), 400

    result = CSVService.import_applications(file)

    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200