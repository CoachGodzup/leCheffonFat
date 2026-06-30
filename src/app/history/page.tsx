"use client";

import { useEffect, useMemo, useState } from "react";

import CheckboxFilter from "@/components/atoms/CheckboxFilter/CheckboxFilter";
import SortBy from "@/components/atoms/SortBy/SortBy";
import type { Sort } from "@/components/atoms/SortBy/SortBy";
import RecipeCard from "@/components/molecules/RecipeCard/RecipeCard";
import { FILTER_OPTIONS } from "@/constants/filter-options";
import { useStore } from "@/store";

import styles from "./history.module.css";

const History = () => {
  useEffect(() => {
    document.title = "History | Le Cheffon Fat";
  }, []);

  const calls = useStore((s) => s.calls);
  const [filter, setFilter] = useState<(boolean | null)[]>([]);
  const [sort, setSort] = useState<Sort>("asc");

  const list = useMemo(
    () =>
      calls
        .filter((c) => (filter.length === 0 ? filter : filter.includes(c.like)))
        .sort((a, b) =>
          sort === "asc"
            ? a.timestamp - b.timestamp
            : b.timestamp - a.timestamp,
        ),
    [calls, filter, sort],
  );

  return (
    <section className={styles.page}>
      <h1>History</h1>

      <div className={styles.controls}>
        <CheckboxFilter
          legend="Filter by rating"
          options={[...FILTER_OPTIONS]}
          value={filter}
          onChange={setFilter}
        />
        <div>
          <SortBy value={sort} onChange={setSort} />
        </div>
      </div>

      {list.length === 0 ? (
        <div>
          <div>
            <p>No meals found.</p>
          </div>
        </div>
      ) : (
        <ul className={styles.resultsContainer}>
          {list.map((entry) => (
            <RecipeCard
              key={entry.recipeId}
              id={entry.recipeId}
              title={entry.title}
              imageUrl={entry.imageUrl}
              category={entry.inputs.category}
              area={entry.inputs.area}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default History;
