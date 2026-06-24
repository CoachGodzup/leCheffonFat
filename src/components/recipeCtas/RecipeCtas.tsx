import { Meal } from "@/types/meal-db";
import Link from "next/link";
import ShareButton from "../shareButton/ShareButton";

type RecipeCtasProps = {
  retryFn: () => void;
  meal: Meal | null;
  backHref?: string;
};

const RecipeCtas = ({ retryFn, meal, backHref }: RecipeCtasProps) => (
  <div className="cta-container">
    {meal && meal.strSource && (
      <Link href={meal.strSource} target="_blank" rel="noreferrer noopener">
        go to source
      </Link>
    )}

    <Link href={backHref ?? "/page2"}>back</Link>
    <button onClick={retryFn}>Retry</button>
    <ShareButton />
  </div>
);

export default RecipeCtas;
