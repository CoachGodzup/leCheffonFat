import { getMealPageUrl } from "@/service/meal-db-service";
import { Meal } from "@/types/meal-db";
import Link from "next/link";

import ShareButton from "../shareButton/ShareButton";

type RecipeCtasProps = {
  retryFn: () => void;
  meal: Meal | null;
  onBack?: () => void;
};

const RecipeCtas = ({ retryFn, meal, onBack }: RecipeCtasProps) => {
  const recipeUrl = meal ? getMealPageUrl(meal) : null;

  return (
    <div className="cta-container">
      <button onClick={onBack} aria-label="Back to previous page">
        Back
      </button>
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

      <button onClick={retryFn} aria-label="Get a new recipe idea">
        New idea
      </button>
      <button onClick={() => window.print()} aria-label="Print this recipe">
        Print
      </button>
      <ShareButton />
    </div>
  );
};

export default RecipeCtas;
