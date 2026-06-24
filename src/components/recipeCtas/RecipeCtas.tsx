import { Meal } from "@/types/meal-db";
import Link from "next/link";
import ShareButton from "../shareButton/ShareButton";

type RecipeCtasProps = {
  retryFn: () => void;
  meal: Meal | null;
};

const RecipeCtas = ({ retryFn, meal }: RecipeCtasProps) => (
  <div className="cta-container">
    {meal && meal.strSource && (
      <Link href={meal.strSource} target="_blank" rel="noreferrer noopener">
        go to source
      </Link>
    )}

    <Link href="/page2">back</Link>
    <button onClick={retryFn}>Retry</button>
    <ShareButton />
  </div>
);

export default RecipeCtas;
