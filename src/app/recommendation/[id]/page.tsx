"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

  const category =
    searchParams.get("category") ||
    historyEntry?.inputs.category ||
    data?.strCategory ||
    "";
  const area =
    searchParams.get("area") ||
    historyEntry?.inputs.area ||
    data?.strArea ||
    "";

  const hasCriteria = Boolean(category && area);

  const [newIdeaError, setNewIdeaError] = useState<string | null>(null);
  const fetchingRef = useRef(false);

  const handleNewIdea = useCallback(async () => {
    if (fetchingRef.current) return;
    if (!hasCriteria) {
      refetchById();
      return;
    }
    fetchingRef.current = true;
    setNewIdeaError(null);
    try {
      const meal = await getRandomMealByFilter(category, area);
      if (!meal) throw new Error("No meal found");
      const params = new URLSearchParams({ category, area });
      router.push(`/recommendation/${meal.idMeal}?${params}`);
    } catch {
      setNewIdeaError("No new recipe found for these criteria");
    } finally {
      fetchingRef.current = false;
    }
  }, [hasCriteria, category, area, refetchById, router]);

  const refetch = hasCriteria ? handleNewIdea : refetchById;
  const displayError = error || newIdeaError;

  return (
    <RecommendationView
      data={data}
      isLoading={isLoading}
      error={displayError}
      refetch={refetch}
    />
  );
};

export default RecommendationById;
