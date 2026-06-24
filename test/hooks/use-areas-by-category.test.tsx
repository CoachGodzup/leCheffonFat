import { renderHook, waitFor } from "@testing-library/react";
import { useAreasByCategory } from "@/hooks/use-areas-by-category";

const mockFetch = jest.fn();
global.fetch = mockFetch;

function mockOkResponse(data: unknown) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);
}

function mockErrorResponse() {
  return Promise.resolve({
    ok: false,
    status: 500,
    statusText: "Server Error",
  } as Response);
}

const mealsWithAreas = {
  meals: [
    { strArea: "Italian" },
    { strArea: "Canadian" },
    { strArea: "Italian" },
    { strArea: "French" },
  ],
};

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
    mockFetch.mockReturnValue(mockErrorResponse());

    const { result } = renderHook(() => useAreasByCategory("Dessert"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(
      "TheMealDB request failed: 500 Server Error",
    );
  });
});
