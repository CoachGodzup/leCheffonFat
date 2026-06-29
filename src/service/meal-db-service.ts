import type {
  CategoryResponse,
  IngredientFilterResponse,
  Meal,
  MealSearchResponse,
} from "@/types/meal-db";

export const THE_MEAL_DB = "https://www.themealdb.com";
export const API_BASE = `${THE_MEAL_DB}/api/json/v1`;

const USE_MOCK = process.env.NEXT_PUBLIC_MOCK_API === "1";

async function request<T>(endpoint: string): Promise<T> {
  const fullBase = `${API_BASE}/${process.env.MEALDB_API_KEY ?? "1"}`;
  if (USE_MOCK) {
    const { getMockResponse } = await import("./meal-db-mock");
    return getMockResponse<T>(endpoint);
  }

  const res = await fetch(`${fullBase}/${endpoint}`);
  if (!res.ok) {
    throw new Error(
      `TheMealDB request failed: ${res.status} ${res.statusText}`,
    );
  }
  return res.json();
}

export const searchMealsByName = (query: string) => {
  return request<MealSearchResponse>(
    `search.php?s=${encodeURIComponent(query)}`,
  );
};

export const getMealById = (id: string) => {
  return request<MealSearchResponse>(`lookup.php?i=${id}`);
};

export const getRandomMeal = () => {
  return request<MealSearchResponse>("random.php");
};

export const getCategories = () => {
  return request<CategoryResponse>("categories.php");
};

export const filterByCategory = (category: string) => {
  return request<MealSearchResponse>(
    `filter.php?c=${encodeURIComponent(category)}`,
  );
};

export const filterByArea = (area: string) => {
  return request<MealSearchResponse>(
    `filter.php?a=${encodeURIComponent(area)}`,
  );
};

// ---- Pure predicates (composable) ----

const byArea = (area: string) => (meal: { strArea?: string | null }) =>
  meal.strArea === area;

const extractMeals = (res: MealSearchResponse) => res.meals ?? []; 

const checkIfValidMeal = (res: Meal[] | 'Invalid ID')  => { 
  if(typeof res === 'string')  {
    throw `Invalid response: ${res}`
  }
  return res
}

const pickRandom = <T>(items: T[]): T | null =>
  items.length === 0 ? null : items[Math.floor(Math.random() * items.length)];

const fetchFullMeal = (meal: { idMeal: string }) =>
  getMealById(meal.idMeal).then((r) => r.meals?.[0] ?? null);

// ---- Composed functions ----

export const getRandomMealByFilter = (
  category: string,
  area: string,
  oldId?: string,
) =>
  filterByCategory(category)
    .then(extractMeals)
    .then(checkIfValidMeal)
    .then((meals) => meals.filter((m) => !oldId || m.idMeal !== oldId))
    .then((meals) => meals.filter(byArea(area)))
    .then((meals) => { if(meals.length === 1) {
        console.warn('Only one element found, show same element'); 
      }
      return meals
    })
    .then(pickRandom)
    .then((meal) => (meal ? fetchFullMeal(meal) : null));

export const filterByIngredient = (ingredient: string) => {
  return request<IngredientFilterResponse>(
    `filter.php?i=${encodeURIComponent(ingredient)}`,
  );
};

export const getMealPageUrl = (meal: Meal): string => {
  if (meal.strSource) return meal.strSource;
  if (meal.strYoutube) return meal.strYoutube;
  return `${THE_MEAL_DB}/meal/${meal.idMeal}`;
};
