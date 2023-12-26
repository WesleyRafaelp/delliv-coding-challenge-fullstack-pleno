import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderStatusUpdater from './OrderStatusUpdater';

describe('OrderStatusUpdater Component', () => {
  it('renders OrderStatusUpdater component', () => {
    const onUpdateStatusMock = jest.fn();
    const availableStatusOptions = ['Pending', 'Shipped', 'Delivered'];
    render(
      <OrderStatusUpdater
        currentStatus="Pending"
        onUpdateStatus={onUpdateStatusMock}
        availableStatusOptions={availableStatusOptions}
      />
    );
    
    expect(screen.getByText(/editar status/i)).toBeInTheDocument();
  });

  it('handles status update when "Atualizar Status" button is clicked', () => {
    const onUpdateStatusMock = jest.fn();
    const availableStatusOptions = ['Pending', 'Shipped', 'Delivered'];
    render(
      <OrderStatusUpdater
        currentStatus="Pending"
        onUpdateStatus={onUpdateStatusMock}
        availableStatusOptions={availableStatusOptions}
      />
    );

    fireEvent.click(screen.getByText(/editar status/i));
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Shipped' } });
    fireEvent.click(screen.getByText(/atualizar status/i));

    expect(onUpdateStatusMock).toHaveBeenCalledWith('Shipped');
  });

  it('matches snapshot', () => {
    const onUpdateStatusMock = jest.fn();
    const availableStatusOptions = ['Pending', 'Shipped', 'Delivered'];
    const { asFragment } = render(
      <OrderStatusUpdater
        currentStatus="Pending"
        onUpdateStatus={onUpdateStatusMock}
        availableStatusOptions={availableStatusOptions}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
