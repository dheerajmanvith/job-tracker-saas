import { Link } from "react-router-dom";
import { AlertTriangle, RefreshCw } from "lucide-react";

function ServerError() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <AlertTriangle className="mx-auto mb-6 h-20 w-20 text-destructive" />

        <h1 className="text-6xl font-bold">500</h1>

        <h2 className="mt-4 text-2xl font-semibold">
          Internal Server Error
        </h2>

        <p className="mt-3 text-muted-foreground">
          Oops! Something went wrong on our server. Please try again in a few
          minutes.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90"
          >
            <RefreshCw className="h-5 w-5" />
            Retry
          </button>

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 transition hover:bg-muted"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ServerError;