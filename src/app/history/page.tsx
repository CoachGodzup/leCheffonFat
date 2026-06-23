"use client";

import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store";

const History = () => {
  const calls = useStore((s) => s.calls);

  return (
    <section>
      <h1>History</h1>
      {calls.length === 0 ? (
        <p>No history yet.</p>
      ) : (
        <ul>
          {calls.map((call) => (
            <li key={call.recipeId}>
              <Image
                src={call.imageUrl}
                alt={call.title}
                width={80}
                height={80}
              />
              <div>
                <strong>{call.title}</strong>
                <p>
                  {call.inputs.category} — {call.inputs.area}
                </p>
                <p>{new Date(call.timestamp).toLocaleString()}</p>
                {call.like !== null && <p>{call.like ? "👍" : "👎"}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link href="/">back to home</Link>
    </section>
  );
};

export default History;
