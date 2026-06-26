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
      calls.filter((c) =>
        filter.length === 0 ? filter : filter.includes(c.like),
      ),
    [calls, filter],
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
        <SortBy value={sort} onChange={setSort} />
      </div>

      {list.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul>
          {list.map((entry) => (
            <li key={entry.recipeId}>
              <Link href={`/recommendation/${entry.recipeId}`}>
                <RecipeImage
                  src={entry.imageUrl}
                  alt={entry.title}
                  width={100}
                  height={100}
                />
                <span>{entry.title}</span>
                <span>
                  {entry.inputs.category} — {entry.inputs.area}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link href="/" className={styles.back}>
        back to home
      </Link>
    </section>
  );
};

export default History;
