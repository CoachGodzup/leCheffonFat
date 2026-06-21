import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="card">
      <section>
        <div className={styles.hero}>
          <h1>Welcome to LeCheffonFat</h1>
          <h1>
            <small>
              Your personal helper when you don&apos;t know what to cook
            </small>
          </h1>
        </div>
      </section>
      <section>
        <p>content</p>
      </section>
      <nav className="cta-container">
        <Link href="/page1">Go to form</Link>
      </nav>
    </div>
  );
}
