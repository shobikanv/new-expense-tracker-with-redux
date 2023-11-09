import React from "react";
import ModalForm from "./ModalForm";
import { renderWithStore } from "../../../../__tests__/render-with-store";

describe("ModalForm Component", () => {
  it("should render the modal with the correct title", () => {
    const handleClose = jest.fn();
    const isEdit = true;
    const account = { name: "Test Account", group: "Test Group", balance: 100 };

    const { getByTestId, getByText } = renderWithStore(
      <ModalForm isEdit={isEdit} account={account} handleClose={handleClose} />
    );

    expect(getByTestId("modal-form")).toBeInTheDocument();

    expect(getByText("Edit Account")).toBeInTheDocument();
  });

  it("should render and interact with AccountForm", () => {
    const handleClose = jest.fn();
    const isEdit = true;
    const account = { name: "Test Account", group: "Test Group", balance: 100 };

    const { getByTestId, getByText } = renderWithStore(
      <ModalForm isEdit={isEdit} account={account} handleClose={handleClose} />
    );


    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Group")).toBeInTheDocument();
    expect(getByText("Balance")).toBeInTheDocument();
  });
});
