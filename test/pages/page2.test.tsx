import { render, screen } from "@testing-library/react";
import Page2 from "@/app/page2/page";

describe("Page2", () => {
  it("renders without crashing", () => {
    render(<Page2 />);
  });

  it("renders the heading", () => {
    render(<Page2 />);
    expect(
      screen.getByRole("heading", { name: /page 2/i }),
    ).toBeInTheDocument();
  });

  it("renders a back link to page1", () => {
    render(<Page2 />);
    const link = screen.getByRole("link", { name: /back/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/page1");
  });

  it("renders a complete link to recommendation", () => {
    render(<Page2 />);
    const link = screen.getByRole("link", { name: /complete/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/recommendation");
  });
});
