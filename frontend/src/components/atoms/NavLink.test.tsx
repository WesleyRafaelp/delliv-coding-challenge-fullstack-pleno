import React from 'react';
import { render, screen } from '@testing-library/react';
import NavLink from './NavLink';
import 'tailwindcss'

jest.mock('next/link', () => ({ children }: any) => children);

jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
    push: jest.fn(),
  }),
}));

describe('NavLink Component', () => {
  it('renders NavLink with specified href and children', () => {
    render(<NavLink href="/sample-path">Sample NavLink</NavLink>);

    const linkElement = screen.getByRole('link', { name: /Sample NavLink/i });

    expect(linkElement).toHaveAttribute('href', '/sample-path');
    expect(linkElement).toHaveClass('border-b-2', 'border-transparent');
  });
  

  it('adds active styles when the link is active', () => {
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
      pathname: '/active-path',
      push: jest.fn(),
    });
  
    render(<NavLink href="/active-path">Active NavLink</NavLink>);
  
    const navLinkElement = screen.getByText(/Active NavLink/i);
    
    
    expect(navLinkElement).toHaveClass('border-b-2');
    
   expect(navLinkElement).toHaveClass('border-blue-500');
    
    expect(navLinkElement).not.toHaveClass('border-transparent');
  });
  

  it('does not add active styles when the link is not active', () => {
    jest.spyOn(require('next/router'), 'useRouter').mockReturnValue({
      pathname: '/inactive-path',
      push: jest.fn(),
    });

    render(<NavLink href="/active-path">Inactive NavLink</NavLink>);

    const navLinkElement = screen.getByText(/Inactive NavLink/i);
expect(navLinkElement).not.toHaveClass('border-blue-500'); 
expect(navLinkElement).toHaveClass('border-transparent');

  });

  it('matches snapshot', () => {
    render(<NavLink href="/sample-path">Sample NavLink</NavLink>);
    const tree = screen.getByText(/Sample NavLink/i);
    expect(tree).toMatchSnapshot();
  });
});
