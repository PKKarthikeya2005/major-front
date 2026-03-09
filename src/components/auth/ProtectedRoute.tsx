import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
    allowedRoles?: ('client' | 'photographer' | 'admin')[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect based on their actual role to avoid "Unauth" dead ends
        if (user.role === 'admin') return <Navigate to="/admin" replace />;
        if (user.role === 'photographer') return <Navigate to="/photographers" replace />; // Or dashboard
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
