// src/app/components/HistoryFilter.tsx
import { useState } from "react";
import Button from "./atoms/Button";

interface FilterType {
  type: "like" | "dislike" | "none";
}

const HistoryFilter = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>({
    type: "none",
  });

  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
      <Button
        click={() => setActiveFilter({ type: "like" })}
        active={activeFilter.type === "like"}
        text="👍 Liked"
      />
      <Button
        click={() => setActiveFilter({ type: "dislike" })}
        active={activeFilter.type === "dislike"}
        text="👎 Disliked"
      />
      <Button
        click={() => setActiveFilter({ type: "none" })}
        active={activeFilter.type === "none"}
        text="🔄 None"
      />
    </div>
  );
};

export default HistoryFilter;
