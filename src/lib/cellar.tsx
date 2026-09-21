'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { MemberSession } from './session';

/**
 * The reader's own cellar.
 *
 * Saved bottles, the list for later, and tasting notes live in the browser for
 * now, because there is no account system to attach them to yet. That is a real
 * limitation and the Cellar chapter says so on the page rather than implying
 * these notes are stored with us.
 */

export interface TastingNote {
  wineSlug: string;
  /** ISO date. */
  on: string;
  text: string;
  /** 1–5, the reader's own. Never shown to anyone else. */
  rating?: number;
}

export interface CellarState {
  saved: string[];
  later: string[];
  notes: TastingNote[];
  /** Wine slug → bottles. A trial basket; nothing is reserved or charged. */
  cart: Record<string, number>;
}

const EMPTY: CellarState = { saved: [], later: [], notes: [], cart: {} };
const KEY = 'nv.cellar.v1';

interface CellarApi extends CellarState {
  ready: boolean;
  memberStatus: MemberSession['status'];
  isSaved: (slug: string) => boolean;
  isLater: (slug: string) => boolean;
  toggleSaved: (slug: string) => void;
  toggleLater: (slug: string) => void;
  addNote: (note: TastingNote) => void;
  removeNote: (wineSlug: string, on: string) => void;
  cartCount: number;
  setCartQuantity: (slug: string, bottles: number) => void;
  emptyCart: () => void;
  clear: () => void;
}

const CellarContext = createContext<CellarApi | null>(null);

function read(): CellarState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<CellarState>;
    return {
      saved: Array.isArray(parsed.saved) ? parsed.saved.filter((s) => typeof s === 'string') : [],
      later: Array.isArray(parsed.later) ? parsed.later.filter((s) => typeof s === 'string') : [],
      notes: Array.isArray(parsed.notes) ? (parsed.notes as TastingNote[]) : [],
      cart:
        parsed.cart && typeof parsed.cart === 'object' && !Array.isArray(parsed.cart)
          ? (parsed.cart as Record<string, number>)
          : {},
    };
  } catch {
    return EMPTY;
  }
}

export function CellarProvider({
  children,
  memberStatus,
}: {
  children: React.ReactNode;
  memberStatus: MemberSession['status'];
}) {
  const [state, setState] = useState<CellarState>(EMPTY);
  const [ready, setReady] = useState(false);

  /* Hydrate after mount: the server has no idea what is in this cellar, and
     rendering it on the server would produce a hydration mismatch. */
  useEffect(() => {
    setState(read());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* quota or private mode — the cellar just will not persist */
    }
  }, [state, ready]);

  const toggleIn = useCallback((list: 'saved' | 'later', slug: string) => {
    setState((current) => {
      const has = current[list].includes(slug);
      return {
        ...current,
        [list]: has ? current[list].filter((s) => s !== slug) : [...current[list], slug],
      };
    });
  }, []);

  const api = useMemo<CellarApi>(
    () => ({
      ...state,
      ready,
      memberStatus,
      isSaved: (slug) => state.saved.includes(slug),
      isLater: (slug) => state.later.includes(slug),
      toggleSaved: (slug) => toggleIn('saved', slug),
      toggleLater: (slug) => toggleIn('later', slug),
      addNote: (note) =>
        setState((current) => ({ ...current, notes: [note, ...current.notes] })),
      removeNote: (wineSlug, on) =>
        setState((current) => ({
          ...current,
          notes: current.notes.filter((n) => !(n.wineSlug === wineSlug && n.on === on)),
        })),
      cartCount: Object.values(state.cart).reduce((sum, n) => sum + n, 0),
      setCartQuantity: (slug, bottles) =>
        setState((current) => {
          const next = { ...current.cart };
          if (bottles <= 0) delete next[slug];
          else next[slug] = Math.min(bottles, 24);
          return { ...current, cart: next };
        }),
      emptyCart: () => setState((current) => ({ ...current, cart: {} })),
      clear: () => setState(EMPTY),
    }),
    [state, ready, memberStatus, toggleIn],
  );

  return <CellarContext.Provider value={api}>{children}</CellarContext.Provider>;
}

export function useCellar(): CellarApi {
  const context = useContext(CellarContext);
  if (!context) throw new Error('useCellar must be used inside CellarProvider');
  return context;
}
