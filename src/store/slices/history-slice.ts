import type { Call } from "@/types/history";
import type { History } from "@/types/history";

export type HistorySlice = History & {
  logRequest: (data: Omit<Call, "timestamp" | "like">) => void;
  resetHistory: () => void;
  remove: (recipeId: string) => void;
  setLike: (recipeId: string, like: boolean) => void;
};

export const createHistorySlice = (
  set: (partial: Partial<HistorySlice>) => void,
  get: () => HistorySlice,
  _api: unknown,
): HistorySlice => ({
  calls: [],
  logRequest: (data) => {
    const state = get();
    if (state.calls.some((c) => c.recipeId === data.recipeId)) return;
    set({
      calls: [{ ...data, timestamp: Date.now(), like: null }, ...state.calls],
    });
  },
  resetHistory: () => set({ calls: [] }),
  remove: (recipeId: string) => {
    const state = get();
    set({
      calls: [...state.calls.filter((c) => c.recipeId !== recipeId)],
    });
  },
  setLike: (recipeId, like) => {
    const state = get();
    set({
      calls: state.calls.map((c) =>
        c.recipeId === recipeId ? { ...c, like } : c,
      ),
    });
  },
});
