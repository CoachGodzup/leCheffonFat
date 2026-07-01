# Store (Zustand)

```csv
File,Description
src/store/index.ts,"Composes FormSlice + HistorySlice into a single zustand store with persist middleware (localStorage). Exports useStore."
src/store/slices/form-slice.ts,"Form state { category, area }, actions setPage1, setPage2, resetForm"
src/store/slices/history-slice.ts,"History state { calls[] }, actions logRequest, resetHistory, remove(recipeId), setLike(recipeId, like)"
src/store/notification-store.ts,"Notification state { toasts[] }, actions addToast(message, type?), removeToast(id). Not persisted."
```
