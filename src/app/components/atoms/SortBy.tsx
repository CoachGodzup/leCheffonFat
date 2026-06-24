import "../styles/atoms/sortBy.css";

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
      {value === "asc" ? "🔼" : "🔽"}
    </button>
  );
};

export default SortBy;
