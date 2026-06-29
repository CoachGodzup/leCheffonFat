# Homepage background

## Layers (dal basso verso l'alto)

| Layer | Z-index | File | Cosa fa |
|---|---|---|---|
| Checkered pattern | `-2` | `src/app/page.module.css` — `.pattern` | `repeating-conic-gradient` con `background-size: 128px` alterna colore/trasparente ogni 25%, creando quadrati 64×64. I colori vengono dalle variabili CSS `--color-check` in `globals.css`. |
| Animated icons | `-1` | `src/components/atoms/AnimatedIcons/` | 10 icone Lucide (tema cibo) posizionate su una griglia fissa di celle 64×64 che copre l'intera viewport. Ogni ~2.8s un tick sposta alcune icone in una cella adiacente (su/giù/sinistra/destra), con overshoot controllato da `cubic-bezier(0.34, 1.56, 0.64, 1)`. |
| Card | `auto` | `globals.css` — `.card` | Contenuto della homepage, flusso normale del DOM. Sta davanti a tutto grazie a `z-index: auto`. |

## AnimatedIcons — come funziona

### Grid

- `CELL = 64` — ogni cella della griglia è 64×64px
- Le dimensioni della griglia (`cols × rows`) vengono ricalcolate al resize
- Servono almeno 2×2 celle per far partire le icone

### Spawn

Quando le dimensioni della griglia cambiano, un `useEffect` genera 10 sprites:
- Ogni sprite ha un'icona casuale, una cella iniziale (col, row), un colore
- Le celle vengono assegnate senza sovrapposizioni

### Movimento

- Un `setInterval` ogni 2800ms lancia un'azione `move` al `useReducer`
- Ogni sprite ha 85% di probabilità di muoversi in quel tick
- Sceglie una delle 4 direzioni cardinali casualmente
- Se la cella di destinazione è già occupata (nel batch corrente), rimane fermo
- Se è libera, libera la sua cella attuale e occupa la nuova — tutto nello stesso `Array.map` per evitare conflitti nello stesso tick
- I limiti della griglia vengono rispettati con `clamp()`

### Render

- Ogni sprite è un `<div>` con `position: absolute` dentro un container `position: fixed; inset: 0; pointer-events: none`
- La posizione è gestita via CSS `translate(var(--x), var(--y))` con `transition: translate 1200ms cubic-bezier(...)`
- `aria-hidden="true"` perché è puramente decorativo

### Colori

Tre colori ciclati tra le icone, presi dalle variabili CSS del tema:
- `var(--color-lilac)`
- `var(--color-accent-yellow)`
- `var(--color-text-muted)`

Si adattano automaticamente al tema chiaro/scuro perché sono variabili CSS.
