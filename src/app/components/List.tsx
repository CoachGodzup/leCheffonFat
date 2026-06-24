// src/app/components/List.tsx
import History from "./History";
import HistoryFilter from "./HistoryFilter";

const data: { id: number; title: string; likes?: number; dislikes?: number }[] =
  [];

const List = () => {
  return (
    <div className="p-4">
      <HistoryFilter />
      <History data={data} />
    </div>
  );
};

export default List;
