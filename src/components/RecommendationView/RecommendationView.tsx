"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store";
import RecipeCtas from "@/components/recipeCtas/RecipeCtas";
import LikeDislikeCtas from "@/components/recipeCtas/likeDislikeCtas";
import type { Meal } from "@/types/meal-db";
import styles from "./RecommendationView.module.css";

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

  if (isLoading) {
    return (
      <section className="card">
        <h1>Recommendation</h1>
        <p>loading...</p>
        <div className="ctaContainer">
          <Link href={backHref}>back</Link>
        </div>
      </section>
    );
  }

  if (error || !meal) {
    return (
      <section className="card">
        <h1>Recommendation</h1>
        <p>{error || "No meal found"}</p>
        <div className="ctaContainer">
          <Link href={backHref}>back</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="card">
      <h1>Recommendation</h1>

      <div className="recipeContainer">
        <div className="recipe">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            loading="eager"
            width={400}
            height={200}
          />
          <div>
            <h3>{meal.strMeal}</h3>
            <p>{meal.idMeal}</p>
            <p>Category: {meal.strCategory}</p>
            <p>Area: {meal.strArea}</p>
            <p>Tags: {meal.strTags}</p>
            <div className={styles.recipe}>{meal.strInstructions}</div>
          </div>
        </div>
        <RecipeCtas retryFn={() => refetch()} meal={meal} backHref={backHref} />
        <LikeDislikeCtas likeFn={(like) => setLike(meal.idMeal, like)} />
      </div>
    </section>
  );
};

export default RecommendationView;
