import Button from "components/atoms/Button";
import SelectInput from "components/atoms/SelectInput";
import TextInput from "components/atoms/TextInput";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bank from "services/api/bank";
import { setAuth } from "stores/slices/authSlice";
import { BankAccountType, CheckAccountFormType } from "types/Bank";
import * as Yup from "yup";

interface BankDescriptionType {
    [propKey: string]: string | number;
}

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [account, setAccount] = useState<BankAccountType>({
        accountBank: 'Sealabs Pay',
        accountName: 'JOHN WICK',
        accountNumber: '012345678910',
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues: CheckAccountFormType = {
        accountBank: "",
        accountNumber: "",
    };

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            accountBank: Yup.string().required("bank is a required field"),
            accountNumber: Yup.string().required(
                "account number is a required field"
            ),
        }),
        onSubmit: async (val, action) => {
            try {
                setIsLoading(true);
                const res = await bank.check(val);
                setAccount(res?.data?.data?.[0]);
            } catch (err: any) {
                const msg = err?.response?.data?.message ?? "failed to check account";
                toast.error(msg);
            }
            setIsLoading(false);
        },
    });

    const banks = [
        "bca",
        "royal",
        "bni",
        "bri",
        "mandiri",
        "cimb",
        "permata",
        "danamon",
        "dki",
        "tabungan_pensiunan_nasional",
        "nationalnobu",
        "artos",
        "hana",
        "linkaja",
        "gopay",
        "ovo",
        "dana",
    ];

    const description: BankDescriptionType = {
        bca: "BCA",
        royal: "Blu By BCA",
        bni: "BNI",
        bri: "BRI",
        mandiri: "Mandiri",
        cimb: "CIMB Niaga",
        permata: "Permata",
        danamon: "Danamon",
        dki: "Bank DKI",
        tabungan_pensiunan_nasional: "BTPN/Jenius",
        nationalnobu: "Bank NOBU",
        artos: "Bank Jago",
        hana: "Line Bank",
        linkaja: "LinkAja!",
        gopay: "GoPay",
        ovo: "OVO",
        dana: "DANA",
    };

    const handleSignOut = () => {
        dispatch(setAuth({ username: "", access_token: "" }));
        localStorage.clear();
        navigate("/sign-in");
    };

    return (
        <React.Fragment>
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#eff2fb]">
                <div className="bg-white p-10 rounded-3xl shadow-lg border border-[#5b698738] m-8 sm:min-w-[480px]">
                    <h1 className="font-bold text-3xl text-center">
                        Account Number Checker
                    </h1>
                    <div className="max-w-[420px] sm:w-auto rounded-xl">
                        <header className="flex flex-col justify-center items-center">
                            <div className="relative">
                                <img
                                    className="w-full h-auto"
                                    src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/svg-cards/card-visa-front.png"
                                    alt="front credit card"
                                />
                                <div className="front bg-transparent text-lg w-full text-white px-12 absolute left-0 bottom-12">
                                    <p className="number mb-5 sm:text-xl"></p>
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="font-bold drop-shadow-2xl tracking-widest">
                                            {account.accountNumber}
                                        </p>
                                        <span>{account.accountName}</span>
                                        <span className="uppercase">{account.accountBank}</span>
                                    </div>
                                </div>
                            </div>
                            <ul className="flex">
                                <li className="mx-2">
                                    <img
                                        className="w-16"
                                        src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/computop.png"
                                        alt=""
                                    />
                                </li>
                                <li className="mx-2">
                                    <img
                                        className="w-14"
                                        src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/verified-by-visa.png"
                                        alt=""
                                    />
                                </li>
                                <li className="ml-5">
                                    <img
                                        className="w-7"
                                        src="https://www.computop-paygate.com/Templates/imagesaboutYou_desktop/images/mastercard-id-check.png"
                                        alt=""
                                    />
                                </li>
                            </ul>
                        </header>
                    </div>
                    <div className="mt-6">
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <SelectInput
                                    label="Select Bank"
                                    name="accountBank"
                                    required
                                    value={formik.values.accountBank}
                                    error={formik.errors.accountBank ?? ""}
                                    touched={
                                        formik.touched.accountBank ?? false
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option disabled value="">
                                        Choose a Bank
                                    </option>
                                    {banks.map((bank) => (
                                        <option key={bank} value={bank}>
                                            {description[bank]}
                                        </option>
                                    ))}
                                </SelectInput>
                            </div>
                            <div className="mt-3">
                                <TextInput
                                    label="Account Number"
                                    placeholder={"Enter your account number"}
                                    name={"accountNumber"}
                                    type="text"
                                    required
                                    value={formik.values.accountNumber}
                                    error={formik.errors.accountNumber ?? ""}
                                    touched={
                                        formik.touched.accountNumber ?? false
                                    }
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            <div className="mt-6">
                                <Button isLoading={isLoading} type="submit">
                                    Check
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <p
                    className="text-blue-500 cursor-pointer"
                    onClick={handleSignOut}
                >
                    Sign Out
                </p>
            </div>
        </React.Fragment>
    );
};

export default HomePage;
