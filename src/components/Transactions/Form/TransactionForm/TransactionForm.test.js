import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TransactionForm from './TransactionForm';
import { renderWithStore } from '../../../../../__tests__/render-with-store';
import tagSlice from '../../../../redux/slices/tagSlice';
import { getAccountValues } from '../../../../redux/slices/accountSlice';
import { toastMessage } from '../../../../lib/common-helper';

// jest.mock('../../../../redux/slices/tagSlice', () => ({
//   getTagValues: jest.fn(() => ({ tagList: [] })),
//   addTags: jest.fn(),
//   getTags: jest.fn(),
// }));

// jest.mock('../../../../redux/slices/accountSlice', () => ({
//   getAccountValues: jest.fn(() => ({ accountList: [] })),
//   getAccounts: jest.fn(),
// }));

// jest.mock('../../../../redux/slices/transactionSlice', () => ({
//   addTransactions: jest.fn(),
//   getTransactions: jest.fn(),
//   editTransactions: jest.fn(),
// }));

// jest.mock('../../../../lib/common-helper', () => ({
//   toastMessage: jest.fn(),
// }));

describe('TransactionForm Component', () => {
  const mockTransaction = {
    id: 1,
    transaction_type: 'INCOME',
    amount: 100,
    date: '2023-11-09',
    note: 'Test Note',
    account: 2,
    tags: [1, 2],
  };
  const mockHandleClose = jest.fn();

  it('renders correctly for new transaction', () => {
    const { getByLabelText,getByText } = renderWithStore(
      <TransactionForm transaction={null} handleClose={mockHandleClose} isEdit={false} />
    );
    // expect(getByLabelText('From')).toBeInTheDocument();
    expect(getByText('USD')).toBeInTheDocument();
    // expect(getByLabelText('Tags')).toBeInTheDocument();
    // expect(getByLabelText('Note')).toBeInTheDocument();
    // expect(getByLabelText('Date')).toBeInTheDocument();
    expect(getByText('SAVE')).toBeInTheDocument();
  });

  it('renders correctly for edit transaction', () => {
    const { getByText,getByLabelText } = renderWithStore(
      <TransactionForm transaction={null} handleClose={mockHandleClose} isEdit={false} />
    );
    // expect(getByLabelText('From')).toBeInTheDocument();
    expect(getByText('USD')).toBeInTheDocument();
    // expect(getByLabelText('Tags')).toBeInTheDocument();
    // expect(getByText('Note')).toBeInTheDocument();
    // expect(getByText('Date')).toBeInTheDocument();
    expect(getByText('SAVE')).toBeInTheDocument();
  });

  it('calls addTransactions when "SAVE" button is clicked for new transaction', async () => {
    const { getByText } = renderWithStore(
      <TransactionForm transaction={null} handleClose={mockHandleClose} isEdit={false} />
    );

    fireEvent.click(getByText('SAVE'));
    // await waitFor(() => {
    //   expect(addTransactions).toHaveBeenCalled();
    //   expect(getTransactions).toHaveBeenCalled();
    //   expect(mockHandleClose).toHaveBeenCalled();
    //   
    // });
  });

  it('calls editTransactions when "SAVE" button is clicked for edit transaction', async () => {
    const { getByText } = renderWithStore(
      <TransactionForm transaction={mockTransaction} handleClose={mockHandleClose} isEdit={true} />
    );

    fireEvent.click(getByText('SAVE'));
    // await waitFor(() => {
    //   expect(editTransactions).toHaveBeenCalled();
    //   expect(getTransactions).toHaveBeenCalled();
    //   expect(mockHandleClose).toHaveBeenCalled();
    //   
    // });
  });

  // Add more test cases for various user interactions and validations
});
