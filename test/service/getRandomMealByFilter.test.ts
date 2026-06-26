import { getRandomMealByFilter } from "@/service/meal-db-service";

import { fishPieFull, seafoodFilterResponse } from "../fixtures/meals";
import { mockOkResponse } from "../utils/mock-fetch";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const BASE = "https://www.themealdb.com/api/json/v1/1";

beforeEach(() => {
  mockFetch.mockClear();
});

describe("getRandomMealByFilter", () => {
  it("filters by category then filters by area client-side", async () => {
    mockFetch
      .mockReturnValueOnce(mockOkResponse(seafoodFilterResponse))
      .mockReturnValueOnce(mockOkResponse({ meals: [fishPieFull] }));

    const result = await getRandomMealByFilter("Seafood", "British");

    expect(mockFetch).toHaveBeenCalledWith(`${BASE}/filter.php?c=Seafood`);
    expect(result?.idMeal).toBe("52802");
    expect(result?.strMeal).toBe("Fish pie");
    expect(result?.strArea).toBe("British");
    expect(result?.strCategory).toBe("Seafood");
  });

  it("returns null when category filter returns no meals", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse({ meals: null }));

    const result = await getRandomMealByFilter(
      "NonExistentCategory",
      "Italian",
    );

    expect(result).toBeNull();
  });

  it("returns null when no meals match the area filter", async () => {
    mockFetch.mockReturnValueOnce(mockOkResponse(seafoodFilterResponse));

    const result = await getRandomMealByFilter("Seafood", "Italian");

    expect(result).toBeNull();
  });

  it("returns a random meal when multiple match", async () => {
    const meals = await Promise.all(
      Array.from({ length: 20 }, async () => {
        mockFetch
          .mockReturnValueOnce(mockOkResponse(seafoodFilterResponse))
          .mockReturnValueOnce(mockOkResponse({ meals: [fishPieFull] }));

        return getRandomMealByFilter("Seafood", "British");
      }),
    );

    expect(meals.length).toBe(20);
    meals.forEach((meal) => {
      expect(meal).not.toBeNull();
    });
  });
});
