import Button from "components/atoms/Button";
import SignInForm from "components/organisms/SignInForm";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignInPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#eff2fb]">
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-[#5b698738] m-8 sm:min-w-[480px]">
                <h1 className="font-bold text-3xl tracking-tighter">
                    Log in to your account
                </h1>

                <SignInForm />

                <div className="mt-4">
                    <hr />
                </div>

                <div className="mt-6">
                    <Button className="text-center inline-flex items-center justify-center !bg-white border border-[#8794b0] !text-black">
                        <FcGoogle className="w-6 h-6 mr-2 -ml-1" />
                        <span className="mt-1">Sign in with Google</span>
                    </Button>
                </div>

                <div className="mt-2">
                    <Button className="text-center inline-flex items-center justify-center !bg-white border border-[#8794b0] !text-black">
                        <FaGithub className="w-6 h-6 mr-2 -ml-1" />
                        <span className="mt-1">Sign in with Github</span>
                    </Button>
                </div>

                <p className="mt-3">
                    Don&apos;t have an account?{" "}
                    <Link to={"/sign-up"} className="text-blue-500">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;
