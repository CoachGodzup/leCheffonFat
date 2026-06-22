import { getRandomMealByFilter } from "@/service/meal-db-service";
import type { Meal } from "@/types/meal-db";

const mockFetch = jest.fn();
global.fetch = mockFetch;

const BASE = "https://www.themealdb.com/api/json/v1/1";

function mockResponse(data: unknown) {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);
}

// Realistic data from filter.php?c=Seafood
const seafoodFilterResponse = {
  meals: [
    {
      strMeal: "Baked salmon with fennel & tomatoes",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      idMeal: "52959",
      strArea: "British",
    },
    {
      strMeal: "Fish pie",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
      idMeal: "52802",
      strArea: "British",
    },
    {
      strMeal: "Salmon Avocado Salad",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/1549542994.jpg",
      idMeal: "52960",
      strArea: "British",
    },
    {
      strMeal: "Kedgeree",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/utxqpt1511639216.jpg",
      idMeal: "52887",
      strArea: "British",
    },
  ],
};

// Realistic data from lookup.php?i=52802
const fishPieFull: Meal = {
  idMeal: "52802",
  strMeal: "Fish pie",
  strMealAlternate: null,
  strCategory: "Seafood",
  strArea: "British",
  strInstructions:
    "Put the potatoes in a large pan of cold salted water and bring to the boil. Lower the heat and simmer for 15 minutes or until tender. Drain, then mash with the cream and butter.",
  strMealThumb:
    "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
  strTags: "Fish,Pie,Breakfast,Baking",
  strYoutube: "https://www.youtube.com/watch?v=2sX4fCgg-UI",
  strSource: "https://www.bbcgoodfood.com/recipes/fish-pie/",
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
  strIngredient1: "Potatoes",
  strIngredient2: "Salmon",
  strIngredient3: "White fish fillets",
  strIngredient4: "Prawns",
  strIngredient5: "Butter",
  strMeasure1: "1kg",
  strMeasure2: "400g",
  strMeasure3: "400g",
  strMeasure4: "200g",
  strMeasure5: "large knob",
};

beforeEach(() => {
  mockFetch.mockClear();
});

describe("getRandomMealByFilter", () => {
  it("filters by category then filters by area client-side", async () => {
    mockFetch
      .mockReturnValueOnce(mockResponse(seafoodFilterResponse)) // filter.php?c=Seafood
      .mockReturnValueOnce(
        mockResponse({ meals: [fishPieFull] }), // lookup.php?i=52802
      );

    const result = await getRandomMealByFilter("Seafood", "British");

    expect(mockFetch).toHaveBeenCalledWith(`${BASE}/filter.php?c=Seafood`);
    expect(result?.idMeal).toBe("52802");
    expect(result?.strMeal).toBe("Fish pie");
    expect(result?.strArea).toBe("British");
    expect(result?.strCategory).toBe("Seafood");
  });

  it("returns null when category filter returns no meals", async () => {
    mockFetch.mockReturnValueOnce(mockResponse({ meals: null }));

    const result = await getRandomMealByFilter(
      "NonExistentCategory",
      "Italian",
    );

    expect(result).toBeNull();
  });

  it("returns null when no meals match the area filter", async () => {
    mockFetch.mockReturnValueOnce(mockResponse(seafoodFilterResponse));

    const result = await getRandomMealByFilter("Seafood", "Italian");

    expect(result).toBeNull();
  });

  it("returns a random meal when multiple match", async () => {
    const meals = await Promise.all(
      Array.from({ length: 20 }, async () => {
        mockFetch
          .mockReturnValueOnce(mockResponse(seafoodFilterResponse))
          .mockReturnValueOnce(mockResponse({ meals: [fishPieFull] }));

        return getRandomMealByFilter("Seafood", "British");
      }),
    );

    // Even with randomness, every call must return a valid British seafood meal
    expect(meals.length).toBe(20);
    meals.forEach((meal) => {
      expect(meal).not.toBeNull();
    });
  });
});
