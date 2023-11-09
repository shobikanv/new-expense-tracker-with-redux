import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithStore } from "../../../../__tests__/render-with-store";
import AccountForm from "./AccountForm";
import { INITIAL_STATE } from "../../../initial-state";

describe("AccountForm", () => {
  it("renders the form fields with initial values", () => {
    const { getByLabelText, getByText, getByRole } = renderWithStore(
      <AccountForm account={null} handleClose={() => {}} />,
      INITIAL_STATE
    );

    expect(getByLabelText("Name")).toBeInTheDocument();
    // expect(getByLabelText("Group")).toBeInTheDocument();
    expect(getByLabelText("Balance")).toBeInTheDocument();
  });

  it("should allow input and validation", () => {
    const { getByLabelText, queryByText, getByText, getByRole } =
      renderWithStore(
        <AccountForm account={null} handleClose={() => {}} />,
        INITIAL_STATE
      );

    const nameInput = getByLabelText("Name");
    //     const groupInput = screen.getByLabelText('Group');
    const balanceInput = getByLabelText("Balance");

    fireEvent.change(nameInput, { target: { value: "TestAccount" } });
    // fireEvent.change(groupInput, { target: { value: "TestGroup" } });
    fireEvent.change(balanceInput, { target: { value: "100" } });

    // Validate the input values
    expect(nameInput.value).toBe("TestAccount");
    // expect(groupInput.value).toBe("TestGroup");
    expect(balanceInput.value).toBe("100");

    // Validate error messages (if any)
    expect(queryByText("error")).toBeNull();
  });

  it("should submit the form", () => {
    const mockHandleSubmit = jest.fn();
    const { getByText, getByLabelText } = renderWithStore(
      <AccountForm account={null} handleClose={() => {}} />,
      INITIAL_STATE
    );
    const saveButton = getByText("Save Account");

    fireEvent.click(saveButton);

    // expect(mockHandleSubmit).toHaveBeenCalled();
  });
});

