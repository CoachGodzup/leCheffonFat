import { act, renderHook, waitFor } from "@testing-library/react";

import { useRandomMeal } from "@/hooks/use-random-meal";

import { fishPieFull } from "../fixtures/meals";
import { mockOkResponse } from "../utils/mock-fetch";

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const mockFilterResponse = {
  meals: [
    {
      idMeal: "52802",
      strMeal: "Fish pie",
      strMealThumb: "",
      strArea: "British",
    },
  ],
};

beforeEach(() => {
  mockFetch.mockClear();
});

describe("useRandomMeal", () => {
  it("returns a meal on success", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse(mockFilterResponse))
      .mockReturnValueOnce(mockOkResponse({ meals: [fishPieFull] }));

    const { result } = renderHook(() => useRandomMeal("Seafood", "British"));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.idMeal).toBe("52802");
    expect(result.current.error).toBeNull();
  });

  it("returns error when no meal found", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: null }));

    const { result } = renderHook(() => useRandomMeal("Seafood", "Italian"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("No meal found");
  });

  it("refetch fetches again", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse(mockFilterResponse))
      .mockReturnValueOnce(mockOkResponse({ meals: [fishPieFull] }));

    const { result } = renderHook(() => useRandomMeal("Seafood", "British"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.idMeal).toBe("52802");

    mockFetch.mockReset();
    const newMeal = { ...fishPieFull, idMeal: "99999" };
    mockFetch
      .mockReturnValueOnce(
        mockOkResponse({
          meals: [
            {
              idMeal: "99999",
              strMeal: "New",
              strMealThumb: "",
              strArea: "British",
            },
          ],
        }),
      )
      .mockReturnValueOnce(mockOkResponse({ meals: [newMeal] }));

    act(() => result.current.refetch());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.idMeal).toBe("99999");
  });
});
