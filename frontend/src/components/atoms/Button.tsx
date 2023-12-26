import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
    >
      {children}
    </button>
  );
};

export default Button;
