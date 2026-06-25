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
          <legend>Recipe name</legend>
          <input
            id="recipe-name"
            type="search"
            aria-label="Recipe name"
            className={styles.search}
            value={searchText}
            onChange={(elm) => setSearchText(elm.target.value)}
          />
        </fieldset>
      </form>
      <div role="status" aria-live="polite">
        {isActive && isLoading && <p>loading...</p>}
        {isActive && error && <p role="alert">An error occurred: {error}.</p>}
        {isActive && !isLoading && !error && (!meals || meals.length === 0) && (
          <p>No meals found.</p>
        )}
        {meals && meals.length > 0 && <SearchResults meals={meals} />}
      </div>
    </section>
  );
};

export default Search;
