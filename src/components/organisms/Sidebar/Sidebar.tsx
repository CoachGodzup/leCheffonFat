"use client";

import { usePathname } from "next/navigation";
import styles from "./sidebar.module.css";
import { useStore } from "@/store";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useShallow } from "zustand/shallow";
import CheckboxFilter from "@/components/atoms/CheckboxFilter/CheckboxFilter";
import SortBy from "@/components/atoms/SortBy/SortBy";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";

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

import type { Sort } from "@/components/atoms/SortBy/SortBy";

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
                <div>
                  <h3>
                    {entry.like ? (
                      <ThumbsUp
                        size={16}
                        style={{ marginInlineEnd: "0.35em" }}
                        aria-hidden="true"
                      />
                    ) : entry.like === false ? (
                      <ThumbsDown
                        size={16}
                        style={{ marginInlineEnd: "0.35em" }}
                        aria-hidden="true"
                      />
                    ) : null}
                    {entry.title}
                  </h3>
                  <p>
                    {`${new Date(entry.timestamp).toLocaleDateString()} - ${entry.inputs.category} ${entry.inputs.area}`}
                  </p>
                </div>
              </Link>
              <button
                type="button"
                className={styles.close}
                onClick={() => remove(entry.recipeId)}
                aria-label={`Remove ${entry.title} from history`}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
