import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store  from '@/store/index';
import OrderForm from './OrderForm';
import { newOrder } from '@/store/reducers/orders';
import { useAppDispatch } from '@/hooks/hooks';
import { useAppSelector } from '@/hooks/hooks';

jest.mock('../../store/reducers/orders', () => ({
  __esModule: true,
  newOrder: jest.fn(),
}));

jest.mock('../../hooks/hooks', () => ({
  ...jest.requireActual('../../hooks/hooks'),
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('OrderForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders OrderForm component', () => {
    const mockDispatch = jest.fn();
    useAppDispatch.mockReturnValue(mockDispatch);
    useAppSelector.mockReturnValue(mockDispatch);
    render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
    expect(screen.getByLabelText(/cliente/i)).toBeInTheDocument();
  });

  it('submits the form and dispatches newOrder action', async () => {
    const mockDispatch = jest.fn();
    useAppDispatch.mockReturnValue(mockDispatch);
    useAppSelector.mockReturnValue(mockDispatch);

    render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/cliente/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/rua/i), { target: { value: 'Main Street' } });
    fireEvent.change(screen.getByLabelText(/número/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/bairro/i), { target: { value: 'Downtown' } });

    fireEvent.click(screen.getByText(/criar pedido/i));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(newOrder).toHaveBeenCalledWith({
        client: 'John Doe',
        deliveryAddress: 'Main Street, 123 - Downtown',
      });
    });
  });

  it('displays error messages for empty fields', async () => {
    render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );

    fireEvent.click(screen.getByText(/criar pedido/i));

    await waitFor(() => {
      expect(screen.getByText(/nome do cliente é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/nome da rua é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/número residencial é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/bairro é obrigatório/i)).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('displays success message after form submission', async () => {
    render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/cliente/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/rua/i), { target: { value: 'Main Street' } });
    fireEvent.change(screen.getByLabelText(/número/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/bairro/i), { target: { value: 'Downtown' } });

    fireEvent.click(screen.getByText(/criar pedido/i));

    await waitFor(() => {
      expect(screen.getByText(/pedido criado com sucesso/i)).toBeInTheDocument();
    });
  });
  it('displays error message if newOrder action fails', async () => {
    const mockDispatch = jest.fn(() => {
      throw new Error('Some error');
    });
    useAppSelector.mockReturnValue(mockDispatch);
    useAppDispatch.mockReturnValue(mockDispatch);

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    render(
      <Provider store={store}>
        <OrderForm />
      </Provider>
    );
  
    fireEvent.change(screen.getByLabelText(/cliente/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/rua/i), { target: { value: 'Main Street' } });
    fireEvent.change(screen.getByLabelText(/número/i), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText(/bairro/i), { target: { value: 'Downtown' } });
  
    fireEvent.click(screen.getByText(/criar pedido/i));
  
    await waitFor(() => {
     expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(consoleErrorSpy.mock.calls[0][0].message).toContain('Some error');
    });
  
    
    consoleErrorSpy.mockRestore();
  });

});
