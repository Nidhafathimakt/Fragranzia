import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "../layout/admin-layout/AdminLayout";
import useAuth from "../../hooks/useAuth";

function AdminProtectedRoute() {
  const { auth } = useAuth();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const role = user?.role || auth?.role;

  if (!auth?.accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

export default AdminProtectedRoute;
