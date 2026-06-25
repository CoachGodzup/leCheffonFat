import { Meal } from "@/types/meal-db";

type RecipePrintProps = {
  meal: Meal;
};

export const RecipePrint = ({ meal }: RecipePrintProps) => {
  return (
    <div className="print-only instructions">
      <ul>
        {[...Array(20).keys()]
          .filter((num) => meal[`strIngredient${num}` as keyof Meal])
          .map((num) => (
            <li key={`Ingredients${num}`}>
              {meal[`strIngredient${num}` as keyof Meal]} -{" "}
              {meal[`strMeasure${num}` as keyof Meal]}
            </li>
          ))}
      </ul>
      <h5>Instructions</h5>
      <div>{meal.strInstructions}</div>
      <p>Printed by Le Cheffon Fat using The Meal DB (https://www.themealdb.com)</p>
    </div>
  );
};

export default RecipePrint;
