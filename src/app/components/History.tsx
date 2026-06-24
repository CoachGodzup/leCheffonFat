// src/app/components/History.tsx
import { useState } from "react";
import HistoryFilter from "./HistoryFilter";

interface HistoryData {
  id: number;
  title: string;
  likes?: number;
  dislikes?: number;
}

const History = ({ data: initialData }: { data: HistoryData[] }) => {
  const [historyData] = useState<HistoryData[]>(initialData);

  return (
    <div>
      <HistoryFilter />
      <ul>
        {historyData.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;
