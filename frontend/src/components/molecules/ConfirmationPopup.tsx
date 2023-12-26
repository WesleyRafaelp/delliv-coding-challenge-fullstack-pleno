import React from 'react';

interface ConfirmationPopupProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md">
        <p>Você tem certeza que deseja excluir este pedido?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onCancel} className="mr-2">
            Cancelar
          </button>
          <button onClick={onConfirm} className="text-red-500 hover:text-red-700">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
