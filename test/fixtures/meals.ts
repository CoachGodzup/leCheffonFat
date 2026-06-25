import type { Meal, MealSearchResponse } from "@/types/meal-db";

export const fishPieFull: Meal = {
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

export const pizzaMargherita: Meal = {
  idMeal: "99999",
  strMeal: "Pizza Margherita",
  strMealAlternate: null,
  strCategory: "Italian",
  strArea: "Italian",
  strInstructions: "",
  strMealThumb: "https://placehold.co/600x400/2563eb/ffffff?text=Pizza",
  strTags: "Pizza,Italian,Cheese",
  strYoutube: "",
  strSource: "https://example.com/pizza",
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

export const seafoodFilterResponse: MealSearchResponse = {
  meals: [
    {
      strMeal: "Baked salmon with fennel & tomatoes",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      idMeal: "52959",
      strArea: "British",
    } as Meal,
    {
      strMeal: "Fish pie",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
      idMeal: "52802",
      strArea: "British",
    } as Meal,
    {
      strMeal: "Salmon Avocado Salad",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/1549542994.jpg",
      idMeal: "52960",
      strArea: "British",
    } as Meal,
    {
      strMeal: "Kedgeree",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/utxqpt1511639216.jpg",
      idMeal: "52887",
      strArea: "British",
    } as Meal,
  ],
};

export const singleMealFilterResponse: MealSearchResponse = {
  meals: [
    {
      idMeal: "99999",
      strMeal: "Pizza Margherita",
      strMealThumb: "",
      strArea: "Italian",
    } as Meal,
  ],
};

export function buildMeal(overrides?: Partial<Meal>): Meal {
  return { ...fishPieFull, ...overrides };
}
