import { render, screen } from "@testing-library/react";

import RecipeCard from "@/components/molecules/RecipeCard/RecipeCard";

const defaultProps = {
  id: "12345",
  title: "Test Meal",
  imageUrl: "https://example.com/img.jpg",
  category: "Dessert",
  area: "Italian",
};

describe("RecipeCard", () => {
  it("renders the card with title and category — area", () => {
    render(<RecipeCard {...defaultProps} />);

    expect(
      screen.getByRole("heading", { name: "Test Meal" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Dessert — Italian")).toBeInTheDocument();
  });

  it("renders a link to the recommendation page", () => {
    render(<RecipeCard {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/recommendation/12345");
  });

  it("renders the recipe image with alt text", () => {
    render(<RecipeCard {...defaultProps} />);

    expect(screen.getByRole("img", { name: "Test Meal" })).toBeInTheDocument();
  });

  it("renders tags when provided", () => {
    render(<RecipeCard {...defaultProps} tags="vegan,gluten free" />);

    expect(screen.getByText("vegan,gluten free")).toBeInTheDocument();
  });

  it("does not render tags when not provided", () => {
    render(<RecipeCard {...defaultProps} />);

    expect(screen.queryByText("vegan")).not.toBeInTheDocument();
  });
});
