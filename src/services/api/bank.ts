import axios from "axios";
import { CheckAccountFormType } from "types/Bank";

const BASE_URL = import.meta.env.VITE_APP_CHECKER_API_URL;
const http = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

export default {
    check: (payload: CheckAccountFormType) => {
        const params = new URLSearchParams();
        params.append("accountBank", payload.accountBank);
        params.append("accountNumber", payload.accountNumber);
        return http.post("/check", params)
    },
};
