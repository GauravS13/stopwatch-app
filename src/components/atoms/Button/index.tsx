import { FC } from "react";
import clsx from "clsx";
import { ButtonProps } from "./types";

const Button: FC<ButtonProps> = ({
  onClick,
  disabled = false,
  className = "",
  children,
}) => {
  const buttonClass = clsx(
    "px-6 py-3 text-lg font-semibold rounded-full shadow-lg transform transition-transform",
    {
      "bg-gray-400 cursor-not-allowed": disabled,
      "hover:scale-105 bg-blue-500 text-white": !disabled,
    },
    className
  );

  return (
    <button onClick={onClick} disabled={disabled} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;
