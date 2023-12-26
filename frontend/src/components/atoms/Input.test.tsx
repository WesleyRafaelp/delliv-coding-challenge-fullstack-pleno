import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  it('renders input with specified type and placeholder', () => {
    render(<Input type="text" placeholder="Enter text" register={{}} />);
    const inputElement = screen.getByPlaceholderText(/Enter text/i);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });

  it('calls onChange handler when input value changes', () => {
    const onChangeMock = jest.fn();
    render(<Input type="text" onChange={onChangeMock} register={() => {}} />);
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'new value' } });

    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({ target: expect.objectContaining({ value: 'new value' }) })
    );
  });
  
  it('matches snapshot', () => {
    const tree = render(<Input type="text" register={{}} />);
    expect(tree).toMatchSnapshot();
  });
});
