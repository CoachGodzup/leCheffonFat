import "../styles/atoms/sortBy.css";
import { ChevronUp, ChevronDown } from "lucide-react";

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
      {value === "asc" ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  );
};

export default SortBy;
