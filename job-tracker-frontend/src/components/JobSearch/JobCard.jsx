export default function JobCard({ job }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
      }}
    >
      <h3>{job.title}</h3>

      <p>
        <strong>{job.company}</strong>
      </p>

      <p>{job.location}</p>

      <p>
        Salary:
        {" "}
        {job.salary_min || "-"} - {job.salary_max || "-"}
      </p>
    </div>
  );
}