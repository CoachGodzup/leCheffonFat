import { render, screen } from "@testing-library/react";
import SearchResults from "@/app/components/SearchResults";
import type { Meal } from "@/types/meal-db";

const mockMeal: Meal = {
  idMeal: "52802",
  strMeal: "Fish pie",
  strMealAlternate: null,
  strCategory: "Seafood",
  strArea: "British",
  strInstructions: "Bake it.",
  strMealThumb: "https://example.com/img.jpg",
  strTags: null,
  strYoutube: "",
  strSource: "",
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

describe("SearchResults", () => {
  it("renders a list of meals", () => {
    render(<SearchResults meals={[mockMeal]} />);

    expect(screen.getByText("Fish pie")).toBeInTheDocument();
    expect(screen.getByText("Seafood — British")).toBeInTheDocument();
  });

  it("renders links to recommendation page", () => {
    render(<SearchResults meals={[mockMeal]} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/recommendation/52802");
  });

  it("renders images with alt text", () => {
    render(<SearchResults meals={[mockMeal]} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Fish pie");
  });

  it("renders multiple meals", () => {
    const meal2: Meal = {
      ...mockMeal,
      idMeal: "52803",
      strMeal: "Pasta",
      strCategory: "Italian",
      strArea: "Italian",
    };

    render(<SearchResults meals={[mockMeal, meal2]} />);

    expect(screen.getByText("Fish pie")).toBeInTheDocument();
    expect(screen.getByText("Pasta")).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
