import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("renders a link to the form", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /inspire me/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/page1");
  });
});
