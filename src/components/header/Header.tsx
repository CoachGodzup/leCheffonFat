import Link from "next/link";
import styles from "./header.module.css";

const Header = () => (
  <header className={styles.header}>
    <Link href="/" title="Le Cheffon Fat" className={styles.homeLink}>
      🧑‍🍳 Le Cheffon Fat
    </Link>
  </header>
);

export default Header;
