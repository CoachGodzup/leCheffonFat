import Link from "next/link";

const Page2 = () => (
  <section className="card">
    <h1>page 2</h1>
    <div className="cta-container">
      <Link href="/page1">back</Link>
      <Link href="/recommendation">complete</Link>
    </div>
  </section>
);

export default Page2;
