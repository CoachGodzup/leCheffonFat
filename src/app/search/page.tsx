"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import RecipeImage from "@/components/atoms/RecipeImage/RecipeImage";
import { useSearch } from "@/hooks/use-search";

import styles from "./search.module.css";

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
          <div className={styles.inputContainer}>
            <SearchIcon></SearchIcon>
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
          </div>
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
          <ul className={styles.resultsContainer}>
            {meals.map((meal) => (
              <li key={meal.idMeal} className={styles.result}>
                <Link href={`/recommendation/${meal.idMeal}`}>
                  <RecipeImage
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    width={300}
                    height={110}
                  />
                  <nav role="contentinfo">
                    <h4>{meal.strMeal}</h4>
                    <p>
                      {meal.strCategory} — {meal.strArea}
                    </p>
                    <p>{meal.strTags}</p>
                  </nav>
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
