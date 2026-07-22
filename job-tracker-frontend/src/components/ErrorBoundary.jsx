import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error Boundary caught an error:", error);
    console.error("Error Info:", errorInfo);

    // You can send errors to Sentry, LogRocket, etc. here.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
          <div className="max-w-md rounded-xl border bg-card p-8 text-center shadow-lg">
            <h1 className="mb-4 text-3xl font-bold text-destructive">
              Something went wrong
            </h1>

            <p className="mb-6 text-muted-foreground">
              An unexpected error occurred. Please refresh the page or try again
              later.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="rounded-lg bg-primary px-5 py-2 text-primary-foreground transition hover:opacity-90"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;