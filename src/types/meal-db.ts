type Index =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20;

type IngredientFields = { readonly [K in `strIngredient${Index}`]?: string };
type MeasureFields = { readonly [K in `strMeasure${Index}`]?: string };

export type Meal = {
  readonly idMeal: string;
  readonly strMeal: string;
  readonly strMealAlternate: string | null;
  readonly strCategory: string;
  readonly strArea: string;
  readonly strInstructions: string;
  readonly strMealThumb: string;
  readonly strTags: string | null;
  readonly strYoutube: string;
  readonly strSource: string;
  readonly strImageSource: string | null;
  readonly strCreativeCommonsConfirmed: string | null;
  readonly dateModified: string | null;
} & IngredientFields &
  MeasureFields;

export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface Ingredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
}

export interface MealSearchResponse {
  meals: Meal[] | null;
}

export interface CategoryResponse {
  categories: Category[];
}

export interface IngredientResponse {
  meals: Ingredient[] | null;
}

export interface Area {
  strArea: string;
}

export interface AreaResponse {
  meals: Area[];
}

export interface IngredientFilterResponse {
  meals: Pick<Meal, "idMeal" | "strMeal" | "strMealThumb">[] | null;
}
