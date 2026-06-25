"use client";

import { Suspense, useEffect } from "react";
import RecipeImage from "@/app/components/atoms/RecipeImage";
import Link from "next/link";
import { useStore } from "@/store";
import RecipeCtas from "@/components/recipeCtas/RecipeCtas";
import LikeDislikeCtas from "@/components/recipeCtas/likeDislikeCtas";
import type { Meal } from "@/types/meal-db";

type Props = {
  data: Meal | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  backHref?: string;
};

const RecommendationView = ({
  data: meal,
  isLoading,
  error,
  refetch,
  backHref = "/page2",
}: Props) => {
  const logRequest = useStore((s) => s.logRequest);
  const setLike = useStore((s) => s.setLike);

  useEffect(() => {
    if (meal) {
      logRequest({
        recipeId: meal.idMeal,
        title: meal.strMeal,
        imageUrl: meal.strMealThumb,
        inputs: { category: meal.strCategory, area: meal.strArea },
      });
    }
  }, [meal, logRequest]);

  if (error || !meal) {
    return (
      <section className="card">
        <h1>Recommendation</h1>
        <p role="alert">{error || "No meal found"}</p>
        <div className="ctaContainer">
          <Link href={backHref}>back</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="recipeContainer">
        <Suspense fallback={<p role="status">loading...</p>}>
          <div className="recipe">
            <RecipeImage
              src={meal.strMealThumb}
              alt={meal.strMeal}
              loading="eager"
              width={400}
              height={200}
            />
            <article>
              <h1>{meal.strMeal}</h1>
              <p>
                {meal.strCategory} — {meal.strArea}
              </p>
              <p>{meal.strTags}</p>
              <div className="print-only instructions">
                <ul>
                  {[...Array(20).keys()]
                    .filter((num) => meal[`strIngredient${num}`])
                    .map((num) => (
                      <li key={`Ingredients${num}`}>
                        {meal[`strIngredient${num}`] as string} -{" "}
                        {meal[`strMeasure${num}`]}
                      </li>
                    ))}
                </ul>
                <h5>Instructions</h5>
                <div className="print-only">{meal.strInstructions}</div>
              </div>
            </article>
          </div>
          <RecipeCtas
            retryFn={() => refetch()}
            meal={meal}
            backHref={backHref}
          />
        </Suspense>
        <LikeDislikeCtas likeFn={(like) => setLike(meal.idMeal, like)} />
      </div>
    </section>
  );
};

export default RecommendationView;
