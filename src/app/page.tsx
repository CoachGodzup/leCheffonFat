import Link from "next/link";
import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home | Le Cheffon Fat",
};

export default function Home() {
  return (
    <div className="card">
      <section>
        <div className={styles.hero}>
          <h1>Welcome to LeCheffonFat</h1>
          <p>Your personal helper when you don&apos;t know what to cook</p>
        </div>
      </section>
      <nav className="cta-container" aria-label="Main navigation">
        <Link href="/page1">Inspire me!</Link>
        <Link href="/search">Search</Link>
        <Link href="/history">Last recipes</Link>
      </nav>
    </div>
  );
}
