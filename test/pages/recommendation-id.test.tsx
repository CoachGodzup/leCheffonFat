import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RecommendationById from "@/app/recommendation/[id]/page";
import { useStore } from "@/store";
import type { Meal } from "@/types/meal-db";

import { pizzaMargherita } from "../fixtures/meals";
import { mockOkResponse } from "../utils/mock-fetch";

const mockPush = jest.fn();
const mockBack = jest.fn();

const mockSearchParamsGet = jest.fn();

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "99999" }),
  useRouter: () => ({ push: mockPush, back: mockBack }),
  useSearchParams: () => ({ get: mockSearchParamsGet }),
}));

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const carbonara: Meal = {
  idMeal: "52802",
  strMeal: "Spaghetti Carbonara",
  strMealAlternate: null,
  strCategory: "Italian",
  strArea: "Italian",
  strInstructions: "",
  strMealThumb: "",
  strTags: "",
  strYoutube: "",
  strSource: "",
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

beforeEach(() => {
  mockFetch.mockClear();
  mockPush.mockClear();
  mockBack.mockClear();
  mockSearchParamsGet.mockClear();
  useStore.setState({ calls: [] });
});

describe("RecommendationById without params", () => {
  it("renders the heading and a meal", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }));

    render(<RecommendationById />);

    expect(
      await screen.findByRole("heading", { name: /recommendation/i }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Pizza Margherita")).toBeInTheDocument();
  });

  it("renders a back button", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }));

    render(<RecommendationById />);

    const btn = await screen.findByRole("button", {
      name: /back to previous page/i,
    });
    expect(btn).toBeInTheDocument();
  });

  it("renders error when meal not found", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: null }));

    render(<RecommendationById />);

    expect(await screen.findByText("No meal found")).toBeInTheDocument();
  });
});

describe("RecommendationById with category and area params", () => {
  beforeEach(() => {
    mockSearchParamsGet.mockImplementation((key: string) => {
      if (key === "category") return "Italian";
      if (key === "area") return "Italian";
      return null;
    });
  });

  it("renders a back button", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }));

    render(<RecommendationById />);

    const btn = await screen.findByRole("button", {
      name: /back to previous page/i,
    });
    expect(btn).toBeInTheDocument();
  });

  it("navigates to new recommendation on New Idea click", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }))
      .mockReturnValueOnce(
        mockOkResponse({ meals: [{ ...carbonara, idMeal: "11111" }] }),
      )
      .mockReturnValueOnce(mockOkResponse({ meals: [carbonara] }));

    render(<RecommendationById />);

    await screen.findByText("Pizza Margherita");

    const newIdeaBtn = screen.getByRole("button", {
      name: /new recipe idea/i,
    });
    await userEvent.click(newIdeaBtn);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        expect.stringMatching(/^\/recommendation\/52802/),
      );
    });
  });

  it("shows error message when New Idea fetch fails", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }))
      .mockReturnValueOnce(mockOkResponse({ meals: null }));

    render(<RecommendationById />);

    await screen.findByText("Pizza Margherita");

    const newIdeaBtn = screen.getByRole("button", {
      name: /new recipe idea/i,
    });
    await userEvent.click(newIdeaBtn);

    await waitFor(() => {
      expect(
        screen.getByText("No new recipe found for these criteria"),
      ).toBeInTheDocument();
    });
  });
});

describe("RecommendationById from history with inputs", () => {
  beforeEach(() => {
    useStore.setState({
      calls: [
        {
          recipeId: "99999",
          title: "Pizza Margherita",
          imageUrl: "",
          timestamp: 1000,
          like: null,
          inputs: { category: "Italian", area: "Italian" },
        },
      ],
    });
  });

  it("renders a back button", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }));

    render(<RecommendationById />);

    const btn = await screen.findByRole("button", {
      name: /back to previous page/i,
    });
    expect(btn).toBeInTheDocument();
  });

  it("navigates to new recommendation on New Idea click using history inputs", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }))
      .mockReturnValueOnce(
        mockOkResponse({ meals: [{ ...carbonara, idMeal: "11111" }] }),
      )
      .mockReturnValueOnce(mockOkResponse({ meals: [carbonara] }));

    render(<RecommendationById />);

    await screen.findByText("Pizza Margherita");

    const newIdeaBtn = screen.getByRole("button", {
      name: /new recipe idea/i,
    });
    await userEvent.click(newIdeaBtn);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(
        expect.stringMatching(/^\/recommendation\/52802/),
      );
    });
  });
});
