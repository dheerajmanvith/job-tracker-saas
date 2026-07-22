export default function JobCard({ job, onTrack }) {
  return (
    <div className="mb-4 rounded-lg border border-gray-300 p-4 shadow-sm">
      <h3 className="text-xl font-semibold">
        {job.title || "No Title"}
      </h3>

      <p className="mt-2">
        <strong>Company:</strong> {job.company || "N/A"}
      </p>

      <p>
        <strong>Location:</strong> {job.location || "N/A"}
      </p>

      <p>
        <strong>Salary:</strong>{" "}
        {job.salary_min || "-"} - {job.salary_max || "-"}
      </p>

      {job.redirect_url && (
        <p className="mt-3">
          <a
            href={job.redirect_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Job
          </a>
        </p>
      )}

      <button
        onClick={() => onTrack(job)}
        className="mt-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
      >
        Track Job
      </button>
    </div>
  );
}