import {screen, render} from '@testing-library/react';
import Reservation from '../../pages/Reservation';

test("Renders the Reservation page heading", () => {
    render(<Reservation />);
    const heading_element = screen.getByText("Reserve a table");
    expect(heading_element).toBeInTheDocument();
});