import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Analytics from "./pages/Analytics";
import Jobs from "./pages/Jobs";
import ComponentDemo from "./pages/ComponentDemo";
import NotFound from "./pages/NotFound";
import AddApplicationForm from "./forms/AddApplicationForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import Settings from "./pages/Settings";


const router = createBrowserRouter([

  {
    path: "/",
    element: <Login />
  },


  {
    path: "/add",
    element:
      <ProtectedRoute>
        <AddApplicationForm />
      </ProtectedRoute>
  },


  {
    path: "/dashboard",
    element:
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
  },


  {
    path: "/applications",
    element:
      <ProtectedRoute>
        <Applications />
      </ProtectedRoute>
  },


  {
    path: "/analytics",
    element:
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
  },


  {
    path: "/jobs",
    element:
      <ProtectedRoute>
        <Jobs />
      </ProtectedRoute>
  },


  {
    path: "/settings",
    element:
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
  },


  {
    path: "/demo",
    element:
      <ProtectedRoute>
        <ComponentDemo />
      </ProtectedRoute>
  },


  {
    path: "*",
    element: <NotFound />
  }

]);


export default router;