import axios from "configs/axios";
import { AuthType } from "types/Auth";

export default {
    signIn: (credentials: AuthType) =>
        axios.post("/sign-in", credentials, {
            withCredentials: true,
        }),
    signUp: (payload: AuthType) => axios.post("/sign-up", payload),
    profile: () => {
        const token = localStorage.getItem("auth");
        return axios.get("/profile", {
            headers: {
                Authorization: "Bearer " + token
            }
        })

    }
};
