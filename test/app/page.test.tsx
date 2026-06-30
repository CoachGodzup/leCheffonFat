import { render, screen } from "@testing-library/react";

import Home from "@/app/page";

describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("renders the heading", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /welcome to lecheffonfat/i }),
    ).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<Home />);
    expect(
      screen.getByText(
        /your personal helper when you don't know what to cook/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders the splash image", () => {
    render(<Home />);
    const img = document.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", "");
    expect(img!.getAttribute("src")).toMatch(/splash\.png/);
  });

  it("renders the Inspire me link to /page1", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /inspire me/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/page1");
  });

  it("renders the Search link to /search", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /search/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/search");
  });

  it("renders the Last recipes link to /history", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: /last recipes/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/history");
  });

  it("renders the splash image between heading and CTAs", () => {
    render(<Home />);
    const container = document.querySelector(".card");
    expect(container).toBeInTheDocument();

    const children = [...container!.children];
    const sectionIndex = children.findIndex(
      (child) => child.tagName === "SECTION",
    );
    const imgIndex = children.findIndex((child) => child.tagName === "IMG");
    const navIndex = children.findIndex((child) => child.tagName === "NAV");

    expect(sectionIndex).toBeGreaterThanOrEqual(0);
    expect(imgIndex).toBe(sectionIndex + 1);
    expect(navIndex).toBe(imgIndex + 1);
  });
});
