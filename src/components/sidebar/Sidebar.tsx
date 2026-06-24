"use client";

import styles from "./sidebar.module.css";
import { useStore } from "@/store";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useShallow } from "zustand/shallow";
import CheckboxFilter from "@/app/components/atoms/CheckboxFilter";

const FILTER_OPTIONS = [
  { value: true, label: "Liked 👍" },
  { value: false, label: "Disliked 👎" },
  { value: null, label: "Unrated" },
] as const;

const Sidebar = () => {
  const [filter, setFilter] = useState<(boolean | null)[]>([]);

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

  return (
    <aside role="navigation" className={styles.menu}>
      <h2>History</h2>
      <CheckboxFilter
        legend="Filter by rating"
        options={[...FILTER_OPTIONS]}
        value={filter}
        onChange={setFilter}
      />
      <ul className={styles.entryList}>
        {list.map((entry) => (
          <li key={entry.timestamp} className={styles.entry}>
            <p>
              ({new Date(entry.timestamp).toLocaleDateString()}){" "}
              {entry.like ? "👍" : entry.like === false ? "👎" : ""}
              <Link href={`/recommendation/${entry.recipeId}`}>
                {entry.title}
              </Link>
              ({entry.inputs.category} - {entry.inputs.area})
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
