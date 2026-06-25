import { render, screen } from "@testing-library/react";
import Recommendation from "@/app/recommendation/page";
import { useStore } from "@/store";
import { mockOkResponse } from "../utils/mock-fetch";
import { pizzaMargherita, singleMealFilterResponse } from "../fixtures/meals";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();

  useStore.setState({
    category: "Italian",
    area: "Italian",
  });
});

describe("Recommendation", () => {
  it("renders the heading and a meal", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse(singleMealFilterResponse))
      .mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }));

    render(<Recommendation />);

    expect(
      await screen.findByRole("heading", { name: /recommendation/i }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Pizza Margherita")).toBeInTheDocument();
  });

  it("renders the meal image", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse(singleMealFilterResponse))
      .mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }));

    render(<Recommendation />);

    const img = await screen.findByRole("img", { name: /pizza margherita/i });
    expect(img).toBeInTheDocument();
  });

  it("renders category and area", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse(singleMealFilterResponse))
      .mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }));

    render(<Recommendation />);

    expect(await screen.findByText("Italian — Italian")).toBeInTheDocument();
  });

  it("renders a source link", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse(singleMealFilterResponse))
      .mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }));

    render(<Recommendation />);

    const link = await screen.findByRole("link", { name: /view full recipe/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com/pizza");
  });

  it("renders a back link to page2", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse(singleMealFilterResponse))
      .mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }));

    render(<Recommendation />);

    const link = await screen.findByRole("link", { name: /back/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/page2");
  });

  it("renders error message when service fails", async () => {
    mockFetch.mockReturnValue(
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: "Server Error",
      } as Response),
    );

    render(<Recommendation />);

    expect(
      await screen.findByText(/TheMealDB request failed/),
    ).toBeInTheDocument();
  });

  it("renders 'No meal found' when no matching meals", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: null }));

    render(<Recommendation />);

    expect(await screen.findByText("No meal found")).toBeInTheDocument();
  });
});
