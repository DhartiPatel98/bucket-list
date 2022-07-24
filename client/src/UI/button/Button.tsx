import React, { ReactElement } from "react";
import "./button.css";

interface ButtonProps {
  label: string | ReactElement;
  id: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "submit" | "button";
}

const Button: React.FC<ButtonProps> = ({
  id,
  label,
  onClick,
  disabled = false,
  type = "button",
}) => (
  <div>
    <button type={type} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  </div>
);

export default Button;
