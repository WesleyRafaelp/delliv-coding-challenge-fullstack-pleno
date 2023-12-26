import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationPopup from './ConfirmationPopup';

describe('ConfirmationPopup Component', () => {
  it('renders ConfirmationPopup when isOpen is true', () => {
    render(
      <ConfirmationPopup isOpen={true} onCancel={jest.fn()} onConfirm={jest.fn()} />
    );

    const popupElement = screen.getByText(/Você tem certeza que deseja excluir este pedido?/i);
    expect(popupElement).toBeInTheDocument();
  });

  it('does not render ConfirmationPopup when isOpen is false', () => {
    render(
      <ConfirmationPopup isOpen={false} onCancel={jest.fn()} onConfirm={jest.fn()} />
    );

    const popupElement = screen.queryByText(/Você tem certeza que deseja excluir este pedido?/i);
    expect(popupElement).not.toBeInTheDocument();
  });

  it('calls onCancel when Cancelar button is clicked', () => {
    const onCancelMock = jest.fn();
    render(<ConfirmationPopup isOpen={true} onCancel={onCancelMock} onConfirm={jest.fn()} />);

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(onCancelMock).toHaveBeenCalled();
  });

  it('calls onConfirm when Confirmar button is clicked', () => {
    const onConfirmMock = jest.fn();
    render(<ConfirmationPopup isOpen={true} onCancel={jest.fn()} onConfirm={onConfirmMock} />);

    const confirmButton = screen.getByText('Confirmar');
    fireEvent.click(confirmButton);

    expect(onConfirmMock).toHaveBeenCalled();
  });

  it('matches snapshot when isOpen is true', () => {
    const { asFragment } = render(
      <ConfirmationPopup isOpen={true} onCancel={jest.fn()} onConfirm={jest.fn()} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot when isOpen is false', () => {
    const { asFragment } = render(
      <ConfirmationPopup isOpen={false} onCancel={jest.fn()} onConfirm={jest.fn()} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

});
