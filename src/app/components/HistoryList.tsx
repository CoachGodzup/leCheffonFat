import styles from "./HistoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import type { Call } from "@/types/history";

interface ListProps {
  entries: Call[];
}

const HistoryList = ({ entries }: ListProps) => {
  return (
    <ul className={styles.grid}>
      {entries.map((entry) => (
        <li key={entry.timestamp} className={styles.card}>
          <Link href={`/recommendation/${entry.recipeId}`}>
            <div className={styles.imageWrapper}>
              <Image
                src={entry.imageUrl}
                alt={entry.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.image}
              />
            </div>
            <div className={styles.cardBody}>
              <strong>
                {entry.like ? "👍 " : entry.like === false ? "👎 " : "  "}
                {entry.title}
              </strong>
              <p>
                {entry.inputs.category} — {entry.inputs.area}
              </p>
              <p className={styles.date}>
                {new Date(entry.timestamp).toLocaleDateString()}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HistoryList;
