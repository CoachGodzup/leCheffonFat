import { renderHook, waitFor, act } from "@testing-library/react";
import { useMealById } from "@/hooks/use-meal-by-id";
import type { Meal } from "@/types/meal-db";

const mockFetch = jest.fn();
global.fetch = mockFetch;

function mockOkResponse(data: unknown) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);
}

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

describe("useMealById", () => {
  it("returns a meal on success", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [mockFullMeal] }));

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
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [mockFullMeal] }));

    const { result } = renderHook(() => useMealById("52802"));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.idMeal).toBe("52802");

    mockFetch.mockReset();
    const sameMeal = { ...mockFullMeal, strMeal: "Updated Fish pie" };
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: [sameMeal] }));

    act(() => result.current.refetch());
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data?.strMeal).toBe("Updated Fish pie");
  });
});
