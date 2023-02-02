import Button from "components/atoms/Button";
import TextInput from "components/atoms/TextInput";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "services/api/auth";
import { setAuth } from "stores/slices/authSlice";
import { AuthType } from "types/Auth";
import * as Yup from "yup";

const SignUpForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues: AuthType = {
        username: "",
        password: "",
        confirm_password: "",
    };

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            username: Yup.string().required().min(5),
            password: Yup.string().required().min(5),
            confirm_password: Yup.string()
                .required("confirm password is a required field")
                .min(5, "confirm password must be at least 5 characters")
                .oneOf(
                    [Yup.ref("password"), null],
                    "password confirmation does not match"
                ),
        }),
        onSubmit: async (val, action) => {
            try {
                setIsLoading(true);
                const res = await auth.signUp(val);
                localStorage.setItem("auth", res?.data?.data?.access_token);
                dispatch(setAuth(res?.data?.data));
                action.resetForm();
                navigate("/");
            } catch (err: any) {
                const msg = err?.response?.data?.message ?? "sign up failed";
                toast.error(msg);
            }
            setIsLoading(false);
        },
    });

    return (
        <Fragment>
            <form onSubmit={formik.handleSubmit}>
                <div className="mt-6">
                    <TextInput
                        label="username"
                        placeholder={"Enter your username"}
                        name={"username"}
                        type="text"
                        required
                        value={formik.values.username}
                        error={formik.errors.username ?? ""}
                        touched={formik.touched.username ?? false}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="mt-6">
                    <TextInput
                        label="password"
                        placeholder={"Enter your password"}
                        name={"password"}
                        type="password"
                        required
                        value={formik.values.password}
                        error={formik.errors.password ?? ""}
                        touched={formik.touched.password ?? false}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="mt-6">
                    <TextInput
                        label="confirm password"
                        placeholder={"Enter your confirm password"}
                        name={"confirm_password"}
                        type="password"
                        required
                        value={formik.values.confirm_password}
                        error={formik.errors.confirm_password ?? ""}
                        touched={formik.touched.confirm_password ?? false}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                </div>
                <div className="mt-6">
                    <Button type="submit" isLoading={isLoading}>
                        Register
                    </Button>
                </div>
            </form>
        </Fragment>
    );
};

export default SignUpForm;
