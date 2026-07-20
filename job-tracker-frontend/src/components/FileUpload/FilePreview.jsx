export default function FilePreview({ file, onDelete }) {
  if (!file) return null;

  const fileSize = (file.size / 1024).toFixed(2);

  return (
    <div className="mt-6 border rounded-lg p-4 flex items-center justify-between bg-gray-50">
      <div>
        <p className="font-medium">📄 {file.name}</p>
        <p className="text-sm text-gray-500">
          {fileSize} KB
        </p>
      </div>

      <button
        onClick={onDelete}
        className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}