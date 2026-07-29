import { Outlet } from "react-router-dom";
import ProtectedRoute from "../../routes/ProtectedRoute";
import MainLayout from "./MainLayout";

export default function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </ProtectedRoute>
  );
}