import React from "react";
import "./textarea.css";

interface InputProps {
  label: string;
  id: string;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const TextArea: React.FC<InputProps> = ({
  id,
  label,
  onChange,
  disabled = false,
  value = "",
}) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea
        id={id}
        name={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  </div>
);

export default TextArea;
