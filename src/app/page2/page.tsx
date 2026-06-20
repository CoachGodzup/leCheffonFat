import Link from "next/link";

const page2 = () => (
  <section>
    <h1>page 2</h1>
    <Link href="/page1">back</Link>
    <Link href="/recommendation">complete</Link>
  </section>
);

export default page2;
