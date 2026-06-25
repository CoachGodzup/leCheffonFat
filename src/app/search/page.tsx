"use client";

import styles from "./search.module.css";
import { useSearch } from "@/hooks/use-search";
import SearchResults from "@/app/components/SearchResults";

const Search = () => {
  const { searchText, setSearchText, meals, isLoading, error, isActive } =
    useSearch();

  return (
    <section className={styles.page}>
      <h1>Search page</h1>
      <form>
        <fieldset>
          <legend>Recipe name:</legend>
          <label htmlFor="recipe-name">Recipe name</label>
          <input
            id="recipe-name"
            className={styles.search}
            value={searchText}
            onChange={(elm) => setSearchText(elm.target.value)}
          />
        </fieldset>
      </form>
      <div>
        {isActive && isLoading && <p>loading...</p>}
        {isActive && error && <p>An error occurred: {error}.</p>}
        {isActive && !isLoading && !error && (!meals || meals.length === 0) && (
          <p>No meals found.</p>
        )}
        {meals && meals.length > 0 && <SearchResults meals={meals} />}
      </div>
    </section>
  );
};

export default Search;
