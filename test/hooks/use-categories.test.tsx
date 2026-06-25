import { renderHook, waitFor } from "@testing-library/react";
import { useCategories } from "@/hooks/use-categories";
import { mockOkResponse, mockErrorResponse } from "../utils/mock-fetch";
import { mockCategoriesResponse } from "../fixtures/categories";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

describe("useCategories", () => {
  it("returns categories on success", async () => {
    mockFetch.mockReturnValue(mockOkResponse(mockCategoriesResponse));

    const { result } = renderHook(() => useCategories());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockCategoriesResponse.categories);
    expect(result.current.error).toBeNull();
  });

  it("returns error on failure", async () => {
    mockFetch.mockReturnValue(mockErrorResponse(500, "Server Error"));

    const { result } = renderHook(() => useCategories());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(
      "TheMealDB request failed: 500 Server Error",
    );
  });
});
