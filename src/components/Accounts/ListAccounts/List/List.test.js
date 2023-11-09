import React from "react";
import { renderWithStore } from "../../../../../__tests__/render-with-store";
import ListAccounts from "../GroupAccounts/GroupAccounts";
import { INITIAL_STATE } from "../../../../initial-state";

describe("ListAccounts Component", () => {
  it("renders without errors", () => {
    const { getByText } = renderWithStore(<ListAccounts />, INITIAL_STATE);
    expect(getByText("USD")).toBeInTheDocument();
  });
  
});
