import { FC, Fragment, ReactNode, SelectHTMLAttributes } from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    touched?: boolean;
    children: ReactNode;
}

const SelectInput: FC<SelectInputProps> = ({
    label,
    children,
    error = "",
    touched = false,
    ...nativeProps
}: SelectInputProps) => {
    const { name, required } = nativeProps;

    return (
        <Fragment>
            <label
                htmlFor={name}
                className="block mb-2 text-base font-medium text-blue-500"
            >
                {label}{" "}
                {required === true && (
                    <span className="text-red-400">&lowast;</span>
                )}
            </label>
            <select
                {...nativeProps}
                className={[
                    "bg-white border text-gray-900 text-sm block w-full p-3.5 rounded-lg focus:outline-none border-[#8794b0] focus:ring-blue-500 focus:border-blue-500",
                    nativeProps.className,
                ].join(" ")}
            >
                {children}
            </select>
            {touched && error && (
                <div className="mt-2 flex flex-row text-red-600 text-sm gap-1">
                    <FaExclamationCircle className="mt-[0.1rem]" />
                    <p>{error}</p>
                </div>
            )}
        </Fragment>
    );
};

export default SelectInput;
