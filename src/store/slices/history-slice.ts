import { History } from "@/types/history";

export type HistorySlice = History & {
  logRequest: (data: History) => void;
  resetHistory: () => void;
};

export const createHistorySlice = (
  set: (partial: Partial<HistorySlice>) => void,
): HistorySlice => ({
  calls: [],
  logRequest: (data) => set({ calls: [data.calls[0], ...data.calls] }),
  resetHistory: () => set({ calls: [] }),
});
