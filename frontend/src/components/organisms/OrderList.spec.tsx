import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderList from './OrderList';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getOrders, removeOrder, updateOrder } from '@/store/reducers/orders';

jest.mock('@/hooks/hooks');
jest.mock('@/store/reducers/orders');

describe('OrderList Component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('renders OrderList component', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      orders: [
        { id: 1, client: 'John Doe', deliveryAddress: '123 Main St', status: 'PENDENTE' },
        { id: 2, client: 'Jane Doe', deliveryAddress: '456 Oak St', status: 'ENVIADO' },
      ],
      loading: false,
      error: null,
    });

    render(<OrderList />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('displays loading message', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      orders: [],
      loading: true,
      error: null,
    });

    render(<OrderList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message', () => {
    const errorMessage = 'Some error message';
    (useAppSelector as jest.Mock).mockReturnValue({
      orders: [],
      loading: false,
      error: errorMessage,
    });

    render(<OrderList />);

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('handles order status update', async () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      orders: [{ id: 1, client: 'John Doe', deliveryAddress: '123 Main St', status: 'PENDENTE' }],
      loading: false,
      error: null,
    });

    render(<OrderList />);

    fireEvent.click(screen.getByText('Editar Status'));
    fireEvent.click(screen.getByText('Atualizar Status'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(updateOrder({ id: 1, status: 'EM_PROCESSAMENTO' }));
    });
  });

  it('handles order deletion', async () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      orders: [{ id: 1, client: 'John Doe', deliveryAddress: '123 Main St', status: 'PENDENTE' }],
      loading: false,
      error: null,
    });

    render(<OrderList />);

    fireEvent.click(screen.getByText('Excluir'));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(removeOrder(1));
    });
  });
});

describe('OrderList Component Snapshot', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('matches snapshot', () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      orders: [
        { id: 1, client: 'John Doe', deliveryAddress: '123 Main St', status: 'PENDENTE' },
        { id: 2, client: 'Jane Doe', deliveryAddress: '456 Oak St', status: 'ENVIADO' },
      ],
      loading: false,
      error: null,
    });

    const { asFragment } = render(<OrderList />);
    expect(asFragment()).toMatchSnapshot();
  });
});