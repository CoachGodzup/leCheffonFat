import Link from "next/link";
import { getRandomMeal } from "@/service/meal-db-service";
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
      <section>
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
    <section>
      <h1>Recommendation</h1>

      <div className="recipeContainer">
        <div className="recipe">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            width={600}
            height={400}
          />
          <h3>{meal.strMeal}</h3>
          <p>{meal.idMeal}</p>
          <p>{meal.strTags}</p>
        </div>
        <div className="ctaContainer">
          <Link href="/page2">back</Link>
          <Link href="/">go to home</Link>
        </div>
      </div>
    </section>
  );
};

export default Recommendation;
