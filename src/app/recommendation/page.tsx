"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { useRandomMeal } from "@/hooks/use-random-meal";

const Recommendation = () => {
  const router = useRouter();
  const { category, area } = useStore(
    useShallow((s) => ({
      category: s.category,
      area: s.area,
    })),
  );

  const { data, isLoading, error } = useRandomMeal(category, area);

  useEffect(() => {
    if (data) {
      const params = new URLSearchParams({ category, area });
      router.replace(`/recommendation/${data.idMeal}?${params}`);
    }
  }, [data, category, area, router]);

  if (error) {
    return (
      <section className="card">
        <h1>Recommendation</h1>
        <p role="alert">{error}</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="card">
        <h1>Recommendation</h1>
        <p role="status">Finding a recipe for you...</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h1>Recommendation</h1>
      <p>No meal found</p>
    </section>
  );
};

export default Recommendation;
