"use client";

import styles from "./history.module.css";
import { useStore } from "@/store";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import CheckboxFilter from "@/app/components/atoms/CheckboxFilter";
import SortBy from "@/app/components/atoms/SortBy";
import HistoryList from "@/app/components/HistoryList";
import type { Sort } from "@/app/components/atoms/SortBy";
import { ThumbsUp, ThumbsDown } from "lucide-react";

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
        <p className={styles.empty}>No history yet.</p>
      ) : (
        <HistoryList
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
