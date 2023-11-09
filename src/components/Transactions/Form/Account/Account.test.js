import React from 'react';
import { fireEvent } from '@testing-library/react';
import Accounts from './Account';
import { renderWithStore } from '../../../../../__tests__/render-with-store';

describe('Accounts Component', () => {
  it('should render the component with the correct label', () => {
    const formik = {
      values: { account: '' },
      setFieldValue: jest.fn(),
    };
    const accountList = [{ id: 1, name: 'Account 1', group: 'Group 1' }];

    const{getByText}=renderWithStore(<Accounts kind="Income" formik={formik} accountList={accountList} />);

    expect(getByText('To')).toBeInTheDocument();
  });

  it('should change the selected account', () => {
    const formik = {
      values: { account: '' },
      setFieldValue: jest.fn(),
    };
    const accountList = [
      { id: 1, name: 'Account 1', group: 'Group 1' },
      { id: 2, name: 'Account 2', group: 'Group 2' },
    ];

    const{getByRole,getByText}=renderWithStore(<Accounts kind="Income" formik={formik} accountList={accountList} />);

    const dropdown = getByRole('listbox');
    fireEvent.mouseDown(dropdown);
    const optionToSelect = getByText('Account 1');
    fireEvent.click(optionToSelect);

    expect(formik.setFieldValue).toHaveBeenCalledWith('account', 1);
  });

  it('should render with the correct label for kind="To"', () => {
    const formik = {
      values: { account: '' },
      setFieldValue: jest.fn(),
    };
    const accountList = [{ id: 1, name: 'Account 1', group: 'Group 1' }];

    const{getByText}=renderWithStore(<Accounts kind="Income" formik={formik} accountList={accountList} />);

    expect(getByText('To')).toBeInTheDocument();
  });
});
