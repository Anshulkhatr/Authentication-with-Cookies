
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
    const { user, authInitialized } = useSelector((state) => state.auth);

    // Wait until the backend verifies the session.
    if (!authInitialized) {
        return <p>Checking authentication...</p>;
    }

    // Redirect unauthenticated users to login.
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Allow authenticated users to access protected pages.
    return <Outlet />;
};

export default ProtectedRoute;
