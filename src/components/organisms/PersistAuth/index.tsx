import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import auth from "services/api/auth";
import { RootState } from "stores";
import { setAuth } from "stores/slices/authSlice";

const PersistAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;

        const getProfile = async () => {
            try {
                const res = await auth.profile();
                dispatch(setAuth(res?.data?.data))
            } catch (err) {
                localStorage.removeItem("auth");
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }

        const token = localStorage.getItem("auth");

        if (!user?.username && token) {
            getProfile();
        } else {
            setIsLoading(false);
        }

        return () => {
            isMounted = false
        }
    }, []);

    return isLoading ? <p></p> : <Outlet />;
};

export default PersistAuth;
