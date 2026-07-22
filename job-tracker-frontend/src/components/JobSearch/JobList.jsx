import JobCard from "./JobCard";

export default function JobList({ jobs, onTrack }) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500">
        No jobs found.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="mb-4 text-2xl font-semibold">
        Total Jobs: {jobs.length}
      </h2>

      {jobs.map((job, index) => (
        <JobCard
          key={job.id || index}
          job={job}
          onTrack={onTrack}
        />
      ))}
    </div>
  );
}