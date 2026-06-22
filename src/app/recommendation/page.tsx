"use client";

import styles from "./recommendation.module.css";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { getRandomMealByFilter } from "@/service/meal-db-service";
import RecipeCtas from "@/components/recipeCtas/RecipeCtas";
import type { Meal } from "@/types/meal-db";
import { useEffect, useState } from "react";

const Recommendation = () => {
  const [meal, setMeal] = useState<Meal>();

  const [error, setError] = useState<string | null>(null);
  const { category, area } = useStore(
    useShallow((s) => ({
      category: s.category,
      area: s.area,
    })),
  );

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const meal = await getRandomMealByFilter(category, area);
        if (meal) {
          setMeal(meal);
        } else {
          throw new Error("No meal found");
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred");
      }
    };
    fetchMeal();
  }, [category, area]);

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

  const fetchRecipe = () => {
    setError(null);
  };

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
        <RecipeCtas retryFn={fetchRecipe} meal={meal}></RecipeCtas>
      </div>
    </section>
  );
};

export default Recommendation;
