import React from "react";
import { fireEvent } from "@testing-library/react";
import AccountItem from "../Items/Items";
import { renderWithStore } from "../../../../../__tests__/render-with-store";
import { INITIAL_STATE } from "../../../../initial-state";

describe("AccountItem Component", () => {
  it("renders the correct account name and balance", () => {
    const { getByText } = renderWithStore(
      <AccountItem account={INITIAL_STATE.accountList[0]} />
    );

    const accountName = getByText(INITIAL_STATE.accountList[0].name);
    const accountBalance = getByText(
      `${INITIAL_STATE.accountList[0].balance} USD`
    );

    expect(accountName).toBeInTheDocument();
    expect(accountBalance).toBeInTheDocument();
  });

  it("renders an edit button when isEdit is true", () => {
    const { getByTestId } = renderWithStore(
      <AccountItem account={INITIAL_STATE.accountList[0]} isEdit={true} />
    );
    const editButton = getByTestId("edit-button");
    expect(editButton).toBeInTheDocument();
  });

  it("opens the modal when the edit button is clicked", () => {
    const { getByTestId } = renderWithStore(
      <AccountItem account={INITIAL_STATE.accountList[0]} isEdit={true} />
    );
    const editButton = getByTestId("edit-button");
    fireEvent.click(editButton);
    const modal = getByTestId("modal-form");
    expect(modal).toBeInTheDocument();
  });
});
