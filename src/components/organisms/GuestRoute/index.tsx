import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "stores";

const GuestRoute = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    if (user?.username) {
        if (window.history.length > 2) {
            return <Navigate to={from} replace />;
        }
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default GuestRoute;
