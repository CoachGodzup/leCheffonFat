"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import CheckboxFilter from "@/components/atoms/CheckboxFilter/CheckboxFilter";
import RecipeImage from "@/components/atoms/RecipeImage/RecipeImage";
import SortBy from "@/components/atoms/SortBy/SortBy";
import type { Sort } from "@/components/atoms/SortBy/SortBy";
import { useStore } from "@/store";

import styles from "./history.module.css";

const FILTER_OPTIONS = [
  {
    value: true,
    label: (
      <>
        <ThumbsUp
          size={16}
          style={{ marginInlineEnd: "0.35em" }}
          aria-hidden="true"
        />{" "}
        Liked
      </>
    ),
  },
  {
    value: false,
    label: (
      <>
        <ThumbsDown
          size={16}
          style={{ marginInlineEnd: "0.35em" }}
          aria-hidden="true"
        />{" "}
        Disliked
      </>
    ),
  },
  { value: null, label: "Unrated" },
];

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
            <li key={entry.recipeId} className={styles.result}>
              <Link href={`/recommendation/${entry.recipeId}`}>
                <RecipeImage
                  src={entry.imageUrl}
                  alt={entry.title}
                  width={300}
                  height={110}
                />
                <nav role="contentinfo">
                  <h4>{entry.title}</h4>
                  <p>
                    {entry.inputs.category} — {entry.inputs.area}
                  </p>
                </nav>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default History;
