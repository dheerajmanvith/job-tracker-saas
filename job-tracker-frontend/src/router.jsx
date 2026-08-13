import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedLayout from "./components/layout/ProtectedLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// ==========================
// Lazy Loaded Pages
// ==========================

const LandingPage = lazy(
  () => import("./pages/LandingPage")
);

const Login = lazy(
  () => import("./pages/Login")
);

const Register = lazy(
  () => import("./pages/Register")
);

const Dashboard = lazy(
  () => import("./pages/Dashboard")
);

const Applications = lazy(
  () => import("./pages/Applications")
);

const Analytics = lazy(
  () => import("./pages/Analytics")
);

const Jobs = lazy(
  () => import("./pages/Jobs")
);

const Settings = lazy(
  () => import("./pages/Settings")
);

const ComponentDemo = lazy(
  () => import("./pages/ComponentDemo")
);

const AddApplicationForm = lazy(
  () => import("./forms/AddApplicationForm")
);

// ==========================
// Admin
// ==========================

const AdminDashboard = lazy(
  () => import("./pages/AdminDashboard")
);

// ==========================
// Error Pages
// ==========================

const NotFound = lazy(
  () => import("./pages/NotFound")
);

const ServerError = lazy(
  () => import("./pages/ServerError")
);

const ErrorPage = lazy(
  () => import("./pages/ErrorPage")
);

// ==========================
// Loading Component
// ==========================

const Loader = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3">

      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />

      <p className="text-sm font-medium text-muted-foreground">
        Loading...
      </p>

    </div>
  </div>
);

// ==========================
// Suspense Wrapper
// ==========================

const withSuspense = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

// ==========================
// Router
// ==========================

const router = createBrowserRouter([

  // ==========================
  // Public Routes
  // ==========================

  {
    path: "/",
    element: withSuspense(LandingPage),
  },

  {
    path: "/login",
    element: withSuspense(Login),
  },

  {
    path: "/register",
    element: withSuspense(Register),
  },

  // ==========================
  // Protected Routes
  // ==========================

  {
    element: <ProtectedLayout />,
    errorElement: withSuspense(ErrorPage),

    children: [

      // Dashboard

      {
        path: "/dashboard",
        element: withSuspense(Dashboard),
      },

      // Applications

      {
        path: "/applications",
        element: withSuspense(Applications),
      },

      // Analytics

      {
        path: "/analytics",
        element: withSuspense(Analytics),
      },

      // Jobs

      {
        path: "/jobs",
        element: withSuspense(Jobs),
      },

      // Settings

      {
        path: "/settings",
        element: withSuspense(Settings),
      },

      // Add Application

      {
        path: "/add",
        element: withSuspense(AddApplicationForm),
      },

      // Component Demo

      {
        path: "/demo",
        element: withSuspense(ComponentDemo),
      },

      // Admin Only Route

      {
        path: "/admin",
        element: (
          <ProtectedRoute adminOnly>
            {withSuspense(AdminDashboard)}
          </ProtectedRoute>
        ),
      },
    ],
  },

  // ==========================
  // Server Error
  // ==========================

  {
    path: "/500",
    element: withSuspense(ServerError),
  },

  // ==========================
  // 404 Not Found
  // ==========================

  {
    path: "*",
    element: withSuspense(NotFound),
  },

]);

export default router;