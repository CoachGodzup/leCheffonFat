import {
  filterByArea,
  filterByCategory,
  filterByIngredient,
  getCategories,
  getMealById,
  getRandomMeal,
  searchMealsByName,
} from "@/service/meal-db-service";

import { mockErrorResponse, mockOkResponse } from "../utils/mock-fetch";

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const BASE = "https://www.themealdb.com/api/json/v1/1";

beforeEach(() => {
  mockFetch.mockClear();
});

describe("searchMealsByName", () => {
  it("calls the search endpoint with the query", async () => {
    const data = { meals: [{ idMeal: "123", strMeal: "Soup" }] };
    mockFetch.mockReturnValue(mockOkResponse(data));

    const result = await searchMealsByName("soup");

    expect(mockFetch).toHaveBeenCalledWith(`${BASE}/search.php?s=soup`);
    expect(result).toEqual(data);
  });

  it("URL-encodes the query", async () => {
    mockFetch.mockReturnValue(mockOkResponse({ meals: null }));

    await searchMealsByName("chicken soup");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("s=chicken%20soup"),
    );
  });

  it("throws on non-ok response", async () => {
    mockFetch.mockReturnValue(mockErrorResponse(404, "Not Found"));

    await expect(searchMealsByName("soup")).rejects.toThrow(
      "TheMealDB request failed: 404 Not Found",
    );
  });
});

describe("getMealById", () => {
  it("calls the lookup endpoint", async () => {
    mockFetch.mockReturnValue(mockOkResponse({ meals: null }));

    await getMealById("52795");

    expect(mockFetch).toHaveBeenCalledWith(`${BASE}/lookup.php?i=52795`);
  });
});

describe("getRandomMeal", () => {
  it("calls the random endpoint", async () => {
    mockFetch.mockReturnValue(mockOkResponse({ meals: [] }));

    await getRandomMeal();

    expect(mockFetch).toHaveBeenCalledWith(`${BASE}/random.php`);
  });
});

describe("getCategories", () => {
  it("calls the categories endpoint", async () => {
    mockFetch.mockReturnValue(mockOkResponse({ categories: [] }));

    await getCategories();

    expect(mockFetch).toHaveBeenCalledWith(`${BASE}/categories.php`);
  });
});

describe("filterByCategory", () => {
  it("calls the filter endpoint with the category", async () => {
    mockFetch.mockReturnValue(mockOkResponse({ meals: null }));

    await filterByCategory("Dessert");

    expect(mockFetch).toHaveBeenCalledWith(`${BASE}/filter.php?c=Dessert`);
  });

  it("URL-encodes multi-word categories", async () => {
    mockFetch.mockReturnValue(mockOkResponse({ meals: null }));

    await filterByCategory("Sea food");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("c=Sea%20food"),
    );
  });
});

describe("filterByArea", () => {
  it("calls the filter endpoint with the area", async () => {
    mockFetch.mockReturnValue(mockOkResponse({ meals: null }));

    await filterByArea("Canadian");

    expect(mockFetch).toHaveBeenCalledWith(`${BASE}/filter.php?a=Canadian`);
  });
});

describe("filterByIngredient", () => {
  it("calls the filter endpoint with the ingredient", async () => {
    mockFetch.mockReturnValue(mockOkResponse({ meals: null }));

    await filterByIngredient("chicken");

    expect(mockFetch).toHaveBeenCalledWith(`${BASE}/filter.php?i=chicken`);
  });

  it("returns the correct response type", async () => {
    const data = {
      meals: [{ idMeal: "1", strMeal: "Chicken Soup", strMealThumb: "" }],
    };
    mockFetch.mockReturnValue(mockOkResponse(data));

    const result = await filterByIngredient("chicken");

    expect(result.meals).toHaveLength(1);
    expect(result.meals![0].idMeal).toBe("1");
  });
});
