import JobCard from "./JobCard";

export default function JobList({ jobs }) {
  console.log("Jobs:", jobs);

  return (
    <>
      <h2>Total Jobs: {jobs.length}</h2>

      {jobs.map((job, index) => (
        <JobCard
          key={index}
          job={job}
        />
      ))}
    </>
  );
}