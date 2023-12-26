
import React from 'react';

interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="text-red-500 hover:text-red-700">
      Excluir
    </button>
  );
};

export default DeleteButton;
