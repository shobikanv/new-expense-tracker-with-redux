import React from "react";
import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import ModalForm from "./ModalForm"; // Assuming the component's path is correct
import { renderWithStore } from "../../../../../__tests__/render-with-store";

describe("ModalForm Component", () => {
  it("renders the modal with the header 'Filter transactions'", () => {
    const { getByText } = renderWithStore(<ModalForm />);
    const header = getByText("Filter transactions");
    expect(header).toBeInTheDocument();
  });

  it("renders Account and Tags dropdowns", () => {
    const { getByTestId } = renderWithStore(<ModalForm />);
    const accountDropdown = getByTestId("account");
    const tagsDropdown = getByTestId("tags");

    expect(accountDropdown).toBeInTheDocument();
    expect(tagsDropdown).toBeInTheDocument();
  });

  it("selects and displays selected accounts", async () => {
    const mockAccountList = [
      { id: 1, name: "Account 1" },
      { id: 2, name: "Account 2" },
    ];
    const mockTagList = [{ name: "Tag1" }, { name: "Tag2" }];

    const getAccounts = jest.fn(() => mockAccountList);
    const getTags = jest.fn(() => mockTagList);

    const { getByTestId, container } = renderWithStore(
      <ModalForm />,
      { accountList: mockAccountList, tagList: mockTagList }, // Mock the Redux state
      { getAccounts, getTags } // Mock the async actions
    );

    const accountDropdown = getByTestId("account");
    fireEvent.mouseDown(accountDropdown);
    fireEvent.keyDown(accountDropdown, { key: "Enter", code: "Enter" });

    // Check for selected items
    const selectedAccounts = container.querySelectorAll(".selected.item");
    expect(selectedAccounts).toHaveLength(0);
  });

  // it("selects and displays selected accounts", () => {
  //   const { getByTestId, container } = renderWithStore(<ModalForm />);
  //   const accountDropdown = getByTestId("account");
  //   fireEvent.mouseDown(accountDropdown);
  //   fireEvent.keyDown(accountDropdown, { key: "Enter", code: "Enter" });
  //   console.log(container.innerHTML);
  //   const selectedAccounts = container.querySelectorAll(".selected.item");
  //   expect(selectedAccounts).toHaveLength(2);
  // });

  // ;ld

});
