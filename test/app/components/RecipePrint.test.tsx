import { render, screen } from "@testing-library/react";
import { RecipePrint } from "@/components/recipePrint/recipePrint";
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
      screen.getByRole("heading", { level: 5, name: /instructions/i }),
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
});
