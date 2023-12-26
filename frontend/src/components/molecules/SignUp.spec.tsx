import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpForm from './SignUpForm';
import { userService } from '@/services/user/user-service';

describe('SignUpForm Component', () => {
  it('renders SignUpForm component', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/nome de usuário/i)).toBeInTheDocument();
  });

  it('submits the form and creates a new user', async () => {
    const mockCreate = jest.fn();
    userService.create = mockCreate;
    render(<SignUpForm />);

    fireEvent.change(screen.getByLabelText(/nome de usuário/i), { target: { value: 'JohnDoe123' } });
    fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'Password123' } });

    fireEvent.click(screen.getByText(/cadastrar/i));

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledWith({
        name: 'JohnDoe123',
        email: 'john.doe@example.com',
        password: 'Password123',
      });
    });
  });

  it('displays error messages for invalid input', async () => {
    render(<SignUpForm />);

    fireEvent.click(screen.getByText(/cadastrar/i));

    await waitFor(() => {
      expect(screen.getByText(/Nome é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/E-mail é obrigatório/i)).toBeInTheDocument();
      expect(screen.getByText(/Senha é obrigatório/i)).toBeInTheDocument();
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<SignUpForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
