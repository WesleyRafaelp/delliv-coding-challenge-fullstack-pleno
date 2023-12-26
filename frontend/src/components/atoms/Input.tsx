import React from 'react';

interface InputProps {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  inputMode?: "search" | "text" | "numeric" | "none" | "email" | "tel" | "url" | "decimal" | undefined;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, register, inputMode }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
      {...register}
      inputMode={inputMode}
    />
  );
};

export default Input;
