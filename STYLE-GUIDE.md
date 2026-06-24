# Stylistic Refinement — Le Cheffon Fat

## Palette

```
--color-lilac:        #a89fdf  (header/footer bg, accenti)
--color-lilac-light:  #c8c1eb  (hover, bordi)
--color-lilac-dark:   #7b6fb8  (testo su header chiaro)
--color-bg:           #f7f5fb  (sfondo pagina — più morbido di salvia)
--color-surface:      #ffffff  (card, sidebar items)
--color-text:         #1e1b2e  (testo principale)
--color-text-muted:   #7c7899  (testo secondario)
--color-accent:       #f4c430  (CTA, highlights)
--color-success:      #4caf7d  (like)
--color-error:        #e56b6b  (dislike/dislike)
```

Usa `--color-*` in `globals.css`, light/dark via `prefers-color-scheme`.

---

## Header

Ora: link nudo con font-size, sfondo lilac piatto.

**Suggerimenti:**

- `padding: 0 1.5em` orizzontale, centro verticale con flexbox
- `border-bottom: 1px solid` con opacità (es. `rgb(255 255 255 / 0.2)`) per separazione
- Home link con `font-weight: 600`, letter-spacing leggero
- Altezza fissa `56px` (invece di `3em`) per consistenza

---

## Footer

Ora: solo centrato, nessun bordo superiore, attaccato al contenuto.

**Suggerimenti:**

- `border-top: 1px solid` (colore variabile, opaco)
- Stessa altezza dell'header (56px) per simmetria
- Testo più piccolo (`0.875em`), muted
- Padding laterale allineato all'header

---

## Sidebar

Ora: padding minimo, lista piatta, nessuna gerarchia.

**Suggerimenti:**

- Intestazione "History" con `font-size: 1.125em`, padding, `border-bottom` sottile
- Ogni entry come "card" compatta: `padding: 0.5em 0.75em`, `border-radius: 8px`, `background: var(--color-surface)`, `margin-bottom: 0.25em`
- Hover: `background` leggermente più scuro, `transform: translateX(2px)`
- Link dentro l'entry in `font-weight: 500` col colore primario
- Filtri (CheckboxFilter) con `display: flex; gap: 0.5em; flex-wrap: wrap;`
- Scroll solo per la lista, non per il titolo/filtri (`overflow-y: auto` sul contenitore lista)

---

## Card (globale `.card`)

Ora: `width: 66%; min-height: 33vh` — orrendo su schermi grandi/piccoli.

**Da rimuovere/correggere:**

- `main:has(.card)` flex + centering → rimuovi o limitane l'impatto
- `.card` → togli `width` e `min-height` fissi; lascia `max-width: 600px` + `margin: 2em auto` per centratura morbida
- Se vuoi card a larghezza piena dentro il main, usa `width: 100%` di default
- `padding: 2rem` per più respiro

---

## Bottoni / CTA

Ora: stile applicato globalmente a `a, button` con `border-radius: 20px`.

**Suggerimenti:**

- `border-radius: 10px` invece di 20px (più moderno e meno "pill")
- Transizione su `background-color` oltre che `transform`
- Colore CTA primario: `--color-accent` con testo scuro
- Colore secondario: outline / ghost button per azioni meno importanti (back)
- Padding verticale `0.625em`, orizzontale `1.25em`
- `font-weight: 600`, dimensione `0.9375em`

---

## Form

Ora: stili globali su `form` e `section` che invadono tutto.

**Suggerimenti:**

- Sposta gli stili di `form` e `section` fuori da `globals.css` (o rendili più specifici)
- Label in `font-weight: 500`, `font-size: 0.9375em`, `margin-bottom: 0.25em`
- Select/input con `padding: 0.75em 1em`, `border-radius: 8px`, `border: 1px solid #d4d0e0`
- Focus: `outline: 2px solid var(--color-lilac)` con `outline-offset: 1px`
- Messaggio di errore in rosso, `font-size: 0.8125em`, con icona opzionale

---

## Recommendation view

Ora: le classi `recipeContainer`, `recipe`, `ctaContainer` (camelCase) non esistono in globals.css — il layout è rotto.

**Suggerimenti:**

- Definisci `recipeContainer` come `display: grid`, `grid-template-columns: 1fr` su mobile, `300px 1fr` su schermi larghi
- Definisci `ctaContainer` in camelCase (o meglio, unifica tutto in kebab-case)
- Immagine: `border-radius: 12px`, `object-fit: cover`
- Istruzioni della ricetta: `line-height: 1.7`, `font-size: 0.9375em`, colonna stretta (`max-width: 65ch`)

---

## Responsive

**Suggerimenti:**

- Aggiungi un breakpoint `max-width: 768px`:
  - Sidebar sotto il main (invece che affiancata)
  - Grid columns da `1fr 3fr` → `1fr`
  - Card senza margini laterali
- Usa `clamp()` per font-size: es. `font-size: clamp(1.5rem, 4vw, 2.5rem)` per h1

---

## Micro-interazioni

- Tutti i bottoni/link cliccabili: `transition: all 0.2s ease`
- Card hover: `box-shadow` leggermente più pronunciato, `translateY(-2px)`
- Sidebar entry hover: `translateX(3px)` + cambio background

---

## Ordine dei lavori suggerito

1. `globals.css` — rimuovi i vincoli di `.card` e i layout globali invasivi (`form`, `section`)
2. `header.module.css` — rifinisci padding, bordi, allineamento
3. `footer.module.css` — bordo superiore, simmetria con header
4. `sidebar.module.css` — entry-card, hover, gerarchia
5. Aggiungi classi mancanti in `globals.css` per recommendation
6. `FormSelect.module.css` — rifinisci select
7. Breakpoint responsive per mobile
8. Micro-interazioni
