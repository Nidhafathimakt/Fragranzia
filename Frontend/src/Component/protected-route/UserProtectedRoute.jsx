import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import UserLayout from "../layout/user-layout/UserLayout";
import useAuth from "../../hooks/useAuth";

const AUTH_REQUIRED_PATHS = [
  "/cart",
  "/checkout",
  "/account",
  "/ordering",
];

function UserProtectedRoute() {
  const { auth } = useAuth();
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const needsAuth = AUTH_REQUIRED_PATHS.some((p) => path.startsWith(p));

  if (needsAuth && !auth?.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  );
}

export default UserProtectedRoute;
