import React, { useEffect, useState } from 'react';
import OrderStatusUpdater from '../molecules/OrderStatusUpdater';
import DeleteButton from '../atoms/DeleteButton';
import ConfirmationPopup from '../molecules/ConfirmationPopup';
import { getOrders, orderSelector, removeOrder, updateOrder } from '@/store/reducers/orders';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

const OrderList: React.FC = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const dispatch = useAppDispatch()
  const {orders, loading, error}  = useAppSelector(orderSelector);

  

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const handleDeleteClick = (orderId: number) => {
    setSelectedOrderId(orderId);
  };

  const handleCancelDelete = () => {
    setSelectedOrderId(null);
  };

  const handleConfirmDelete = () => {
    dispatch(removeOrder(selectedOrderId));
    setSelectedOrderId(null);
  };

  const handleUpdateStatus = (orderId: number, newStatus: string) => {
    const order = {
      id:orderId,
      status: newStatus,
    }
    dispatch(updateOrder(order))
  };

  return (
    <div>
      {loading && (
        <div className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md mb-4" role="alert">
          <div className="flex">
            <div className="py-1">
              <svg className="fill-current h-6 w-6 text-blue-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M2 10A8 8 0 1 0 10 2 8 8 0 0 0 2 10zm9.293-5.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 6.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4z"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold">Loading...</p>
            </div>
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md mb-4" role="alert">
          <div className="flex">
            <div className="py-1">
              <svg className="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M10 2C5.82 2 2 5.82 2 10s3.82 8 8 8 8-3.82 8-8-3.82-8-8-8zm1 12h-2v-2h2v2zm0-4h-2V6h2v4z"
                />
              </svg>
            </div>
            <div>
              <p className="font-bold">Error: {error}</p>
            </div>
          </div>
        </div>
      )}
      { orders && orders.map((order:any) => (
        <div key={order.id} className="bg-white border border-gray-300 rounded p-4 mb-4 shadow-md">
          <div className="mb-2">
            <strong className="text-lg font-semibold text-gray-800">Cliente:</strong> {order.client}
          </div>
          <div className="mb-2">
            <strong className="text-lg font-semibold text-gray-800">Endereço de Entrega:</strong> {order.deliveryAddress}
          </div>
          <div className="mb-2">
            <strong className="text-lg font-semibold text-gray-800">Status:</strong> {order.status}
          </div>
          <div className="mt-4 flex justify-between space-x-2">
            <OrderStatusUpdater
              currentStatus={order.status}
              onUpdateStatus={(newStatus) => handleUpdateStatus(order.id, newStatus)}
              availableStatusOptions={['PENDENTE', 'EM_PROCESSAMENTO', 'ENVIADO', 'ENTREGUE', 'CANCELADO']}
            />
            <DeleteButton onClick={() => handleDeleteClick(order.id)} />
          </div>
        </div>
      ))}
      <ConfirmationPopup
        isOpen={selectedOrderId !== null}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default OrderList;
