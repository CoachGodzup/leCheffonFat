"use client";

import Link from "next/link";
import { useEffect } from "react";
import styles from "./search.module.css";
import { useSearch } from "@/hooks/use-search";
import RecipeImage from "@/app/components/atoms/RecipeImage";

const Search = () => {
  useEffect(() => {
    document.title = "Search Recipes | Le Cheffon Fat";
  }, []);

  const { searchText, setSearchText, meals, isLoading, error, isActive } =
    useSearch();

  return (
    <section className={styles.page}>
      <h1>Search page</h1>
      <form>
        <fieldset className={styles.fieldset}>
          {" "}
          <legend>Recipe name</legend>
          <input
            id="recipe-name"
            type="search"
            aria-label="Recipe name"
            className={styles.search}
            value={searchText}
            onChange={(elm) => setSearchText(elm.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
          <button type="submit" style={{ display: "none" }}>
            Search
          </button>
        </fieldset>
      </form>
      <div role="status" aria-live="polite">
        {isActive && isLoading && <p>loading...</p>}
        {isActive && error && <p role="alert">An error occurred: {error}.</p>}
        {isActive && !isLoading && !error && (!meals || meals.length === 0) && (
          <p>No meals found.</p>
        )}
        {meals && meals.length > 0 && (
          <ul>
            {meals.map((meal) => (
              <li key={meal.idMeal}>
                <Link href={`/recommendation/${meal.idMeal}`}>
                  <RecipeImage
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={100}
                    height={100}
                  />
                  <span>{meal.strMeal}</span>
                  <span>
                    {meal.strCategory} — {meal.strArea}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Search;
