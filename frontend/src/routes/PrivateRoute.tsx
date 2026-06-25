import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

function PrivateRoute({
  children,
}: {
  children: ReactNode;
}) {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;