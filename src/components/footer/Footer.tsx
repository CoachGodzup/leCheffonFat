import styles from "./footer.module.css";
import Link from "next/link";

const Footer = () => (
  <footer className={styles.footer}>
    <p>
      Made with 🥄 by{" "}
      <Link href="https://github.com/CoachGodzup">Matteo Garza</Link>
    </p>
  </footer>
);

export default Footer;
