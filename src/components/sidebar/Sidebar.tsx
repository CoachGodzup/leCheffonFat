"use client";

import styles from "./sidebar.module.css";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";

const Sidebar = () => {
  const { calls } = useStore(
    useShallow((s) => ({
      calls: s.calls,
    })),
  );

  return (
    <aside role="navigation" className={styles.menu}>
      <h2>History</h2>
      <ul>
        {calls.map((entry) => (
          <li key={entry.timestamp}>
            <p>
              ({new Date(entry.timestamp).toLocaleDateString()}) {entry.title}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
