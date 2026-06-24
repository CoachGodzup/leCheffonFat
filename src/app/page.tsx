import Link from "next/link";
import styles from "./page.module.css";

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
      </nav>
    </div>
  );
}
