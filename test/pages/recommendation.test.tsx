import { render, screen } from "@testing-library/react";
import Recommendation from "@/app/recommendation/page";

describe("Recommendation", () => {
  it("renders without crashing", () => {
    render(<Recommendation />);
  });

  it("renders the heading", () => {
    render(<Recommendation />);
    expect(
      screen.getByRole("heading", { name: /recommendation/i }),
    ).toBeInTheDocument();
  });

  it("renders a back link to page2", () => {
    render(<Recommendation />);
    const link = screen.getByRole("link", { name: /back/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/page2");
  });

  it("renders a link to go home", () => {
    render(<Recommendation />);
    const link = screen.getByRole("link", { name: /go to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
