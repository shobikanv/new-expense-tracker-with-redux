import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react"; // for the "toBeInTheDocument" matcher
import ModalForm from "./ModalForm";
import { renderWithStore } from "../../../../../__tests__/render-with-store";
import {
  deleteTransactions,
  getTransactions,
} from "../../../../redux/slices/transactionSlice";
import { toastMessage } from "../../../../lib/common-helper";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("../../../../redux/slices/transactionSlice", () => ({
  deleteTransactions: jest.fn(),
  getTransactions: jest.fn(),
}));

jest.mock("../../../../lib/common-helper", () => ({
  toastMessage: jest.fn(),
}));

describe("ModalForm Component", () => {
  const mockTransaction = { id: 1 };
  const mockHandleClose = jest.fn();

  it("renders correctly for new transaction", () => {
    const { getByText } = renderWithStore(
      <ModalForm
        transaction={mockTransaction}
        handleClose={mockHandleClose}
        isEdit={false}
      />
    );
    expect(getByText("New Transaction")).toBeInTheDocument();
  });

  it("renders correctly for edit transaction", () => {
    const { getByText } = renderWithStore(
      <ModalForm
        transaction={mockTransaction}
        handleClose={mockHandleClose}
        isEdit={true}
      />
    );
    expect(getByText("Edit Transaction")).toBeInTheDocument();
  });

  it('calls deleteTransactions and getTransactions when "Delete" button is clicked', async () => {
    const { getByText } = renderWithStore(
      <ModalForm
        transaction={mockTransaction}
        handleClose={mockHandleClose}
        isEdit={true}
      />
    );

    fireEvent.click(getByText("Delete"));
    await waitFor(() => {
      expect(deleteTransactions).toHaveBeenCalledWith({
        id: mockTransaction.id,
      });
      expect(mockHandleClose).toHaveBeenCalled();
      expect(toastMessage).toHaveBeenCalledWith(
        "Transaction Deleted Successfully",
        "success"
      );
      expect(getTransactions).toHaveBeenCalled();
    });
  });
});
