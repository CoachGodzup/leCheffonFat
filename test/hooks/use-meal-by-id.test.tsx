import { act, renderHook, waitFor } from "@testing-library/react";

import { useMealById } from "@/hooks/use-meal-by-id";

import { fishPieFull } from "../fixtures/meals";
import { mockOkResponse } from "../utils/mock-fetch";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

describe("useMealById", () => {
  it("returns a meal on success", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [fishPieFull] }));

    const { result } = renderHook(() => useMealById("52802"));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.idMeal).toBe("52802");
    expect(result.current.error).toBeNull();
  });

  it("returns error when no meal found", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: null }));

    const { result } = renderHook(() => useMealById("99999"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("No meal found");
  });

  it("refetch fetches again with same id", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [fishPieFull] }));

    const { result } = renderHook(() => useMealById("52802"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.idMeal).toBe("52802");

    mockFetch.mockReset();
    const updatedMeal = { ...fishPieFull, strMeal: "Updated Fish pie" };
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [updatedMeal] }));

    act(() => result.current.refetch());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.strMeal).toBe("Updated Fish pie");
  });
});
