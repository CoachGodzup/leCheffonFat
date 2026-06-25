import styles from "./SearchResults.module.css";
import Link from "next/link";
import Image from "next/image";
import type { Meal } from "@/types/meal-db";

interface SearchResultsProps {
  meals: Meal[];
}

const SearchResults = ({ meals }: SearchResultsProps) => {
  return (
    <ul className={styles.grid}>
      {meals.map((meal) => (
        <li key={meal.idMeal} className={styles.card}>
          <Link href={`/recommendation/${meal.idMeal}`}>
            <div className={styles.imageWrapper}>
              <Image
                src={meal.strMealThumb}
                alt={meal.strMeal}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </div>
            <div className={styles.cardBody}>
              <strong>{meal.strMeal}</strong>
              <p>
                {meal.strCategory} — {meal.strArea}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
