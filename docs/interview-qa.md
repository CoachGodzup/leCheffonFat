# Le Cheffon Fat — Domande & Risposte per Colloquio

## Architettura e Design

### 1. Perché due pagine separate per il wizard invece di una sola?

Separa le responsabilità: ogni pagina ha un obiettivo unico (scegliere categoria → scegliere area), rende il codice più facile da testare e mantiene l'URL navigabile. `react-hook-form` è usato anche per un solo campo perché fornisce validazione (`required`), errore handling, e si scala facilmente se il form cresce. Inoltre normalizza lo stato del form rispetto allo store globale (Zustand).

### 2. Il wrapper `persistStorage` con try-catch — cosa gestisce?

Gestisce 3 scenari:

1. **SSR** — `localStorage` non esiste nel server
2. **Modalità privacy/incognito** — alcuni browser lanciano eccezioni su `localStorage`
3. **Test** — ambiente dove `localStorage` potrebbe non essere implementato

Senza try-catch, l'app crasherebbe all'avvio in questi contesti. Il pattern è una best practice per Zustand + persist in Next.js.

### 3. `useRef` + flag `cancelled` in `useApi` — perché servono?

`useRef` evita lo **stale closure problem**: l'`useEffect` gira su `deps`, ma il `fetcher` potrebbe cambiare senza far ripartire l'effetto (dipende da come viene usato). Il ref garantisce di chiamare sempre la versione più recente della funzione.

La flag `cancelled` previene **setState su componente smontato** — se l'effetto viene ripulito prima che la fetch termini (es. navigazione), lo stato non viene aggiornato, evitando il warning "Can't perform a React state update on an unmounted component".

### 4. Composizione con `.then()` nella service layer

Ogni step della pipeline `getRandomMealByFilter` è una **funzione pura**:

- `extractMeals`, `byArea`, `pickRandom` sono testabili isolatamente senza mockare API
- La pipeline è **dichiarativa**: leggi la catena e capisci subito il flusso
- **Cortocircuito naturale**: se `pickRandom` riceve array vuoto, torna `null` e la catena si ferma (ternario `meal ? fetchFullMeal(meal) : null`)

### 5. Tre fonti per category/area in ordine di priorità

Nel componente `recommendation/[id]/page.tsx`:

1. **URL search params** (`?category=X&area=Y`) — per bookmark/share diretti
2. **History nello store** — quando torni su un recipe già visto senza params
3. **Dati del meal** (`strCategory`, `strArea`) — fallback finale

Serve perché lo stesso `[id]` può essere raggiunto da 3 percorsi diversi: wizard completo, cronologia, o URL diretto/digitato.

## Error Handling e Edge Case

### 6. Catch vuoto in `handleNewIdea` — è un bug?

Sì, è un **bug UX**. Se `getRandomMealByFilter` torna `null` (nessuna ricetta matcha i criteri), il catch non fa nulla. L'utente clicca "New idea" e non succede niente, senza alcun feedback. La fix: aggiungere uno stato locale `newIdeaError` che mostra un messaggio "No new recipe found for these criteria", resettato a ogni nuovo tentativo.

### 7. URL params non validi — crash?

`getRandomMealByFilter("FakeCat", "FakeArea")` chiama `filterByCategory("FakeCat")` → TheMealDB torna `{ meals: null }` → `extractMeals torna []` → filtri su array vuoto = `[]` → `pickRandom` = `null` → funzione torna `null`. L'app mostra "No meal found". **Non crasha**, ma l'utente non capisce perché. Una validazione con feedback esplicito sarebbe meglio.

### 8. Race condition su click multipli "New idea"

Ogni click avvia una fetch. Senza AbortController o flag, le risposte possono arrivare in ordine diverso — l'ultima risposta ricevuta sovrascrive lo stato, che potrebbe essere quella di una richiesta **più vecchia**. Soluzioni:

1. `AbortController` per cancellare la fetch precedente
2. Flag ref (`fetchingRef`) che impedisce chiamate concorrenti
3. Counter incrementale con controllo sul numero corrente

Nel codice è stata implementata la soluzione 2: un `useRef(false)` controllato all'inizio di `handleNewIdea` e resettato nel `finally`.

## Performance e Ottimizzazione

### 9. Caching nelle API calls

La funzione `request()` non ha alcuna cache. Ogni navigazione tra `/page1` e `/page2` causa un refetch di categorie/aree. Migliorie possibili:

- **Server-side**: usare il `fetch` cache di Next.js con `next: { revalidate: 3600 }` nel proxy
- **Client**: custom hook con `useRef` cache + TTL
- **React Query / TanStack Query**: cache automatica con stale-while-revalidate

### 10. `useMemo` su category/area — è utile?

Il `useMemo` in `recommendation/[id]/page.tsx` dipendeva da `data` (oggetto Meal), che **cambia identità a ogni fetch**. Quindi il memo veniva ricalcolato quasi sempre, diventando overhead inutile. È stato rimosso: `category` e `area` sono ora calcolate direttamente a ogni render. `historyEntry` invece ha mantenuto `useMemo` perché `calls` (da Zustand) cambia riferimento solo quando la cronologia viene modificata.

### 11. `useShallow` — perché è importante?

Senza `useShallow`, `useStore((s) => ({ a, b }))` crea un **nuovo oggetto a ogni render dello store**, causando re-render del componente anche se `a` e `b` non cambiano. `useShallow` fa una comparazione superficiale dei valori, non dell'oggetto wrapper. Differenza tra "render per reference change" e "render per value change".

### 12. `import()` dinamico per il mock — perché?

