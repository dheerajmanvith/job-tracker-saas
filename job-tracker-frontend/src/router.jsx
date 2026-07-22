import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Analytics from "./pages/Analytics";
import Jobs from "./pages/Jobs";
import Settings from "./pages/Settings";
import ComponentDemo from "./pages/ComponentDemo";
import AddApplicationForm from "./forms/AddApplicationForm";

import NotFound from "./pages/NotFound";
import ServerError from "./pages/ServerError";
import ErrorPage from "./pages/ErrorPage";

import ProtectedLayout from "./components/layout/ProtectedLayout";

const router = createBrowserRouter([
  // Public Route
  {
    path: "/",
    element: <Login />,
  },

  // Protected Routes
  {
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/applications",
        element: <Applications />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/add",
        element: <AddApplicationForm />,
      },
      {
        path: "/demo",
        element: <ComponentDemo />,
      },
    ],
  },

  // Server Error
  {
    path: "/500",
    element: <ServerError />,
  },

  // 404 Page
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;