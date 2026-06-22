import styles from "./recommendation.module.css";
import Link from "next/link";
import Image from "next/image";
import { getRandomMeal } from "@/service/meal-db-service";
import ShareButton from "@/components/shareButton/ShareButton";
import type { Meal } from "@/types/meal-db";

const Recommendation = async () => {
  let meal: Meal | null = null;
  let error: string | null = null;

  try {
    const response = await getRandomMeal();
    if (response.meals) {
      meal = response.meals[0];
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "An unknown error occurred";
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
        <div className="cta-container">
          <Link href={meal.strSource} target="_blank" rel="noreferrer noopener">
            go to source
          </Link>
          <Link href="/page2">back</Link>
          <Link href="/">go to home</Link>
          <ShareButton />
        </div>
      </div>
    </section>
  );
};

export default Recommendation;
