import { renderHook, waitFor, act } from "@testing-library/react";
import { useRandomMeal } from "@/hooks/use-random-meal";
import type { Meal } from "@/types/meal-db";

const mockFetch = jest.fn();
global.fetch = mockFetch;

function mockOkResponse(data: unknown) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);
}

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

const mockFullMeal: Meal = {
  idMeal: "52802",
  strMeal: "Fish pie",
  strMealAlternate: null,
  strCategory: "Seafood",
  strArea: "British",
  strInstructions: "Bake it.",
  strMealThumb: "",
  strTags: null,
  strYoutube: "",
  strSource: "",
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

beforeEach(() => {
  mockFetch.mockClear();
});

describe("useRandomMeal", () => {
  it("returns a meal on success", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse(mockFilterResponse))
      .mockReturnValueOnce(mockOkResponse({ meals: [mockFullMeal] }));

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
      .mockReturnValueOnce(mockOkResponse({ meals: [mockFullMeal] }));
    // Second call for refetch
    const { result } = renderHook(() => useRandomMeal("Seafood", "British"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.idMeal).toBe("52802");

    mockFetch.mockReset();
    const newMeal = { ...mockFullMeal, idMeal: "99999" };
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
