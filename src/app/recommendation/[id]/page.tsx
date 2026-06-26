"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

import RecommendationView from "@/components/organisms/RecommendationView/RecommendationView";
import { useMealById } from "@/hooks/use-meal-by-id";
import { getRandomMealByFilter } from "@/service/meal-db-service";
import { useStore } from "@/store";

const RecommendationById = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const calls = useStore((s) => s.calls);

  const { data, isLoading, error, refetch: refetchById } = useMealById(id);

  useEffect(() => {
    document.title = data
      ? `${data.strMeal} | Le Cheffon Fat`
      : "Recipe | Le Cheffon Fat";
  }, [data]);

  const historyEntry = useMemo(
    () => calls.find((c) => c.recipeId === id),
    [calls, id],
  );

  const category = useMemo(
    () =>
      searchParams.get("category") ||
      historyEntry?.inputs.category ||
      data?.strCategory ||
      "",
    [searchParams, historyEntry, data],
  );
  const area = useMemo(
    () =>
      searchParams.get("area") ||
      historyEntry?.inputs.area ||
      data?.strArea ||
      "",
    [searchParams, historyEntry, data],
  );

  const hasCriteria = Boolean(category && area);

  const handleNewIdea = useCallback(async () => {
    if (!hasCriteria) {
      refetchById();
      return;
    }
    try {
      const meal = await getRandomMealByFilter(category, area);
      if (!meal) throw new Error("No meal found");
      const params = new URLSearchParams({ category, area });
      router.push(`/recommendation/${meal.idMeal}?${params}`);
    } catch {
      /* user stays on current page */
    }
  }, [hasCriteria, category, area, refetchById, router]);

  const refetch = hasCriteria ? handleNewIdea : refetchById;

  return (
    <RecommendationView
      data={data}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
    />
  );
};

export default RecommendationById;
