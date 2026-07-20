import { useState } from "react";
import {
  uploadResume,
  deleteResume,
} from "../../services/resumeService";
import UploadProgress from "./UploadProgress";
import FilePreview from "./FilePreview";
import DeleteResumeDialog from "./DeleteResumeDialog";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    console.log("Selected File:", selectedFile);

    if (!selectedFile) {
      setMessage("No file selected.");
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setMessage("Please select a PDF file.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setProgress(0);
    setMessage("");
  };

  // Upload resume
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please choose a PDF first.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      setProgress(0);

      const response = await uploadResume(file, (event) => {
        if (event.total) {
          const percent = Math.round(
            (event.loaded * 100) / event.total
          );
          setProgress(percent);
        }
      });

      console.log("Upload Response:", response);

      setMessage("✅ Resume uploaded successfully.");
    } catch (error) {
      console.error("Upload Error:", error);

      if (error.response) {
        setMessage(error.response.data.message || "Upload failed.");
      } else {
        setMessage("Unable to connect to the server.");
      }
    } finally {
      setUploading(false);
    }
  };

  // Delete resume
  const handleDelete = async () => {
    try {
      await deleteResume();

      setFile(null);
      setProgress(0);
      setMessage("Resume deleted successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete resume.");
    } finally {
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">
        Upload Resume
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 block w-full border rounded p-2"
      />

      {file && (
        <div className="mb-4">
          <p className="text-sm">
            <strong>Selected:</strong> {file.name}
          </p>
        </div>
      )}

      {uploading && (
        <UploadProgress progress={progress} />
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>

      {message && (
        <p className="mt-4 text-sm font-medium">
          {message}
        </p>
      )}

      {file && (
        <FilePreview
          file={file}
          onDelete={() => setShowDeleteDialog(true)}
        />
      )}

      <DeleteResumeDialog
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}