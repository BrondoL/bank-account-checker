import GuestRoute from "components/organisms/GuestRoute";
import PersistAuth from "components/organisms/PersistAuth";
import RequireAuth from "components/organisms/RequireAuth";
import HomePage from "pages/Home";
import SignInPage from "pages/Sign-In";
import SignUpPage from "pages/Sign-Up";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PersistAuth />}>
                    <Route element={<RequireAuth />}>
                        <Route path="/" element={<HomePage />} />
                    </Route>
                    <Route element={<GuestRoute />}>
                        <Route path="/sign-in" element={<SignInPage />} />
                        <Route path="/sign-up" element={<SignUpPage />} />
                    </Route>
                </Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </BrowserRouter>
    );
}

export default App;
