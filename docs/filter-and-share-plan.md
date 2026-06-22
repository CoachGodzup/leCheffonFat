# Piano: filtri TheMealDB + condivisione + storico

## Stato attuale

- `category` e `area` salvati in **Zustand store** (form-slice), persistiti su localStorage
- `getRandomMeal()` ignora i filtri
- `filterByCategory(category)` e `filterByArea(area)` esistono già
- `getRandomMealByFilter(category, area)` creata (funzionale): chiama `filter.php?c=...`, filtra `strArea` lato client, random, `lookup.php` per dettagli
- **ShareButton** (`src/components/shareButton/ShareButton.tsx`) integrato in recommendation page
- TheMealDB **non supporta** `filter.php?c=X&a=Y` combinati, ma `filter.php?c=X` include già `strArea`

---

## Passi da fare

### 1. `src/app/recommendation/page.tsx` → client component

Legge filtri da **Zustand** (flusso form) o `mealId` da **URL search params** (condivisione).

```
arrivo da page2
  → leggi category/area da Zustand
  → getRandomMealByFilter(cat, area)
  → router.replace(/recommendation?mealId=52802)
  → addToHistory(meal)

[Rifai]
  → getRandomMealByFilter(cat, area)     [stessi filtri]
  → router.replace(/recommendation?mealId=...)   [nuovo id]

arrivo con URL condiviso (?mealId=52802)
  → searchParams.mealId presente
  → getMealById(mealId)     [salta Zustand]
  → addToHistory(meal)

[Condividi]
  → copia URL corrente (include mealId)
```

### 2. `src/app/page2/page.tsx`

Niente query params — Zustand basta. Link semplice a `/recommendation`.

### 3. `src/store/slices/history-slice.ts` — nuovo slice

```ts
type HistoryEntry = {
  meal: Meal;
  recommendedAt: string; // ISO timestamp
  liked: boolean | null; // futuro like/dislike
};

type HistorySlice = {
  history: HistoryEntry[];
  addToHistory: (meal: Meal) => void;
  clearHistory: () => void;
};
```

In `src/store/index.ts`: aggiungi al persist esistente (`global-store`).

Chiamato automaticamente ogni volta che recommendation mostra un nuovo meal (evita duplicati per `idMeal`).

### 4. Test

- Aggiornare `test/pages/recommendation.test.tsx`
- Test per history-slice

---

## Flusso finale

```
page1 (category + area)                  → Zustand
  → page2                                → Zustand
    → /recommendation                    → Zustand + API → mostra meal
      → aggiorna URL con ?mealId=52802
      → addToHistory(meal)

[Rifai]    → nuova chiamata, stessi filtri, nuovo mealId in URL
[Condividi] → copia URL (/recommendation?mealId=52802)
da link    → ?mealId presente → getMealById → addToHistory

/history   → (futuro) lista da history-slice con like/dislike
```
