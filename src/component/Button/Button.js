import React from "react";
import { Navigate } from "react-router-dom";

const Button = ({
  onClick,
  className,
  children,
  full = false,
  type = "button",
  bgColor = "primary",
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      className={`px-6 py-3 mt-auto font-medium border-none rounded-lg ${
        full ? "w-full" : ""
      } ${bgClassName} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
