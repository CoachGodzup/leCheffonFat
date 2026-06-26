import styles from "./footer.module.css";
import Link from "next/link";
import { Utensils } from "lucide-react";

const Footer = () => (
  <footer className={styles.footer}>
    <p>
      Made with{" "}
      <Utensils
        size={16}
        style={{ marginInlineEnd: "0.35em" }}
        aria-hidden="true"
      />{" "}
      by <Link href="https://github.com/CoachGodzup">Matteo Garza</Link>
    </p>
  </footer>
);

export default Footer;
