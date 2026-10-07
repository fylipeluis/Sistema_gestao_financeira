import { Navigate } from "react-router-dom";
import { isAdminAutenticado } from "../services/authService";

interface Props {
  children: React.ReactNode;
}

export function AdminRoute({ children }: Props) {
  if (!isAdminAutenticado()) {
    return <Navigate to="/login/admin" replace />;
  }
  return <>{children}</>;
}
