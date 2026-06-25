// src/app/components/HistoryFilter.tsx
import { useState } from "react";
import Button from "./atoms/Button";
import { ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";

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
        text={
          <>
            <ThumbsUp size={16} style={{ marginInlineEnd: "0.35em" }} /> Liked
          </>
        }
      />
      <Button
        click={() => setActiveFilter({ type: "dislike" })}
        active={activeFilter.type === "dislike"}
        text={
          <>
            <ThumbsDown size={16} style={{ marginInlineEnd: "0.35em" }} />{" "}
            Disliked
          </>
        }
      />
      <Button
        click={() => setActiveFilter({ type: "none" })}
        active={activeFilter.type === "none"}
        text={
          <>
            <RefreshCw size={16} style={{ marginInlineEnd: "0.35em" }} /> None
          </>
        }
      />
    </div>
  );
};

export default HistoryFilter;
