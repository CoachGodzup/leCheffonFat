import { render, screen } from "@testing-library/react";
import Page1 from "@/app/page1/page";

describe("Page1", () => {
  it("renders without crashing", () => {
    render(<Page1 />);
  });

  it("renders the heading", () => {
    render(<Page1 />);
    expect(
      screen.getByRole("heading", { name: /page 1/i }),
    ).toBeInTheDocument();
  });

  it("renders a link to page2", () => {
    render(<Page1 />);
    const link = screen.getByRole("link", { name: /next/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/page2");
  });
});
