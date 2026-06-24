"use client";

import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import { useStore } from "@/store";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useShallow } from "zustand/shallow";
import CheckboxFilter from "@/app/components/atoms/CheckboxFilter";
import SortBy from "@/app/components/atoms/SortBy";

const FILTER_OPTIONS = [
  { value: true, label: "Liked 👍" },
  { value: false, label: "Disliked 👎" },
  { value: null, label: "Unrated" },
] as const;

import type { Sort } from "@/app/components/atoms/SortBy";

const HIDE_PATHS = ["/"];

const Sidebar = () => {
  const pathname = usePathname();
  const [filter, setFilter] = useState<(boolean | null)[]>([]);
  const [sort, setSort] = useState<Sort>("asc");

  const { calls } = useStore(
    useShallow((s) => ({
      calls: s.calls,
    })),
  );

  const list = useMemo(
    () =>
      calls.filter((c) =>
        filter.length === 0 ? filter : filter.includes(c.like),
      ),
    [calls, filter],
  );

  if (HIDE_PATHS.includes(pathname)) return null;

  return (
    <aside aria-labelledby="sidebar-heading" className={styles.menu}>
      <nav>
        <h2 id="sidebar-heading">History</h2>
        <CheckboxFilter
          legend="Filter by rating"
          options={[...FILTER_OPTIONS]}
          value={filter}
          onChange={setFilter}
        />
        <SortBy value={sort} onChange={setSort} />
      </nav>
      <ul className={styles.entryList}>
        {list
          .sort((a, b) =>
            sort === "asc"
              ? a.timestamp - b.timestamp
              : b.timestamp - a.timestamp,
          )
          .map((entry) => (
            <li key={entry.timestamp} className={styles.entry}>
              <Link href={`/recommendation/${entry.recipeId}`}>
                <h4>
                  {entry.like ? "👍 " : entry.like === false ? "👎 " : "  "}
                  {entry.title}
                </h4>
                <p>
                  {`${new Date(entry.timestamp).toLocaleDateString()} - ${entry.inputs.category} ${entry.inputs.area}`}
                </p>
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
