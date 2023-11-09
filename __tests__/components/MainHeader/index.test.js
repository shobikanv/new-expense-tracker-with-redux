import { renderWithStore } from "tests/render-with-store";
import MainHeader from "../../../src/components/MainHeader";

describe("Header component", () => {
  it("renders header", () => {
    const { getByText } = renderWithStore(<MainHeader />);
    const labelElement = getByText("Dashboard");
    expect(labelElement).toBeInTheDocument();
  });

  it("triggers a page refresh when the refresh icon is clicked", () => {
    const { getByTestId } = renderWithStore(<MainHeader />);
    const refreshIcon = getByTestId("refresh-icon"); 
    const originalReload = window.location.reload;
    window.location.reload = jest.fn();
    fireEvent.click(refreshIcon);
    expect(window.location.reload).toHaveBeenCalled();
    window.location.reload = originalReload;
  });
});
