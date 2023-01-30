import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "stores";

const RequireAuth = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (user?.username) {
        return <Outlet />;
    }
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default RequireAuth;
