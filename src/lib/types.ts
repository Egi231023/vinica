/**
 * North & Vine — content model.
 *
 * Rule of the house: every factual claim that reaches a reader carries a source.
 * The types below make that structural rather than optional, so an unsourced
 * claim is a type error rather than a judgement call.
 */

/** A citation. `verifiedAt` is the day a human or agent actually opened the URL. */
export interface Source {
  id: string;
  /** Publisher or site name, as a reader would recognise it. */
  publisher: string;
  title: string;
  url: string;
  /** ISO date (YYYY-MM-DD) the page was last read and the claim checked against it. */
  verifiedAt: string;
  /**
   * producer  — the winery's own site or media kit
   * editorial — press, guides, trade publications
   * official  — government, appellation body, registry, award organiser
   */
  kind: 'producer' | 'editorial' | 'official';
  /**
   * How the claim was checked against the source.
   *
   * page           — the cited page was opened and read in full
   * search-snippet — the claim was confirmed through search-engine retrieval of
   *                  the cited page, because direct fetching was unavailable.
   *                  Weaker than `page`; the UI labels it, and re-checking these
   *                  against the live page is tracked in docs/VERIFICATION.md.
   */
  method: 'page' | 'search-snippet';
}

/**
 * How a statement should be read. The UI renders these differently so a reader
 * never has to guess whether they are looking at a fact or at our opinion.
 */
export type ClaimKind =
  /** Checkable against the cited source. */
  | 'fact'
  /** North & Vine's own reading of the facts. Ours to defend, not the winery's. */
  | 'interpretation'
  /** Advice — serving, pairing, "drink from". Inherently a judgement. */
  | 'recommendation'
  /** Written, awaiting a source or a conversation with the producer. Never published as fact. */
  | 'unverified';

/** A single sourced statement. */
export interface Claim {
  text: string;
  kind: ClaimKind;
  /** Source ids. Required for `fact`; validated by scripts/audit-content.mjs. */
  sources: string[];
}

export interface Coordinates {
  /** Decimal degrees, WGS84. */
  lat: number;
  lon: number;
  /**
   * exact    — a published address or the producer's own map pin
   * approx   — the settlement centre, where no precise address is published
   */
  precision: 'exact' | 'approx';
  sources: string[];
}

export type ProvinceCode = 'ON' | 'BC' | 'NS' | 'QC' | 'NB' | 'PE' | 'NL' | 'AB' | 'SK' | 'MB';

export interface Region {
  /** e.g. "Niagara Escarpment" */
  appellation: string;
  /** e.g. "Niagara Peninsula" */
  parent?: string;
  province: ProvinceCode;
  provinceName: string;
}

/** Why this producer is in the book. Editorial selection, not a ranking. */
export interface SelectionNote {
  /** The criteria this producer was chosen against. */
  reasons: string[];
  /**
   * editorial — chosen by us; no commercial relationship exists or is implied
   * partner   — a signed supply agreement we can evidence
   *
   * Nothing is marked `partner` until a countersigned agreement exists.
   */
  relationship: 'editorial' | 'partner';
}

export interface TimelineEntry {
  year: number;
  /** Optional finer date for events where the day matters. */
  date?: string;
  label: string;
  detail: Claim;
}

export interface Award {
  year: number;
  title: string;
  awardedBy: string;
  /** What won it — a wine, or the estate itself. */
  subject: string;
  sources: string[];
}

/** An open question for the producer. Marks content as not-yet-obtained. */
export interface InterviewQuestion {
  topic: string;
  question: string;
  /** What we would be able to publish once answered. */
  unlocks: string;
}

export interface Winery {
  slug: string;
  name: string;
  /** Short form for pins, breadcrumbs and tight spaces. */
  shortName: string;
  founded?: { year: number; sources: string[] };
  settlement: string;
  region: Region;
  coordinates: Coordinates;
  website: string;
  /** One line, our own voice, no superlatives. */
  standfirst: string;
  selection: SelectionNote;

