import RecipeImage from "@/components/atoms/RecipeImage/RecipeImage";
import { Meal } from "@/types/meal-db";

import styles from "./RecipePrint.module.css";

type RecipePrintProps = {
  meal: Meal;
};

type IngredientListProps = RecipePrintProps;
type InstructionProps = RecipePrintProps;

const Instruction = ({ meal }: InstructionProps) => (
  <div className={styles.instructionText}>
    <h2>Instructions</h2>
    <div>{meal.strInstructions}</div>
  </div>
);

const IngredientList = ({ meal }: IngredientListProps) => (
  <ul className={styles.ingredientList}>
    {[...Array.from({ length: 20 }).keys()]
      .filter((num) => meal[`strIngredient${num}` as keyof Meal])
      .map((num) => (
        <li key={`Ingredients${num}`}>
          {meal[`strIngredient${num}` as keyof Meal]} -{" "}
          {meal[`strMeasure${num}` as keyof Meal]}
        </li>
      ))}
  </ul>
);

export const RecipePrint = ({ meal }: RecipePrintProps) => {
  return (
    <article className={styles.article}>
      <div className={styles.instructions}>
        <div className={styles.imageWrapper}>
          <RecipeImage
            src={meal.strMealThumb}
            alt={meal.strMeal}
            loading="eager"
            width={400}
            height={200}
          />
        </div>
        <IngredientList meal={meal} />
      </div>
      <Instruction meal={meal} />
      <p className={styles.footer}>
        Printed by Le Cheffon Fat using The Meal DB (https://www.themealdb.com)
      </p>
    </article>
  );
};

export default RecipePrint;
