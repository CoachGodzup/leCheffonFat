1. Architettura — Wizard a due step
   Perché hai separato la selezione categoria e area in due pagine (/page1 → /page2) invece di farle in una sola? E perché usi react-hook-form per un form con un solo campo?
2. Store — Persist custom
   Nello store (src/store/index.ts:9-31) hai un wrapper persistStorage con try-catch su ogni operazione. Perché? Quali scenari gestisce?
3. Hook generico useApi
   In src/hooks/use-api.ts usi useRef per salvare il fetcher e poi lo chiami dentro un useEffect. Perché non chiamare fetcher direttamente? E perché c'è una flag cancelled?
4. Servizio composabile
   In meal-db-service.ts:74-84 la funzione getRandomMealByFilter compone funzioni pure con .then(). Quali vantaggi ha rispetto a fare tutto in una funzione sola? E cosa succede se pickRandom restituisce null?
5. Risoluzione dei criteri di ricerca
   In recommendation/[id]/page.tsx:30-45 risolvi category e area da 3 fonti in ordine di priorità. Perché questa gerarchia? In che scenario servono 3 fonti diverse?
6. Error handling
   In handleNewIdea (recommendation/[id]/page.tsx:54-62) il catch è vuoto. È intenzionale? Perché non mostri un errore all'utente?
7. Sidebar e layout
   In layout.tsx la Sidebar è renderizzata lato server, ma è un componente interattivo (filtri, like). Come funziona? Non dovrebbe essere "use client"?
8. Mock mode
   In meal-db-service.ts:15-17, quando USE_MOCK è true, fai un import() dinamico. Perché dinamico invece che statico? Che impatto ha sul bundle?
9. TypeScript — Meal type
   In types/meal-db.ts:23-41 hai una union type Index da 1 a 20 per i campi ingrediente/misura. Perché non usare un array? È una scelta voluta o un compromesso con l'API?
10. Accessibilità
    Nel WCAG report (docs/wcag-report.md) ci sono 20 issue. Quale pensi sia la più critica e come la risolveresti?
