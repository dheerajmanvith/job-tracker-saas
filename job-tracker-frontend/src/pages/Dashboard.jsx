import DashboardLayout from "../components/layout/DashboardLayout";
import ApplicationCard from "../components/ApplicationCard";
import ResumeUpload from "../components/FileUpload/ResumeUpload";
import useApplications from "../hooks/useApplications";

function Dashboard() {
  const {
    applications,
    loading,
    error,
  } = useApplications();

  const stats = {
    total: applications.length,
    applied: applications.filter(
      (app) => app.status === "APPLIED"
    ).length,
    interviews: applications.filter(
      (app) => app.status === "INTERVIEW"
    ).length,
    offers: applications.filter(
      (app) => app.status === "OFFER"
    ).length,
    rejected: applications.filter(
      (app) => app.status === "REJECTED"
    ).length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-muted-foreground">
            Welcome to your Job Tracker dashboard.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {stats.total}
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">
              Applied
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {stats.applied}
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">
              Interviews
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {stats.interviews}
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">
              Offers
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {stats.offers}
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground">
              Rejected
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {stats.rejected}
            </p>
          </div>
        </div>

        {/* Resume Upload */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">
            Resume
          </h2>

          <ResumeUpload />
        </div>

        {/* Recent Applications */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold">
            Recent Applications
          </h2>

          {loading && (
            <p>Loading applications...</p>
          )}

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          {!loading &&
            !error &&
            applications.length === 0 && (
              <p>No applications found.</p>
            )}

          {!loading &&
            !error &&
            applications.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {applications
                  .slice(0, 6)
                  .map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                    />
                  ))}
              </div>
            )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;