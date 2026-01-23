import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const raw = sessionStorage.getItem("user");

    if (!raw) return <Navigate to="/login" replace />;

    try {
        const user = JSON.parse(raw);

        if (user.role !== "Admin") {
            return <Navigate to="/" replace />;
        }
        return children;
  } catch {
    return <Navigate to="/login" replace />;
  }
}

export default AdminRoute;
