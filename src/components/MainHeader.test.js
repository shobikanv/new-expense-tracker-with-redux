import { renderWithStore } from "../../__tests__/render-with-store";
import MainHeader from "../components/MainHeader";
import { fireEvent ,waitFor} from '@testing-library/react';

describe("Header component", () => {
  it("renders header", () => {
    const { getByText } = renderWithStore(<MainHeader />);
    const labelElement = getByText("Dashboard");
    expect(labelElement).toBeInTheDocument();
  });


  it('triggers a page refresh when the refresh icon is clicked', () => {
    // Mock the global location object with a custom function
    const originalLocation = window.location;
    delete window.location;
    window.location = { reload: jest.fn() };

    const { getByTestId } = renderWithStore(<MainHeader />);
    const refreshIcon = getByTestId('refresh-icon');

    fireEvent.click(refreshIcon);

    // Assert that the reload function was called
    expect(window.location.reload).toHaveBeenCalled();

    // Restore the original location object
    window.location = originalLocation;
  });
});
