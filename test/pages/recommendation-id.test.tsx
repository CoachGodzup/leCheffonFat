import { render, screen } from "@testing-library/react";
import RecommendationById from "@/app/recommendation/[id]/page";
import { useStore } from "@/store";

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "99999" }),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

function mockOkResponse(data: unknown) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);
}

const mockFullMeal = {
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

beforeEach(() => {
  mockFetch.mockClear();
  useStore.setState({ calls: [] });
});

describe("RecommendationById", () => {
  it("renders the heading and a meal", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [mockFullMeal] }));

    render(<RecommendationById />);

    expect(
      await screen.findByRole("heading", { name: /recommendation/i }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Pizza Margherita")).toBeInTheDocument();
  });

  it("renders a back link to /history", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [mockFullMeal] }));

    render(<RecommendationById />);

    const links = await screen.findAllByRole("link", { name: /back/i });
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/history");
    }
  });

  it("renders error when meal not found", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: null }));

    render(<RecommendationById />);

    expect(await screen.findByText("No meal found")).toBeInTheDocument();
  });
});
