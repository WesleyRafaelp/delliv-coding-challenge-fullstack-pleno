import React, { useEffect, useState } from 'react';
import Button from '../atoms/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders }  from '@/store/reducers/orders';

interface OrderStatusUpdaterProps {
  currentStatus: string;
  onUpdateStatus: (newStatus: string) => void;
  availableStatusOptions: string[];
}

const OrderStatusUpdater: React.FC<OrderStatusUpdaterProps> = ({ currentStatus, onUpdateStatus, availableStatusOptions }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleUpdateStatus = () => {
    onUpdateStatus(newStatus);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className="flex items-center">
          <select
            className="border border-gray-300 rounded p-2 mr-2 focus:outline-none focus:ring focus:border-blue-300"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            {availableStatusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <Button type='button' onClick={handleUpdateStatus}>Atualizar Status</Button>
        </div>
      ) : (
        <Button type='button' onClick={() => setIsEditing(true)}>Editar Status</Button>
      )}
    </div>
  );
};

export default OrderStatusUpdater;
