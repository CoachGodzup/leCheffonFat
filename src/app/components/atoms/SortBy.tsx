import "../styles/atoms/sortBy.css";
import { ArrowUp, ArrowDown } from "lucide-react";

export type Sort = "asc" | "desc";

interface SortByProps {
  value: Sort;
  onChange: (sort: Sort) => void;
}

const SortBy = ({ value, onChange }: SortByProps) => {
  return (
    <button
      className="sortBy"
      onClick={() => onChange(value === "asc" ? "desc" : "asc")}
      aria-label={`Sort ${value === "asc" ? "descending" : "ascending"}`}
    >
      {value === "asc" ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
    </button>
  );
};

export default SortBy;
