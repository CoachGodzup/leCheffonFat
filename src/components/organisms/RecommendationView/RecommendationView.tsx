"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

import RecipeImage from "@/components/atoms/RecipeImage/RecipeImage";
import LikeDislikeCtas from "@/components/molecules/RecipeCtas/LikeDislikeCtas";
import RecipeCtas from "@/components/molecules/RecipeCtas/RecipeCtas";
import RecipePrint from "@/components/molecules/RecipePrint/RecipePrint";
import { useStore } from "@/store";
import type { Meal } from "@/types/meal-db";

type Props = {
  data: Meal | null;
  _isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

const RecommendationView = ({
  data: meal,
  _isLoading,
  error,
  refetch,
}: Props) => {
  const router = useRouter();
  const logRequest = useStore((s) => s.logRequest);
  const setLike = useStore((s) => s.setLike);
  const currentLike = useStore(
    (s) => s.calls.find((c) => c.recipeId === meal?.idMeal)?.like ?? null,
  );

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
      <section className="card full-page">
        <h1>Recommendation</h1>
        <p role="alert">{error || "No meal found"}</p>
        <div className="cta-container">
          <button onClick={() => router.back()}>back</button>
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
              <RecipePrint meal={meal}></RecipePrint>
            </article>
          </div>
          <LikeDislikeCtas
            likeFn={(like) => setLike(meal.idMeal, like)}
            currentLike={currentLike}
          />
          <RecipeCtas
            retryFn={() => refetch()}
            meal={meal}
            onBack={() => router.back()}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default RecommendationView;
