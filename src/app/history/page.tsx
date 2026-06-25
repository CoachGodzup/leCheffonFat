"use client";

import styles from "./history.module.css";
import { useStore } from "@/store";
import Link from "next/link";
import { useState, useMemo } from "react";
import CheckboxFilter from "@/app/components/atoms/CheckboxFilter";
import SortBy from "@/app/components/atoms/SortBy";
import List from "@/app/components/List";
import type { Sort } from "@/app/components/atoms/SortBy";

const FILTER_OPTIONS = [
  { value: true, label: "Liked 👍" },
  { value: false, label: "Disliked 👎" },
  { value: null, label: "Unrated" },
] as const;

const History = () => {
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
        <p className={styles.empty}>No history yet.</p>
      ) : (
        <List
          entries={list.sort((a, b) =>
            sort === "asc"
              ? a.timestamp - b.timestamp
              : b.timestamp - a.timestamp,
          )}
        />
      )}

      <Link href="/" className={styles.back}>
        back to home
      </Link>
    </section>
  );
};

export default History;
