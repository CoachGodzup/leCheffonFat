import { render, screen } from "@testing-library/react";
import Recommendation from "@/app/recommendation/page";
import { getRandomMeal } from "@/service/meal-db-service";

jest.mock("@/service/meal-db-service", () => ({
  getRandomMeal: jest.fn(),
}));

const mockedGetRandomMeal = jest.mocked(getRandomMeal);

describe("Recommendation", () => {
  beforeEach(() => {
    mockedGetRandomMeal.mockResolvedValue({
      meals: [
        {
          idMeal: "99999",
          strMeal: "Pizza Margherita",
          strMealAlternate: null,
          strCategory: "Italian",
          strArea: "Italian",
          strInstructions: "",
          strMealThumb: "https://placehold.co/600x400/2563eb/ffffff?text=Pizza",
          strTags: "Pizza,Italian,Cheese",
          strYoutube: "",
          strSource: "",
          strImageSource: null,
          strCreativeCommonsConfirmed: null,
          dateModified: null,
        },
      ],
    });
  });

  it("renders the heading and a meal", async () => {
    const element = await Recommendation();
    render(element);

    expect(
      screen.getByRole("heading", { name: /recommendation/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
  });

  it("renders a back link to page2", async () => {
    const element = await Recommendation();
    render(element);

    const link = screen.getByRole("link", { name: /back/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/page2");
  });

  it("renders a link to go home", async () => {
    const element = await Recommendation();
    render(element);

    const link = screen.getByRole("link", { name: /go to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders error message when service fails", async () => {
    mockedGetRandomMeal.mockRejectedValue(new Error("Network error"));

    const element = await Recommendation();
    render(element);

    expect(screen.getByText(/Network error/)).toBeInTheDocument();
  });
});
