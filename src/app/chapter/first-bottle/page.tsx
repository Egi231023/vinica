import { Spread } from '@/components/book/Spread';
import { BookArtwork } from '@/components/BookArtwork';
import { WineGuide } from '@/components/WineGuide';
import { WINES } from '@/data/wines';
import { WINERIES } from '@/data/wineries';
import { initialsFor } from '@/components/Bottle';
export const metadata = { title: 'Find your first bottle', description: 'Three questions and three personal paths into the North & Vine wine book.' };
export default function FirstBottle() {
  const wines = WINES.map(({ slug, winerySlug, name, vintage, colour, grapes, region, bottle, photo, availability, profile }) => ({ slug, winerySlug, name, vintage, colour, grapes, region, bottle, photo, availability, structure: profile.structure }));
  const producers = Object.fromEntries(WINERIES.map(w => [w.slug, { name: w.shortName, initials: initialsFor(w.name) }]));
  return <Spread leftHead="The Collection · Your first bottle" rightHead="Notes from your tasting companion" leftPage={123} rightPage={124}
    left={<><p className="chapter-number">A little guidance</p><h1 className="chapter-title">Find your<br /><em>first bottle.</em></h1><p className="chapter-standfirst">Begin with a moment. Follow a taste. Leave room for a discovery.</p><p><a className="booklink" href="#guide-start">Begin the conversation →</a></p><BookArtwork name="white-aromas" priority /><div className="prose"><p>There is no vocabulary test here. Tell us what draws you in, and we will suggest three wines to explore from the book.</p><p>Your tasting notes will always matter more than our suggestions. Save what intrigues you, read the wine’s story, and make the next page your own.</p></div><details className="editorial-details"><summary>How your suggestions are chosen</summary><p>We compare your answers with wine styles, grapes, provinces and the editorial structure profiles already recorded in this catalogue. We favour the taste direction first, then the occasion and the kind of exploration you chose.</p><p>Archived and discontinued entries are excluded. We prefer producer-listed wines and add variety across producers; availability is dated, not live stock. Suggestions are not ratings or paid placements.</p><p>This is a small, growing catalogue. A preference for regional or grape variety cannot guarantee three different regions or grapes.</p></details></>}
    right={<WineGuide wines={wines} producers={producers} />} />;
}
