import { Utensils } from "lucide-react";
import Link from "next/link";

import pkg from "@/../package.json";

import styles from "./footer.module.css";

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
    <p className={styles.version}>v{pkg.version}</p>
  </footer>
);

export default Footer;
