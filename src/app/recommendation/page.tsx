"use client";

import styles from "./recommendation.module.css";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";
import RecipeCtas from "@/components/recipeCtas/RecipeCtas";
import { useRandomMeal } from "@/hooks/use-random-meal";

const Recommendation = () => {
  const { category, area } = useStore(
    useShallow((s) => ({
      category: s.category,
      area: s.area,
    })),
  );

  const {
    data: meal,
    isLoading,
    error,
    refetch,
  } = useRandomMeal(category, area);

  if (isLoading) {
    return (
      <section className="card">
        <h1>Recommendation</h1>
        <p>loading...</p>
        <div className="ctaContainer">
          <Link href="/page2">back</Link>
          <Link href="/">go to home</Link>
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
          <Link href="/page2">back</Link>
          <Link href="/">go to home</Link>
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
        <RecipeCtas retryFn={() => refetch()} meal={meal} />
      </div>
    </section>
  );
};

export default Recommendation;
