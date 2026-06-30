import { render, screen } from "@testing-library/react";

import RecommendationView from "@/components/organisms/RecommendationView/RecommendationView";
import { useStore } from "@/store";
import type { Meal } from "@/types/meal-db";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: jest.fn() }),
}));

const mockMeal: Meal = {
  idMeal: "99999",
  strMeal: "Pizza Margherita",
  strMealAlternate: null,
  strCategory: "Italian",
  strArea: "Italian",
  strInstructions: "Bake it",
  strMealThumb: "https://placehold.co/600x400/2563eb/ffffff?text=Pizza",
  strTags: "Pizza,Italian,Cheese",
  strYoutube: "",
  strSource: "https://example.com/pizza",
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

beforeEach(() => {
  useStore.setState({ calls: [] });
});

describe("RecommendationView", () => {
  it("renders loading state", () => {
    render(
      <RecommendationView
        data={null}
        isLoading={true}
        error={null}
        refetch={jest.fn()}
      />,
    );

    expect(screen.getByText("Loading recipe...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(
      <RecommendationView
        data={null}
        isLoading={false}
        error="Something went wrong"
        refetch={jest.fn()}
      />,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders 'No meal found' when data is null without error", () => {
    render(
      <RecommendationView
        data={null}
        isLoading={false}
        error={null}
        refetch={jest.fn()}
      />,
    );

    expect(screen.getByText("No meal found")).toBeInTheDocument();
  });

  it("rejects non-Meal object data via isMeal type guard", () => {
    render(
      <RecommendationView
        data={{} as Meal}
        isLoading={false}
        error={null}
        refetch={jest.fn()}
      />,
    );

    expect(screen.getByText("No meal found")).toBeInTheDocument();
  });

  it("rejects 'Invalid ID' string as data", () => {
    render(
      <RecommendationView
        data={"Invalid ID" as unknown as Meal}
        isLoading={false}
        error={null}
        refetch={jest.fn()}
      />,
    );

    expect(screen.getByText("No meal found")).toBeInTheDocument();
  });

  it("renders meal data", () => {
    render(
      <RecommendationView
        data={mockMeal}
        isLoading={false}
        error={null}
        refetch={jest.fn()}
      />,
    );

    expect(screen.getByText("Pizza Margherita")).toBeInTheDocument();
    expect(screen.getByText("Italian — Italian")).toBeInTheDocument();
  });

  it("renders back button in error state", () => {
    render(
      <RecommendationView
        data={null}
        isLoading={false}
        error={null}
        refetch={jest.fn()}
      />,
    );

    const btn = screen.getByRole("button", { name: /^back$/i });
    expect(btn).toBeInTheDocument();
  });

  it("renders the meal image", () => {
    render(
      <RecommendationView
        data={mockMeal}
        isLoading={false}
        error={null}
        refetch={jest.fn()}
      />,
    );

    const img = screen.getByRole("img", { name: /pizza margherita/i });
    expect(img).toBeInTheDocument();
  });

  it("renders a source link", () => {
    render(
      <RecommendationView
        data={mockMeal}
        isLoading={false}
        error={null}
        refetch={jest.fn()}
      />,
    );

    const link = screen.getByRole("link", { name: /view full recipe/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/pizza");
  });
});
