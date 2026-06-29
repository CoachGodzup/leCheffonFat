"use client";

import type { LucideIcon } from "lucide-react";
import {
  Apple,
  Cake,
  ChefHat,
  Citrus,
  Coffee,
  Cookie,
  Croissant,
  Pizza,
  Soup,
  Utensils,
} from "lucide-react";
import { useEffect, useReducer, useRef } from "react";

import styles from "./AnimatedIcons.module.css";

const FOOD_ICONS: LucideIcon[] = [
  ChefHat,
  Utensils,
  Pizza,
  Coffee,
  Apple,
  Croissant,
  Cake,
  Cookie,
  Soup,
  Citrus,
];

const CELL = 64;
const ICON_COUNT = 10;
const MOVE_INTERVAL = 2800;
const TRANSITION_MS = 1200;
const COLORS = [
  "var(--color-lilac)",
  "var(--color-accent-yellow)",
  "var(--color-text-muted)",
];

interface Sprite {
  id: number;
  Icon: LucideIcon;
  col: number;
  row: number;
  color: string;
}

interface Grid {
  cols: number;
  rows: number;
}

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

const cellKey = (c: number, r: number) => `${c},${r}`;

const buildOccupied = (sprites: Sprite[]) => {
  const set = new Set<string>();
  for (const s of sprites) set.add(cellKey(s.col, s.row));
  return set;
};

type Action =
  | { type: "spawn"; sprites: Sprite[] }
  | { type: "move"; grid: Grid };

const reducer = (state: Sprite[], action: Action): Sprite[] => {
  switch (action.type) {
    case "spawn": {
      return action.sprites;
    }
    case "move": {
      const { cols, rows } = action.grid;
      const occupied = buildOccupied(state);
      return state.map((s) => {
        if (Math.random() < 0.15) return s;
        const dir = randomInt(0, 3);
        const dirs = [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ] as const;
        const [dc, dr] = dirs[dir]!;
        const nc = clamp(s.col + dc, 0, cols - 1);
        const nr = clamp(s.row + dr, 0, rows - 1);
        const key = cellKey(nc, nr);
        if (occupied.has(key)) return s;
        occupied.delete(cellKey(s.col, s.row));
        occupied.add(key);
        return { ...s, col: nc, row: nr };
      });
    }
  }
};

const AnimatedIcons = () => {
  const [sprites, dispatch] = useReducer(reducer, []);
  const gridRef = useRef<Grid>({ cols: 0, rows: 0 });

  /* sync grid changes + animation tick */
  const [gridState, setGridState] = useReducer(
    (
      prev: { cols: number; rows: number },
      next: { cols: number; rows: number },
    ) => next,
    { cols: 0, rows: 0 },
  );

  useEffect(() => {
    const measure = () => {
      const cols = Math.floor(globalThis.innerWidth / CELL);
      const rows = Math.floor(globalThis.innerHeight / CELL);
      gridRef.current = { cols, rows };
      setGridState({ cols, rows });
    };
    measure();
    globalThis.addEventListener("resize", measure);
    return () => globalThis.removeEventListener("resize", measure);
  }, []);

  /* respawn when grid changes */
  useEffect(() => {
    if (gridState.cols < 2 || gridState.rows < 2) return;
    const occupied = new Set<string>();
    const next: Sprite[] = [];
    for (let i = 0; i < ICON_COUNT; i++) {
      for (let attempt = 0; attempt < 50; attempt++) {
        const c = randomInt(0, gridState.cols - 1);
        const r = randomInt(0, gridState.rows - 1);
        if (!occupied.has(cellKey(c, r))) {
          occupied.add(cellKey(c, r));
          next.push({
            id: i,
            Icon: FOOD_ICONS[i % FOOD_ICONS.length],
            col: c,
            row: r,
            color: COLORS[i % COLORS.length],
          });
          break;
        }
      }
    }
    dispatch({ type: "spawn", sprites: next });
  }, [gridState]);

  /* periodic movement */
  useEffect(() => {
    if (sprites.length === 0) return;
    const id = setInterval(() => {
      dispatch({ type: "move", grid: gridState });
    }, MOVE_INTERVAL);
    return () => clearInterval(id);
  }, [sprites.length, gridState]);

  if (sprites.length === 0) return null;

  return (
    <div className={styles.container} aria-hidden="true">
      {sprites.map(({ id, Icon, col, row, color }) => (
        <div
          key={id}
          className={styles.sprite}
          style={
            {
              "--x": `${col * CELL}px`,
              "--y": `${row * CELL}px`,
              transitionDuration: `${TRANSITION_MS}ms`,
              color,
            } as React.CSSProperties
          }
        >
          <Icon size={32} strokeWidth={1.5} />
        </div>
      ))}
    </div>
  );
};

export default AnimatedIcons;