Permette di **escludere il modulo mock dal bundle di produzione**. Con `import()` dinamico, il chunk mock viene caricato solo quando `NEXT_PUBLIC_MOCK_API=1`. In produzione, `USE_MOCK` è `false`, il ramo non viene eseguito e il chunk mock non viene mai scaricato. Con un import statico, il tree-shaking potrebbe non bastare.

## Next.js e Routing

### 13. Proxy server-side — perché non chiamare TheMealDB direttamente?

Risolve 3 problemi:

1. **CORS** — il browser blocca richieste cross-origin da localhost a TheMealDB
2. **API key nascosta** — anche se la key è "1" (pubblica), è buona pratica mantenerla lato server
3. **Centralizzazione** — se l'API cambia URL, formato, o aggiungi autenticazione, modifichi solo il proxy

### 14. Sidebar in layout server ma interattiva

La Sidebar è importata in `layout.tsx` (server component), ma essendo un componente interattivo con `useStore`, deve dichiarare `"use client"`. Next.js 16 gestisce la cosa automaticamente: se un componente figlio è client, lo tratta come tale. Lo stato dei filtri (liked/disliked, sorting) è probabilmente locale (`useState`), quindi **non persiste tra navigazioni** — la Sidebar si smonta e rimonta a ogni cambio pagina.

### 15. `reset({ category })` in useEffect — perché?

Serve per sincronizzare lo stato interno di `react-hook-form` con lo store globale. `defaultValue` del form viene valutato solo al primo mount. Se l'utente torna da Page2 con una categoria già selezionata nello store, senza `reset` il form mostrerebbe il vecchio valore. La combo `reset` in `useEffect` è il pattern standard per form controllati esternamente.

## TypeScript e Tipi

### 16. Union type `Index` (1-20) per ingredienti — perché non array?

È un compromesso diretto con la struttura API di TheMealDB, che restituisce `strIngredient1`, `strIngredient2`, ... `strIngredient20` come **campi separati** (non array). La union type garantisce type safety: puoi accedere solo a indici validi (1-20). Un array sarebbe più comodo ma richiederebbe una transform a runtime. È una scelta che riflette fedelmente il formato API a costo di verbosità.

### 17. `isLoading` — come viene gestito?

`RecommendationView` riceve `isLoading` come prop e mostra uno stato di caricamento (`role="status"`) durante il fetch iniziale. In una versione precedente il prop si chiamava `_isLoading` con underscore (convenzione per "non usato ma riservato"), ma è stato fixato rimuovendo l'underscore e implementando il loading state effettivo.

## Testing

### 18. `mock-fetch.ts` con type cast — è sufficiente?

Il test funziona finché il codice chiama solo `.ok` e `.json()`. Se chiama `.headers`, `.clone()`, `.text()`, o `.status`, fallisce a runtime perché non sono veri oggetti `Response`. Una implementazione più robusta userebbe `new Response(JSON.stringify(data), { status })`. Attualmente nel progetto il mock fetch viene usato per testare il route handler API.

### 19. Come testeresti `getRandomMealByFilter`?

Con i test unitari:

1. **Mock `filterByCategory`** per restituire array di meal con diverse `strArea`
2. Test che con area matching, torna un meal valido
3. Test che con area non matching, torna `null`
4. Test con `oldId` identico a un meal — verifica che non venga selezionato
5. `pickRandom` è pura — testata separatamente con array vuoto e non vuoto

## CSS e Design

### 20. Dark mode first — e `prefers-color-scheme: no-preference`?

I colori base (`:root`) sono i colori **dark**, e il `@media (prefers-color-scheme: light)` contiene gli override per light. Per utenti con `no-preference`, vengono applicati i colori default = dark. È una scelta di design voluta: il tema scuro è prioritario (coerenza con il tema "notte/chef"). Le variabili CSS tipo `--color-bg` con default scuro lo confermano.

### 21. `RecipePrint` — componente separato per la stampa

Usa un CSS `@media print` per mostrarsi solo in stampa, nascondendo bottoni, immagini e elementi non necessari. È separato perché la vista stampa ha una struttura diversa: ingredienti in colonna, layout lineare, niente immagini pesanti. Separare permette HTML semantico per stampa senza condizionali nell'HTML principale.

### 22. Remote patterns per Next/Image — configurato?

Next/Image richiede `remotePatterns` in `next.config.ts` per domini esterni, altrimenti blocca le richieste in produzione. Il progetto ha una configurazione per `www.themealdb.com` (confermato dalla struttura del progetto). Se mancasse, le immagini non verrebbero renderizzate.

## State Management

### 23. `logRequest` su rimonta del componente — duplicati?

La deduplica in `history-slice.ts:19` controlla solo `recipeId`. Se lo stesso ID viene loggato due volte (es. rimonta per cambio route), il secondo viene ignorato. Corretto se vuoi una sola entry per recipe. Ma se "New idea" restituisce la stessa ricetta (raro ma possibile con pochi risultati), la seconda viene persa — probabilmente voluto per non duplicare in cronologia.

### 24. Sidebar: stato filtri perso su navigazione

Lo stato dei filtri (liked/disliked/unrated, ordinamento) è probabilmente locale alla Sidebar (`useState`). Navigando tra pagine, la Sidebar si smonta e rimonta, perdendo i filtri. Se si vuole persistenza, i filtri dovrebbero:

- Andare nello store globale (Zustand), oppure
- Essere codificati in URL search params

### 25. `setPage1` vs `setPage2` — perché separati?

Ogni step del wizard ha il suo setter perché lo stato viene validato e salvato progressivamente. `setPage1` salva `{ category }`, `setPage2` salva `{ area }`. Separarli permette di:

- Validare ogni step indipendentemente
- Mantenere traccia di quale step è stato completato
- Reset parziale (es. se l'utente cambia categoria, l'area va resettata)
