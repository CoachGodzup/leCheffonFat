"use client";

import { useState, useEffect } from "react";
import styles from "./search.module.css";

const MIN_SEARCH_TEXT_LENGTH = 3;

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    if (searchText.length > MIN_SEARCH_TEXT_LENGTH) {
      // call search
      // cache results
    }
  }, [searchText]);

  return (
    <section className={styles.page}>
      <h1>Search page</h1>
      <form>
        <fieldset>
          <legend>Recipe name:</legend>
          <input value={searchText} onChange={setSearchText}></input>
        </fieldset>
      </form>
      <nav></nav>
    </section>
  );
};

export default Search;
