"use client";

import { SearchIcon } from "lucide-react";
import { useEffect } from "react";

import RecipeCard from "@/components/molecules/RecipeCard/RecipeCard";
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
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={styles.fieldset}>
          <label htmlFor="recipe-name">Recipe name</label>
          <div className={styles.inputContainer}>
            <SearchIcon></SearchIcon>
            <input
              id="recipe-name"
              type="search"
              className={styles.search}
              value={searchText}
              onChange={(elm) => setSearchText(elm.target.value)}
            />
          </div>
        </div>
      </form>
      <div role="status">
        {isActive && isLoading && <p>loading...</p>}
        {isActive && error && <p role="alert">An error occurred: {error}.</p>}
        {isActive && !isLoading && !error && (!meals || meals.length === 0) && (
          <p>No meals found.</p>
        )}
        {meals && meals.length > 0}
        {typeof meals === "object" && (
          <ul className={styles.resultsContainer}>
            {meals.map((meal) => (
              <RecipeCard
                key={meal.idMeal}
                id={meal.idMeal}
                title={meal.strMeal}
                imageUrl={meal.strMealThumb}
                category={meal.strCategory}
                area={meal.strArea}
                tags={meal.strTags}
              />
            ))}
          </ul>
        )}
        {typeof meals === "string" && <p>A problem occurred: {meals}</p>}
      </div>
    </section>
  );
};

export default Search;
