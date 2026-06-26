import { renderHook, waitFor } from "@testing-library/react";

import { useAreasByCategory } from "@/hooks/use-areas-by-category";

import { mealsWithAreas } from "../fixtures/areas";
import { mockErrorResponse, mockOkResponse } from "../utils/mock-fetch";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

describe("useAreasByCategory", () => {
  it("returns unique areas on success", async () => {
    mockFetch.mockReturnValue(mockOkResponse(mealsWithAreas));

    const { result } = renderHook(() => useAreasByCategory("Dessert"));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual([
      { strArea: "Italian" },
      { strArea: "Canadian" },
      { strArea: "French" },
    ]);
    expect(result.current.error).toBeNull();
  });

  it("returns empty array when meals is null", async () => {
    mockFetch.mockReturnValue(mockOkResponse({ meals: null }));

    const { result } = renderHook(() => useAreasByCategory("Dessert"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("returns error on failure", async () => {
    mockFetch.mockReturnValue(mockErrorResponse(500, "Server Error"));

    const { result } = renderHook(() => useAreasByCategory("Dessert"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(
      "TheMealDB request failed: 500 Server Error",
    );
  });
});
