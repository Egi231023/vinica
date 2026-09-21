import type { Wine } from './types.ts';

export type Occasion = 'table' | 'celebration' | 'quiet';
export type Taste = 'fresh' | 'rounded' | 'red' | 'sweet';
export type Curiosity = 'classic' | 'regional' | 'explore';
export interface GuideAnswers { occasion: Occasion; taste: Taste; curiosity: Curiosity; }
export type GuideWine = Pick<Wine, 'slug' | 'winerySlug' | 'name' | 'vintage' | 'colour' | 'grapes' | 'region' | 'bottle' | 'photo' | 'availability'> & { structure?: Wine['profile']['structure'] };
export interface GuidePick { wine: GuideWine; reasons: string[]; score: number; }

/** Editorial matching of documented catalogue fields, not a tasting prediction or stock feed. */
export function recommendWines(wines: GuideWine[], answers: GuideAnswers): GuidePick[] {
  const ranked = wines.filter(w => w.availability.producer !== 'archive' && w.availability.northAndVine !== 'discontinued').map(wine => {
    let score = wine.availability.producer === 'current' ? 3 : 0;
    const reasons: string[] = [];
    const s = wine.structure;
    const add = (points: number, reason: string) => { score += points; reasons.push(reason); };
    if (answers.taste === 'fresh' && ['white', 'sparkling'].includes(wine.colour) && (!s || s.sweetness <= 2)) {
      add(40, `Its ${wine.colour === 'sparkling' ? 'sparkling' : 'white-wine'} style follows your lighter direction.`);
      if (s && s.acidity >= 4) add(8, 'Our profile marks it as high in acidity, a useful starting point for freshness.');
    }
    if (answers.taste === 'rounded' && wine.colour === 'white') {
      add(32, 'A white wine for your rounder, textured direction.');
      if (s && s.body >= 3) add(16, 'Our profile gives it a medium or fuller body.');
    }
    if (answers.taste === 'red' && wine.colour === 'red') add(48, 'A red wine, matching the style you chose.');
    if (answers.taste === 'sweet' && (wine.colour === 'dessert' || (s && s.sweetness >= 3))) add(48, 'Its dessert style or sweeter profile follows your preference for sweetness.');
    if (answers.occasion === 'celebration' && wine.colour === 'sparkling') add(10, 'Our suggestion for the occasion: a sparkling toast.');
    if (answers.occasion === 'table' && s && s.acidity >= 3 && s.sweetness <= 2) add(5, 'For the table, we favoured a drier profile with acidity; check its page for specific pairings.');
    if (answers.occasion === 'quiet' && wine.colour !== 'sparkling') add(2, 'For a quiet moment, we leaned toward a still wine.');
    if (answers.curiosity === 'classic' && wine.grapes.some(g => ['Chardonnay', 'Pinot Noir', 'Cabernet Sauvignon', 'Merlot', 'Riesling'].includes(g.variety))) add(5, `A familiar grape starting point: ${wine.grapes.map(g => g.variety).join(', ')}.`);
    return { wine, score, reasons: reasons.length ? reasons : ['An alternative from the available catalogue; its documented profile is worth comparing with your preferences.'] };
  });
  const picks: GuidePick[] = [];
  while (picks.length < 3 && ranked.length) {
    ranked.sort((a, b) => {
      const diversify = (p: GuidePick) => p.score
        - (picks.some(x => x.wine.winerySlug === p.wine.winerySlug) ? 12 : 0)
        - (answers.curiosity === 'regional' && picks.some(x => x.wine.region.province === p.wine.region.province) ? 10 : 0)
        - (answers.curiosity === 'explore' && picks.some(x => x.wine.grapes.some(g => p.wine.grapes.some(h => h.variety === g.variety))) ? 10 : 0);
      return diversify(b) - diversify(a) || a.wine.slug.localeCompare(b.wine.slug);
    });
    picks.push(ranked.shift()!);
  }
  return picks;
}
