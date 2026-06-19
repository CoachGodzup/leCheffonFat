import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders the heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /to get started/i }),
    ).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: /templates/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /learning/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /deploy now/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /documentation/i }),
    ).toBeInTheDocument();
  });
});
