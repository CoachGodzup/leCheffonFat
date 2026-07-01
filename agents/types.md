# Types

```csv
File,Exports,Description
src/types/meal-db.ts,"Meal, Category, Ingredient, Area, MealSearchResponse, CategoryResponse, AreaResponse, IngredientResponse, IngredientFilterResponse","All TheMealDB API types. Meal includes IngredientFields (strIngredient1-20) and MeasureFields (strMeasure1-20)."
src/types/form.ts,"UserRequest { category, area }, Page1Request, Page2Request","Wizard form data types — pick-based sub-types for each step."
src/types/history.ts,"Call { recipeId, title, imageUrl, timestamp, like, inputs }, History { calls[] }","Recommendation history model — each call stores the recipe, user feedback, and form inputs."
src/types/notifications.ts,"ToastType = ""error"" | ""warning"", Toast { id, message, type }","Toast notification model for the in-app notification system."
```
