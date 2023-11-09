import React from "react";
import { renderWithStore } from "../../../../../__tests__/render-with-store";
import { render, screen, fireEvent } from "@testing-library/react";
import GroupAccounts from "./GroupAccounts";

describe("GroupAccounts Component", () => {
  const group = {
    name: "Savings Group",
    total: 2000,
    accounts: [
      { id: 1, name: "Account 1", balance: 1000 },
      { id: 2, name: "Account 2", balance: 1000 },
    ],
  };

  it("renders the group name and total", () => {
    const { getByText } = renderWithStore(<GroupAccounts group={group} />);

    const groupName = getByText("Savings Group");
    const groupTotal = getByText("2000 USD");

    expect(groupName).toBeInTheDocument();
    expect(groupTotal).toBeInTheDocument();
  });

  it("expands/collapses the section when the header is clicked", async () => {
    const { getByText, queryAllByTestId, findByTestId } = renderWithStore(
      <GroupAccounts group={group} />
    );

    const header = getByText("Savings Group");

    const initialAccounts = queryAllByTestId("account-item");
    console.log("Initial Accounts:", initialAccounts);

    fireEvent.click(header);

   
    const expandedAccounts = queryAllByTestId("account-item");
    console.log("Expanded Accounts:", expandedAccounts);
    expect(expandedAccounts).toHaveLength(0);

    fireEvent.click(header);

    

    const collapsedAccounts = queryAllByTestId("account-item");
    console.log("Collapsed Accounts:", collapsedAccounts);
    expect(collapsedAccounts).toHaveLength(0);
  });
});
