import { useState } from "react";

import { searchMealsByName } from "@/service/meal-db-service";
import { MealSearchResponse } from "@/types/meal-db";

import { useApi } from "./use-api";
import { useDebounce } from "./use-debounce";

const SEARCH_DELAY = 300;
const MIN_CHAR_FOR_SEARCH = 3;

export const useSearch = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, SEARCH_DELAY);
  const isActive = debouncedSearchText.length >= MIN_CHAR_FOR_SEARCH;

  const { data, isLoading, error } = useApi<MealSearchResponse>(
    () => searchMealsByName(debouncedSearchText),
    [debouncedSearchText],
  );

  return {
    searchText,
    setSearchText,
    meals: isActive ? (data?.meals ?? []) : [],
    isLoading: isActive && isLoading,
    error: isActive ? error : null,
    isActive,
  };
};
