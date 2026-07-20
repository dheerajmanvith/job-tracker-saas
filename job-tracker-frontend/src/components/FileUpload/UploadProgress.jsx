export default function UploadProgress({ progress }) {
  return (
    <div className="my-4">
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-center">
        {progress}%
      </p>
    </div>
  );
}