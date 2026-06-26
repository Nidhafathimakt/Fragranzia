import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function LoginAndSignupProtectedRoute() {
  const { auth } = useAuth();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (auth?.accessToken) {
    if (user?.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default LoginAndSignupProtectedRoute;
