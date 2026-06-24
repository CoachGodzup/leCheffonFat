"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store";

type SortKey = "asc" | "desc";
type FilterKey = "liked" | "disliked" | "unknown";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "liked", label: "👍 Liked" },
  { key: "disliked", label: "👎 Disliked" },
  { key: "unknown", label: "? Unknown" },
];

const History = () => {
  const calls = useStore((s) => s.calls);
  const [filters, setFilters] = useState<Set<FilterKey>>(new Set());
  const [sort, setSort] = useState<SortKey>("asc");

  const toggle = (key: FilterKey) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleSort = () => {
    setSort(sort === "asc" ? "desc" : "asc");
  };

  const matches = (like: boolean | null): boolean => {
    if (filters.size === 0) return true;
    if (like === true && filters.has("liked")) return true;
    if (like === false && filters.has("disliked")) return true;
    if (like === null && filters.has("unknown")) return true;
    return false;
  };

  const filtered = calls.filter((c) => matches(c.like));

  return (
    <section>
      <h1>History</h1>

      <fieldset>
        <legend>Filter</legend>
        {FILTERS.map(({ key, label }) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={filters.has(key)}
              onChange={() => toggle(key)}
            />
            {label}
          </label>
        ))}
      </fieldset>
      <fieldset>
        <legend>Sort</legend>
        <label key="sort">
          <input
            type="checkbox"
            checked={sort === "asc"}
            onChange={() => toggleSort()}
          />
          <button onChange={toggleSort}>{sort === "asc" ? "🔼" : "🔽"}</button>
          <span></span>
        </label>
      </fieldset>

      {filtered.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul>
          {filtered
            .sort((a, b) =>
              a.timestamp > b.timestamp && sort === "asc" ? 1 : -1,
            )
            .map((call) => (
              <li key={call.recipeId}>
                <Link href={`/recommendation/${call.recipeId}`}>
                  <Image
                    src={call.imageUrl}
                    alt={call.title}
                    width={80}
                    height={80}
                  />
                  <div>
                    <strong>{call.title}</strong>
                    <p>
                      {call.inputs.category} — {call.inputs.area}
                    </p>
                    <p>{new Date(call.timestamp).toLocaleString()}</p>
                    {call.like !== null && <p>{call.like ? "👍" : "👎"}</p>}
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      )}
      <Link href="/">back to home</Link>
    </section>
  );
};

export default History;
