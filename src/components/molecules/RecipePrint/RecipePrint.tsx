import { Meal } from "@/types/meal-db";

type RecipePrintProps = {
  meal: Meal;
};

export const RecipePrint = ({ meal }: RecipePrintProps) => {
  return (
    <div className="instructions">
      <ul>
        {[...Array.from({ length: 20 }).keys()]
          .filter((num) => meal[`strIngredient${num}` as keyof Meal])
          .map((num) => (
            <li key={`Ingredients${num}`}>
              {meal[`strIngredient${num}` as keyof Meal]} -{" "}
              {meal[`strMeasure${num}` as keyof Meal]}
            </li>
          ))}
      </ul>
      <article role="main">
        <h2>Instructions</h2>
        <div>{meal.strInstructions}</div>
      </article>
      <p className="print-only">
        Printed by Le Cheffon Fat using The Meal DB (https://www.themealdb.com)
      </p>
    </div>
  );
};

export default RecipePrint;
