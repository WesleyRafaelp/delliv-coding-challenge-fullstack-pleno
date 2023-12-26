import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeleteButton from './DeleteButton';

describe('DeleteButton Component', () => {
  it('renders button with text "Excluir"', () => {
    render(<DeleteButton onClick={() => {}} />);
    const buttonElement = screen.getByText(/Excluir/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick handler when button is clicked', () => {
    const onClickMock = jest.fn();
    render(<DeleteButton onClick={onClickMock} />);
    const buttonElement = screen.getByText(/Excluir/i);
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const tree = render(<DeleteButton onClick={() => {}} />);
    expect(tree).toMatchSnapshot();
  });
});
