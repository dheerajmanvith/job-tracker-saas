import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Analytics from "./pages/Analytics";
import Jobs from "./pages/Jobs";
import ComponentDemo from "./pages/ComponentDemo";
import NotFound from "./pages/NotFound";

import AddApplicationForm from "./forms/AddApplicationForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/add",
    element: <AddApplicationForm />,
  },
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
    path: "/demo",
    element: <ComponentDemo />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;