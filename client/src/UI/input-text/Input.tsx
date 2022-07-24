import React from "react";
import "./input.css";

interface InputProps {
  label: string;
  id: string;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  onChange,
  disabled = false,
  value = "",
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  </div>
);

export default Input;
