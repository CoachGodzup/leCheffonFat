"use client";

import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import { useStore } from "@/store";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useShallow } from "zustand/shallow";
import CheckboxFilter from "@/app/components/atoms/CheckboxFilter";
import SortBy from "@/app/components/atoms/SortBy";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";

const FILTER_OPTIONS = [
  {
    value: true,
    label: (
      <>
        <ThumbsUp size={16} style={{ marginInlineEnd: "0.35em" }} /> Liked
      </>
    ),
  },
  {
    value: false,
    label: (
      <>
        <ThumbsDown size={16} style={{ marginInlineEnd: "0.35em" }} /> Disliked
      </>
    ),
  },
  { value: null, label: "Unrated" },
];

import type { Sort } from "@/app/components/atoms/SortBy";

const HIDE_PATHS = ["/"];

const Sidebar = () => {
  const pathname = usePathname();
  const [filter, setFilter] = useState<(boolean | null)[]>([]);
  const [sort, setSort] = useState<Sort>("asc");

  const { calls, remove } = useStore(
    useShallow((s) => ({
      calls: s.calls,
      remove: s.remove,
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
            sort === "desc"
              ? a.timestamp - b.timestamp
              : b.timestamp - a.timestamp,
          )
          .map((entry) => (
            <li key={entry.timestamp} className={styles.entry}>
              <Link href={`/recommendation/${entry.recipeId}`}>
                <h4>
                  {entry.like ? (
                    <ThumbsUp size={16} style={{ marginInlineEnd: "0.35em" }} />
                  ) : entry.like === false ? (
                    <ThumbsDown
                      size={16}
                      style={{ marginInlineEnd: "0.35em" }}
                    />
                  ) : null}
                  {entry.title}
                </h4>
                <p>
                  {`${new Date(entry.timestamp).toLocaleDateString()} - ${entry.inputs.category} ${entry.inputs.area}`}
                </p>
                <p>
                  <X onClick={() => remove(entry.recipeId)} />
                </p>
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
