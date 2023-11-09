import React from "react";
import { fireEvent} from "@testing-library/react";
import Header from "./Form";
import { renderWithStore } from "../../../../../__tests__/render-with-store";

describe("Header Component", () => {
  const mockInitialValues = {
    from_date: "01/01/2023",
    to_date: "01/10/2023",
  };
  const mockSetInitialValues = jest.fn();
  const mockSetOpenModal = jest.fn();
  const mockSetFilterModal = jest.fn();

  it("renders New button", () => {
    const { getByText } = renderWithStore(
      <Header
        initialValues={mockInitialValues}
        setInitialValues={mockSetInitialValues}
      />
    );
    const newButton = getByText("New");
    expect(newButton).toBeInTheDocument();
  });

  it("opens the modal when New button is clicked", () => {
    const { getByText } = renderWithStore(
      <Header
        setOpenModal={mockSetOpenModal}
        initialValues={mockInitialValues}
        setInitialValues={mockSetInitialValues}
        openModal={true}
      />
    );

    const newButton = getByText("New");
    fireEvent.click(newButton);

    expect(mockSetOpenModal).toHaveBeenCalledWith(true);
  });

  it("opens the filter modal when Filter button is clicked", () => {
    const { getByTestId } = renderWithStore(
      <Header
        initialValues={mockInitialValues}
        setInitialValues={mockSetInitialValues}
        setFilterModal={mockSetFilterModal}
      />
    );
    const filterButton = getByTestId("filter");
    fireEvent.click(filterButton);
  });

  it("selects a date range from the dropdown", () => {
    const { getByText, getByRole } = renderWithStore(
      <Header
        initialValues={mockInitialValues}
        setInitialValues={mockSetInitialValues}
      />
    );
    const dropdown = getByRole("listbox");
    fireEvent.mouseDown(dropdown);
    const optionToSelect = getByText('Last 7 Days');
    fireEvent.click(optionToSelect);
  });
});
