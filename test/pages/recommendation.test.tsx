import { render, screen } from "@testing-library/react";
import Recommendation from "@/app/recommendation/page";
import { getRandomMeal } from "@/service/meal-db-service";

jest.mock("@/service/meal-db-service", () => ({
  getRandomMeal: jest.fn(),
}));

const mockedGetRandomMeal = jest.mocked(getRandomMeal);

const mockMeal = {
  idMeal: "99999",
  strMeal: "Pizza Margherita",
  strMealAlternate: null,
  strCategory: "Italian",
  strArea: "Italian",
  strInstructions: "",
  strMealThumb: "https://placehold.co/600x400/2563eb/ffffff?text=Pizza",
  strTags: "Pizza,Italian,Cheese",
  strYoutube: "",
  strSource: "https://example.com/pizza",
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

describe("Recommendation", () => {
  beforeEach(() => {
    mockedGetRandomMeal.mockResolvedValue({ meals: [mockMeal] });
  });

  it("renders the heading and a meal", async () => {
    const element = await Recommendation();
    render(element);

    expect(
      screen.getByRole("heading", { name: /recommendation/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
  });

  it("renders the meal image", async () => {
    const element = await Recommendation();
    render(element);

    const img = screen.getByRole("img", { name: /pizza margherita/i });
    expect(img).toBeInTheDocument();
  });

  it("renders the meal id", async () => {
    const element = await Recommendation();
    render(element);

    expect(screen.getByText("99999")).toBeInTheDocument();
  });

  it("renders category and area", async () => {
    const element = await Recommendation();
    render(element);

    expect(screen.getByText(/Category: Italian/)).toBeInTheDocument();
    expect(screen.getByText(/Area: Italian/)).toBeInTheDocument();
  });

  it("renders tags", async () => {
    const element = await Recommendation();
    render(element);

    expect(screen.getByText(/Tags: Pizza,Italian,Cheese/)).toBeInTheDocument();
  });

  it("renders a source link", async () => {
    const element = await Recommendation();
    render(element);

    const link = screen.getByRole("link", { name: /go to source/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/pizza");
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

  it("renders 'No meal found' when response has no meals", async () => {
    mockedGetRandomMeal.mockResolvedValue({ meals: null });

    const element = await Recommendation();
    render(element);

    expect(screen.getByText("No meal found")).toBeInTheDocument();
  });
});
