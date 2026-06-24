import { getMealPageUrl } from "@/service/meal-db-service";
import { Meal } from "@/types/meal-db";
import Link from "next/link";
import ShareButton from "../shareButton/ShareButton";

type RecipeCtasProps = {
  retryFn: () => void;
  meal: Meal | null;
  backHref?: string;
};

const RecipeCtas = ({ retryFn, meal, backHref }: RecipeCtasProps) => {
  const recipeUrl = meal ? getMealPageUrl(meal) : null;

  return (
    <div className="cta-container">
      {recipeUrl && (
        <Link
          href={recipeUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-primary"
        >
          View full recipe
        </Link>
      )}

      <Link href={backHref ?? "/page2"}>Back</Link>
      <button onClick={retryFn}>New idea</button>
      <ShareButton />
    </div>
  );
};

export default RecipeCtas;
