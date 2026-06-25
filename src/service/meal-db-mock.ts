import type {
  CategoryResponse,
  Meal,
  MealSearchResponse,
} from "@/types/meal-db";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));

const fishPieFull: Meal = {
  idMeal: "52802",
  strMeal: "Fish pie",
  strMealAlternate: null,
  strCategory: "Seafood",
  strArea: "British",
  strInstructions:
    "Put the potatoes in a large pan of cold salted water and bring to the boil. Lower the heat and simmer for 15 minutes or until tender. Drain, then mash with the cream and butter. Pour the milk into a pan, add the fish and bring to the boil. Remove from the heat and set aside. Melt the butter in a pan, stir in the flour and cook for 30 seconds. Gradually whisk in the fishy milk and cook for 5 minutes, stirring constantly, until thickened. Stir in the parsley and season. Place the fish in a baking dish, pour over the sauce, then top with the mash. Bake at 200°C for 30 minutes until golden.",
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

const pizzaMargherita: Meal = {
  idMeal: "99999",
  strMeal: "Pizza Margherita",
  strMealAlternate: null,
  strCategory: "Italian",
  strArea: "Italian",
  strInstructions:
    "Preheat the oven to 250°C. Roll out the dough, spread tomato sauce, add mozzarella and basil. Bake for 10-12 minutes until crispy.",
  strMealThumb:
    "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
  strTags: "Pizza,Italian,Cheese",
  strYoutube: "",
  strSource: "https://example.com/pizza",
  strImageSource: null,
  strCreativeCommonsConfirmed: null,
  dateModified: null,
};

const mealsByCategory: Record<string, MealSearchResponse> = {
  Seafood: {
    meals: [
      {
        idMeal: "52802",
        strMeal: "Fish pie",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
        strArea: "British",
      } as Meal,
      {
        idMeal: "52887",
        strMeal: "Kedgeree",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/utxqpt1511639216.jpg",
        strArea: "British",
      } as Meal,
      {
        idMeal: "52959",
        strMeal: "Baked salmon with fennel & tomatoes",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/1548772327.jpg",
        strArea: "British",
      } as Meal,
    ],
  },
  Italian: {
    meals: [
      {
        idMeal: "99999",
        strMeal: "Pizza Margherita",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
        strArea: "Italian",
      } as Meal,
    ],
  },
};

const categoriesResponse: CategoryResponse = {
  categories: [
    {
      idCategory: "1",
      strCategory: "Beef",
      strCategoryThumb: "",
      strCategoryDescription: "Beef dishes",
    },
    {
      idCategory: "2",
      strCategory: "Chicken",
      strCategoryThumb: "",
      strCategoryDescription: "Chicken dishes",
    },
    {
      idCategory: "3",
      strCategory: "Dessert",
      strCategoryThumb: "",
      strCategoryDescription: "Dessert dishes",
    },
    {
      idCategory: "4",
      strCategory: "Seafood",
      strCategoryThumb: "",
      strCategoryDescription: "Seafood dishes",
    },
    {
      idCategory: "5",
      strCategory: "Vegetarian",
      strCategoryThumb: "",
      strCategoryDescription: "Vegetarian dishes",
    },
    {
      idCategory: "6",
      strCategory: "Italian",
      strCategoryThumb: "",
      strCategoryDescription: "Italian dishes",
    },
  ],
};

export async function getMockResponse<T>(endpoint: string): Promise<T> {
  await delay();

  if (endpoint.startsWith("categories.php")) {
    return categoriesResponse as T;
  }

  if (endpoint.startsWith("random.php")) {
    return { meals: [fishPieFull] } as T;
  }

  if (endpoint.startsWith("lookup.php")) {
    const params = new URLSearchParams(endpoint.split("?")[1] ?? "");
    const id = params.get("i");
    const fullMeals: Record<string, Meal> = {
      "52802": fishPieFull,
      "99999": pizzaMargherita,
    };
    const meal = id ? (fullMeals[id] ?? null) : null;
    return { meals: meal ? [meal] : null } as T;
  }

  if (endpoint.startsWith("search.php")) {
    return { meals: [fishPieFull, pizzaMargherita] } as T;
  }

  if (endpoint.startsWith("filter.php")) {
    const params = new URLSearchParams(endpoint.split("?")[1] ?? "");
    const category = params.get("c");
    if (category && mealsByCategory[category]) {
      return mealsByCategory[category] as T;
    }
    return { meals: null } as T;
  }

  throw new Error(`Mock: unknown endpoint ${endpoint}`);
}
