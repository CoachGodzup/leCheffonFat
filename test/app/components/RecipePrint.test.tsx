import { render, screen } from "@testing-library/react";

import { RecipePrint } from "@/components/molecules/RecipePrint/RecipePrint";
import type { Meal } from "@/types/meal-db";

const mockMeal: Meal = {
  idMeal: "99999",
  strMeal: "Test Meal",
  strMealAlternate: null,
  strCategory: "Test",
  strArea: "Test",
  strInstructions: "Test instructions content",
  strMealThumb: "https://example.com/img.jpg",
  strTags: null,
  strYoutube: "",
  strSource: "",
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
  strIngredient1: "Flour",
  strMeasure1: "2 cups",
  strIngredient2: "Eggs",
  strMeasure2: "3",
  strIngredient3: "Sugar",
  strMeasure3: "100 g",
};

describe("RecipePrint", () => {
  it("renders ingredients list", () => {
    render(<RecipePrint meal={mockMeal} />);

    expect(screen.getByText("Flour - 2 cups")).toBeInTheDocument();
    expect(screen.getByText("Eggs - 3")).toBeInTheDocument();
    expect(screen.getByText("Sugar - 100 g")).toBeInTheDocument();
  });

  it("renders instructions heading", () => {
    render(<RecipePrint meal={mockMeal} />);

    expect(
      screen.getByRole("heading", { level: 2, name: /instructions/i }),
    ).toBeInTheDocument();
  });

  it("renders instructions text", () => {
    render(<RecipePrint meal={mockMeal} />);

    expect(screen.getByText("Test instructions content")).toBeInTheDocument();
  });

  it("renders nothing when meal has no ingredients", () => {
    const emptyMeal: Meal = {
      idMeal: "00000",
      strMeal: "Empty",
      strMealAlternate: null,
      strCategory: "Test",
      strArea: "Test",
      strInstructions: "Do nothing",
      strMealThumb: "https://example.com/img.jpg",
      strTags: null,
      strYoutube: "",
      strSource: "",
      strImageSource: null,
      strCreativeCommonsConfirmed: null,
      dateModified: null,
    };

    render(<RecipePrint meal={emptyMeal} />);

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  it("renders the recipe image with alt text", () => {
    render(<RecipePrint meal={mockMeal} />);

    const img = screen.getByRole("img", { name: /test meal/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", expect.stringContaining("example.com"));
  });

  it("renders the print footer with credit text", () => {
    render(<RecipePrint meal={mockMeal} />);

    expect(screen.getByText(/printed by le cheffon fat/i)).toBeInTheDocument();
    expect(screen.getByText(/themealdb\.com/i)).toBeInTheDocument();
  });

  it("renders inside an <article> element", () => {
    const { container } = render(<RecipePrint meal={mockMeal} />);

    expect(container.querySelector("article")).toBeInTheDocument();
  });

  it("renders all ingredients when many are provided", () => {
    const fullMeal: Meal = {
      ...mockMeal,
      strIngredient4: "Butter",
      strMeasure4: "50 g",
      strIngredient5: "Milk",
      strMeasure5: "1 cup",
      strIngredient6: "Salt",
      strMeasure6: "Pinch",
    };

    render(<RecipePrint meal={fullMeal} />);

    expect(screen.getByText("Butter - 50 g")).toBeInTheDocument();
    expect(screen.getByText("Milk - 1 cup")).toBeInTheDocument();
    expect(screen.getByText("Salt - Pinch")).toBeInTheDocument();
  });
});
