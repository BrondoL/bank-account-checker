import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "types/User";

interface AuthSliceType {
    user: UserType;
    userLoading: boolean;
    userError: string;
}

const initialState: AuthSliceType = {
    user: {
        username: '',
        access_token: '',
    },
    userLoading: false,
    userError: '',
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => ({
            ...state,
            user: { ...state.user, ...action.payload },
        }),
    },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
