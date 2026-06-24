"use client";

import { useParams } from "next/navigation";
import { useMealById } from "@/hooks/use-meal-by-id";
import RecommendationView from "@/components/RecommendationView/RecommendationView";

const RecommendationById = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error, refetch } = useMealById(id);

  return (
    <RecommendationView
      data={data}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      backHref="/history"
    />
  );
};

export default RecommendationById;
