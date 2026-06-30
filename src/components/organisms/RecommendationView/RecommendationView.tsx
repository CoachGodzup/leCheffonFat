"use client";

import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

import LikeDislikeCtas from "@/components/molecules/RecipeCtas/LikeDislikeCtas";
import RecipeCtas from "@/components/molecules/RecipeCtas/RecipeCtas";
import RecipePrint from "@/components/molecules/RecipePrint/RecipePrint";
import { useStore } from "@/store";
import type { Meal } from "@/types/meal-db";

import styles from "./recommendationView.module.css";

type Props = {
  data: Meal | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

const isMeal = (meal?: unknown): boolean => {
  return !!(meal && typeof meal === "object" && "idMeal" in meal);
};

const RecommendationView = ({
  data: meal,
  isLoading,
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

  if (isLoading) {
    return (
      <section className="card full-page">
        <h1>Recommendation</h1>
        <p role="status">Loading recipe...</p>
      </section>
    );
  }

  if (error || !meal || !isMeal(meal)) {
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
    <section className="card full-page">
      <h1>{meal.strMeal}</h1>
      <p>
        {meal.strCategory} — {meal.strArea}
      </p>
      <p>{meal.strTags}</p>
      <div className={styles.recipeContainer}>
        <Suspense fallback={<p role="status">loading...</p>}>
          <div className={styles.recipe}>
            <RecipePrint meal={meal}></RecipePrint>
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
