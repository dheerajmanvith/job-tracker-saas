import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import ProtectedLayout from "./components/layout/ProtectedLayout";

// Lazy-loaded pages
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Applications = lazy(() => import("./pages/Applications"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Settings = lazy(() => import("./pages/Settings"));
const ComponentDemo = lazy(() => import("./pages/ComponentDemo"));
const AddApplicationForm = lazy(() => import("./forms/AddApplicationForm"));

const NotFound = lazy(() => import("./pages/NotFound"));
const ServerError = lazy(() => import("./pages/ServerError"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

// Loading Component
const Loader = () => (
  <div className="flex justify-center items-center h-screen text-xl font-semibold">
    Loading...
  </div>
);

// Helper Function
const withSuspense = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  // Public Route
  {
    path: "/",
    element: withSuspense(Login),
  },

  // Protected Routes
  {
    element: <ProtectedLayout />,
    errorElement: withSuspense(ErrorPage),
    children: [
      {
        path: "/dashboard",
        element: withSuspense(Dashboard),
      },
      {
        path: "/applications",
        element: withSuspense(Applications),
      },
      {
        path: "/analytics",
        element: withSuspense(Analytics),
      },
      {
        path: "/jobs",
        element: withSuspense(Jobs),
      },
      {
        path: "/settings",
        element: withSuspense(Settings),
      },
      {
        path: "/add",
        element: withSuspense(AddApplicationForm),
      },
      {
        path: "/demo",
        element: withSuspense(ComponentDemo),
      },
    ],
  },

  // Server Error
  {
    path: "/500",
    element: withSuspense(ServerError),
  },

  // 404
  {
    path: "*",
    element: withSuspense(NotFound),
  },
]);

export default router;