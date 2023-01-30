import { FC, InputHTMLAttributes, useState } from "react";
import { FaExclamationCircle, FaEye, FaEyeSlash } from "react-icons/fa";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    placeholder: string;
    error?: string;
    touched?: boolean;
}

const TextInput: FC<TextInputProps> = ({
    label,
    placeholder,
    error = "",
    touched = false,
    ...nativeProps
}: TextInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const { name, type, required } = nativeProps;

    return (
        <div>
            <label
                htmlFor={name}
                className="block mb-2 text-base font-medium text-blue-500"
            >
                {label}{" "}
                {required === true && (
                    <span className="text-red-400">&lowast;</span>
                )}
            </label>
            <div className={type === "password" ? "relative" : "static"}>
                <input
                    {...nativeProps}
                    className={[
                        "border text-gray-900 text-sm block w-full p-3 rounded-lg focus:outline-none",
                        error && touched
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-[#8794b0] focus:ring-blue-500 focus:border-blue-500",
                        nativeProps.className,
                    ].join(" ")}
                    type={type === "password" && showPassword ? "text" : type}
                    placeholder={placeholder}
                />
                {type === "password" && (
                    <div
                        className="absolute top-[0.20rem] right-0 p-3"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-hidden="true"
                    >
                        {showPassword ? (
                            <FaEyeSlash className="w-5 h-5" />
                        ) : (
                            <FaEye className="w-5 h-5" />
                        )}
                    </div>
                )}
            </div>
            {touched && error && (
                <div className="mt-2 flex flex-row text-red-600 text-sm gap-1">
                    <FaExclamationCircle className="mt-[0.1rem]" />
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};
export default TextInput;
