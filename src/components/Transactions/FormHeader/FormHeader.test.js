import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FormHeader from './FormHeader';
import { renderWithStore } from '../../../../__tests__/render-with-store';

describe('FormHeader Component', () => {
  it('should render the component with the correct menu items', () => {
    const setKind = jest.fn();
    const kind = 'EXPENSE';

    const{getByText}=renderWithStore(<FormHeader kind={kind} setKind={setKind} />);

    const expenseMenuItem = getByText('EXPENSE');
    const transferMenuItem = getByText('TRANSFER');
    const incomeMenuItem = getByText('INCOME');

    expect(expenseMenuItem).toBeInTheDocument();
    expect(transferMenuItem).toBeInTheDocument();
    expect(incomeMenuItem).toBeInTheDocument();
  });

  it('should change the selected kind', () => {
    const setKind = jest.fn();
    const kind = 'EXPENSE';

    const{getByText}=renderWithStore(<FormHeader kind={kind} setKind={setKind} />);

    const transferMenuItem = getByText('TRANSFER');
    fireEvent.click(transferMenuItem);

    expect(setKind).toHaveBeenCalledWith('TRANSFER');
  });

  it('should set the active state for the selected kind', () => {
    const setKind = jest.fn();
    const kind = 'EXPENSE';

    const{getByText}=renderWithStore(<FormHeader kind={kind} setKind={setKind} />);


    const expenseMenuItem = getByText('EXPENSE');
    const transferMenuItem = getByText('TRANSFER');
    const incomeMenuItem = getByText('INCOME');

    expect(expenseMenuItem).toHaveClass('active');
    expect(transferMenuItem).not.toHaveClass('active');
    expect(incomeMenuItem).not.toHaveClass('active');
  });
});
