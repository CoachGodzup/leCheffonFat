import { renderHook, act, waitFor } from "@testing-library/react";
import { useSearch } from "@/hooks/use-search";

const mockFetch = jest.fn();
global.fetch = mockFetch;

function mockOkResponse(data: unknown) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);
}

const mockMeal = {
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

const mockSearchResponse = { meals: [mockMeal] };

beforeEach(() => {
  mockFetch.mockClear();
  mockFetch.mockReturnValue(mockOkResponse(mockSearchResponse));
});

describe("useSearch", () => {
  it("returns empty state initially", async () => {
    const { result } = renderHook(() => useSearch());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.searchText).toBe("");
    expect(result.current.meals).toEqual([]);
    expect(result.current.error).toBeNull();
    expect(result.current.isActive).toBe(false);
  });

  it("sets searchText on input", async () => {
    const { result } = renderHook(() => useSearch());
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => result.current.setSearchText("pasta"));
    expect(result.current.searchText).toBe("pasta");
  });

  it("does not search with fewer than 3 characters", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useSearch());
    await act(async () => {});

    act(() => result.current.setSearchText("ab"));
    act(() => jest.advanceTimersByTime(300));

    expect(mockFetch).not.toHaveBeenCalledWith(
      expect.stringContaining("search.php"),
      expect.anything(),
    );
    expect(result.current.meals).toEqual([]);
    jest.useRealTimers();
  });

  it("searches after debounce when input >= 3 chars", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useSearch());

    act(() => result.current.setSearchText("fish"));
    act(() => jest.advanceTimersByTime(300));

    expect(result.current.isActive).toBe(true);
    expect(result.current.isLoading).toBe(true);

    await act(async () => {});

    expect(result.current.isLoading).toBe(false);
    expect(result.current.meals).toHaveLength(1);
    expect(result.current.meals[0].idMeal).toBe("52802");
    expect(result.current.meals[0].strMeal).toBe("Fish pie");
    jest.useRealTimers();
  });

  it("clears results when text goes below 3 chars", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useSearch());

    act(() => result.current.setSearchText("fish"));
    act(() => jest.advanceTimersByTime(300));
    await act(async () => {});
    expect(result.current.meals).toHaveLength(1);

    act(() => result.current.setSearchText("fi"));
    act(() => jest.advanceTimersByTime(300));

    expect(result.current.isActive).toBe(false);
    expect(result.current.meals).toEqual([]);
    jest.useRealTimers();
  });

  it("handles API error", async () => {
    jest.useFakeTimers();
    mockFetch.mockReturnValue(
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: "Server Error",
      } as Response),
    );

    const { result } = renderHook(() => useSearch());

    act(() => result.current.setSearchText("fish"));
    act(() => jest.advanceTimersByTime(300));
    await act(async () => {});

    expect(result.current.error).toBe(
      "TheMealDB request failed: 500 Server Error",
    );
    expect(result.current.meals).toEqual([]);
    jest.useRealTimers();
  });
});