  /** Chapter sections. Each is a small set of sourced statements. */
  place: Claim[];
  people: Claim[];
  soilAndClimate: Claim[];
  grapesAndMaking: Claim[];
  curiosities: Claim[];

  timeline: TimelineEntry[];
  awards: Award[];

  /** Questions we would ask the winemaker. Published as openly unanswered. */
  openQuestions: InterviewQuestion[];

  /** How complete our catalogue of this producer is, and why. */
  catalogue: CatalogueCoverage;

  /** Per-winery accent, applied within the shared book design. */
  accent: { ink: string; wash: string };
}

export interface CatalogueCoverage {
  /**
   * complete-as-published — we believe we carry every wine the producer lists publicly
   * partial               — a verified subset; the rest is not yet transcribed
   * sample                — a handful, enough to show the producer's range
   */
  status: 'complete-as-published' | 'partial' | 'sample';
  /** Number of distinct wines the producer listed publicly when last checked, if countable. */
  publishedCount?: number;
  checkedAt: string;
  note: string;
  sources: string[];
}

export type WineColour = 'red' | 'white' | 'rose' | 'sparkling' | 'dessert' | 'orange';

export type BottleShape =
  | 'bordeaux'
  | 'burgundy'
  | 'alsace'
  | 'sparkling'
  | 'dessert-375';

/**
 * Availability is deliberately three separate facts. A wine can be listed by the
 * producer, absent from our range, and still appear in the book.
 */
export interface Availability {
  /**
   * current  — on the producer's current list
   * archive  — a past release we document but nobody can buy from the producer
   * unknown  — listed without stock information
   */
  producer: 'current' | 'archive' | 'unknown';
  /**
   * Whether North & Vine can actually ship it. Until supply agreements exist this
   * is `not-contracted` for every wine in the book, and the UI says so plainly.
   */
  northAndVine: 'orderable' | 'not-contracted' | 'discontinued';
  checkedAt: string;
  sources: string[];
}

export interface TastingProfile {
  /** Sourced descriptors — from the producer's own tasting note unless stated. */
  notes: Claim[];
  /** 1–5 scales, used only for filtering and the profile figure. Our reading. */
  structure?: {
    body: 1 | 2 | 3 | 4 | 5;
    acidity: 1 | 2 | 3 | 4 | 5;
    tannin?: 1 | 2 | 3 | 4 | 5;
    sweetness: 1 | 2 | 3 | 4 | 5;
  };
}

export interface Photo {
  /**
   * licensed  — we hold written permission; `src` is set
   * requested — asked the producer, awaiting reply
   * missing   — no suitable, rights-cleared photograph exists yet
   *
   * We do not generate label imitations. A gap is shown as a gap.
   */
  status: 'licensed' | 'requested' | 'missing';
  src?: string;
  credit?: string;
  /** Date of the request or the licence. */
  on?: string;
}

export interface Wine {
  slug: string;
  winerySlug: string;
  name: string;
  /** Producer's full label name where it differs from `name`. */
  fullName?: string;
  /**
   * Four-digit vintage, 'NV' for a genuinely non-vintage bottling, or
   * 'unspecified' where the source we checked did not state one.
   *
   * A vintage is never substituted, inferred or carried over from another
   * bottle: 'unspecified' is printed as a gap, not filled with a guess.
   */
  vintage: number | 'NV' | 'unspecified';
  colour: WineColour;
  /** Grape varieties with percentages where published. */
  grapes: { variety: string; share?: number }[];
  region: Region;
  /** Single vineyard or block, where the producer names one. */
  vineyard?: string;
  /** Millilitres. */
  volumeMl?: number;
  abv?: number;
  bottle: BottleShape;
  profile: TastingProfile;
  serving?: Claim[];
  pairing?: Claim[];
  /** The detail that makes this bottle worth a page. */
  story?: Claim[];
  photo: Photo;
  availability: Availability;
  /** The producer's own list price, in CAD. Not our selling price. */
  producerPriceCad?: { amount: number; checkedAt: string; sources: string[] };
  sources: string[];
}

export interface Chapter {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  /** First page of the chapter, in the book's own numbering. */
  page: number;
  href: string;
}
