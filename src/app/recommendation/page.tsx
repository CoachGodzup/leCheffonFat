import Link from "next/link"

const recommendation = () => (
    <section>
        <h1>Recommendation</h1>
        <Link href="/page2">back</Link>
        <Link href="/">go to home</Link>
    </section>
)

export default recommendation