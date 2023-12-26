import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';
import { authService } from '../../services/auth/auth-service';
import { useRouter } from 'next/router';

jest.mock('../../services/auth/auth-service', () => ({
  authService: {
    login: jest.fn(),
  },
}));

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('LoginForm Component', () => {
  it('submits the form with valid data and redirects on successful login', async () => {
    const mockPush = jest.fn().mockResolvedValue({});
    useRouter.mockReturnValue({
      push: mockPush,
    });

    authService.login.mockResolvedValue({
      email: 'test@example.com',
      token: 'mockedToken',
    });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockPush).toHaveBeenCalledWith('/home');
    });
  });


  it('displays error messages for required fields', async () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/o email é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/a senha é obrigatória/i)).toBeInTheDocument();
    });
  });

  it('displays error message for invalid login credentials', async () => {
    authService.login.mockRejectedValueOnce({ message: 'Invalid credentials' });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i);
    const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'invalidPassword',
      });
      expect(screen.getByText(/email ou senha inválida/i)).toBeInTheDocument();
    });
  });

it('displays error message for API error during login', async () => {
  authService.login.mockRejectedValueOnce({ message: 'API error' });

  render(<LoginForm />);

  const emailInput = screen.getByPlaceholderText(/Digite seu e-mail/i);
  const passwordInput = screen.getByPlaceholderText(/Digite sua senha/i);
  const submitButton = screen.getByRole('button', { name: /entrar/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'validPassword' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'validPassword',
    });
    expect(screen.getByText(/email ou senha inválida/i)).toBeInTheDocument();
  });
});

it('matches snapshot when login form is rendered', () => {
  const { asFragment } = render(<LoginForm />);
  expect(asFragment()).toMatchSnapshot();
});

});
