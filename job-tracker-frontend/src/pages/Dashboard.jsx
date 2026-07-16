import useApplications from "../hooks/useApplications";
import ApplicationTable from "../components/ApplicationTable/ApplicationTable";

function Dashboard() {
  const { applications, loading, error } = useApplications();

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <p>
        <strong>Total Applications:</strong> {applications.length}
      </p>

      <ApplicationTable applications={applications} />
    </div>
  );
}

export default Dashboard;