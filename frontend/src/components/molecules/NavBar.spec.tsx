import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { authService } from '@/services/auth/auth-service';
import { useRouter } from 'next/router';
import Navbar from './NavBar';

jest.mock('../../services/auth/auth-service', () => ({
  authService: {
    logout: jest.fn(),
  },
}));

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(() => ({ pathname: '/' })), 
}));

describe('Navbar Component', () => {

  it('calls authService.logout and redirects to home on button click', async () => {
    const mockPush = jest.fn().mockResolvedValue({});
    useRouter.mockReturnValue({
      push: mockPush,
    });
    render(<Navbar />);
    
    const logoutButton = screen.getByRole('button', { name: /sair/i });

    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(authService.logout).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
