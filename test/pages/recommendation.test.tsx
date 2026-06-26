import { render, screen, waitFor } from "@testing-library/react";

import Recommendation from "@/app/recommendation/page";
import { useStore } from "@/store";

import { pizzaMargherita, singleMealFilterResponse } from "../fixtures/meals";
import { mockOkResponse } from "../utils/mock-fetch";

const mockReplace = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
  mockReplace.mockClear();

  useStore.setState({
    category: "Italian",
    area: "Italian",
  });
});

describe("Recommendation", () => {
  it("shows loading state while fetching", () => {
    mockFetch.mockReturnValue(new Promise(() => {}));

    render(<Recommendation />);

    expect(
      screen.getByRole("heading", { name: /recommendation/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/finding a recipe for you/i)).toBeInTheDocument();
  });

  it("redirects to /recommendation/[id]?category=X&area=Y on success", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse(singleMealFilterResponse))
      .mockReturnValueOnce(mockOkResponse({ meals: [pizzaMargherita] }));

    render(<Recommendation />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(
        "/recommendation/99999?category=Italian&area=Italian",
      );
    });
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

    await waitFor(() => {
      expect(screen.getByText(/TheMealDB request failed/)).toBeInTheDocument();
    });
  });

  it("renders 'No meal found' when no matching meals", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: null }));

    render(<Recommendation />);

    await waitFor(() => {
      expect(screen.getByText("No meal found")).toBeInTheDocument();
    });
  });
});
