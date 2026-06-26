import { ChefHat } from "lucide-react";
import Link from "next/link";

import styles from "./header.module.css";

const Header = () => (
  <header className={styles.header}>
    <Link
      href="/"
      title="Le Cheffon Fat"
      aria-label="Le Cheffon Fat - Home"
      className={styles.homeLink}
    >
      <ChefHat
        size={28}
        style={{ marginInlineEnd: "0.35em" }}
        aria-hidden="true"
      />{" "}
      Le Cheffon Fat
    </Link>
  </header>
);

export default Header;
