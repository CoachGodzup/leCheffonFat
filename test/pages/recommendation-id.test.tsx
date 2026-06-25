import { render, screen } from "@testing-library/react";
import RecommendationById from "@/app/recommendation/[id]/page";
import { useStore } from "@/store";
import { mockOkResponse } from "../utils/mock-fetch";
import { pizzaMargherita } from "../fixtures/meals";

jest.mock("next/navigation", () => ({
  useParams: () => ({ id: "99999" }),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
  useStore.setState({ calls: [] });
});

describe("RecommendationById", () => {
  it("renders the heading and a meal", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }));

    render(<RecommendationById />);

    expect(
      await screen.findByRole("heading", { name: /recommendation/i }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Pizza Margherita")).toBeInTheDocument();
  });

  it("renders a back link to /history", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }));

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
