import { ChevronDown, ChevronUp } from "lucide-react";

import "./sortBy.css";

export type Sort = "asc" | "desc";

type SortByProps = {
  value: Sort;
  onChange: (sort: Sort) => void;
};

const SortBy = ({ value, onChange }: SortByProps) => {
  return (
    <button
      className="sortBy"
      onClick={() => onChange(value === "asc" ? "desc" : "asc")}
      aria-label={`Sort ${value === "asc" ? "descending" : "ascending"}`}
    >
      {value === "asc" ? (
        <ChevronUp size={20} aria-hidden="true" />
      ) : (
        <ChevronDown size={20} aria-hidden="true" />
      )}
    </button>
  );
};

export default SortBy;
