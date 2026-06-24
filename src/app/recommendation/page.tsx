"use client";

import { useStore } from "@/store";
import { useShallow } from "zustand/shallow";
import { useRandomMeal } from "@/hooks/use-random-meal";
import RecommendationView from "@/components/RecommendationView/RecommendationView";

const Recommendation = () => {
  const { category, area } = useStore(
    useShallow((s) => ({
      category: s.category,
      area: s.area,
    })),
  );

  const { data, isLoading, error, refetch } = useRandomMeal(category, area);

  return (
    <RecommendationView
      data={data}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      backHref="/page2"
    />
  );
};

export default Recommendation;
