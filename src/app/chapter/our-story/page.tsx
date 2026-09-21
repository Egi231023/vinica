import { BookArtwork } from '@/components/BookArtwork';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Spread } from '@/components/book/Spread';
import { ALL_SOURCES } from '@/data/sources';
import { WINERIES } from '@/data/wineries';
import { WINES } from '@/data/wines';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Why North & Vine exists, how the ten producers were chosen, and exactly how we check what we publish.',
};

export default function OurStory() {
  return (
    <Spread
      leftHead="Chapter I · Our Story"
      rightHead="How we check things"
      leftPage={9}
      rightPage={10}
      left={<Story />}
      right={<Method />}
    />
  );
}

function Story() {
  return (
    <>
      <p className="chapter-number">Chapter I</p>
      <h1 className="chapter-title">Our Story</h1>
      <p className="chapter-standfirst">Why this exists, in plain terms.</p>

      <BookArtwork name="eastern-vineyard" />

      <div className="prose">
        <p className="dropcap">
          Canadian wine is young enough that most of its best producers are still run by the people
          who planted the vines, or by their children. That is unusual, and it is the reason the
          stories in this book are as good as they are. A vineyard in the Similkameen or the
          Gaspereau Valley is not an inherited estate with four centuries of myth attached. It is a
          decision somebody made, recently, for reasons you can still find out.
        </p>
        <p>
          We love those decisions. Why plant Chardonnay on a ridge that is colder than the bench
          below it. Why bury vines under earth every winter in Prince Edward County. Why a
          financier who fell for Burgundy would build a winery on six gravity-fed levels instead of
          one cheap floor. These are the things worth putting in a book.
        </p>
        <p>
          What we could not find was a good way to <em>buy</em> across them. The normal path is a
          club per winery: a separate membership, a separate shipment, a separate list. If you like
          four producers, you run four accounts. That is fine for the winery and tedious for you.
        </p>
        <p>
          North &amp; Vine is the other arrangement. We select producers, write them up properly,
          and put a single membership — <Link className="booklink" href="/chapter/trust">Trust</Link>{' '}
          — in front of the whole shelf. One relationship, one person to talk to, one cellar that
          remembers what you liked.
        </p>
      </div>

      <hr className="rule-ornament" />

      <h3 className="section-title">What we care about</h3>
      <div className="prose">
        <p>
          Wine and the people who make it, first. Service and trust, which mostly means telling you
          when a bottle is not right for you. Breadth, so you are not stuck with one estate&rsquo;s
          range. And discovery without snobbery — no scores to memorise, no vocabulary test at the
          door.
        </p>
      </div>

      <p className="marginal">
        We have not invented founders, biographies, partnerships or awards for ourselves, and there
        are none on this page. North &amp; Vine is a service being built; this book is the first
        part of it that works.
      </p>
    </>
  );
}

function Method() {
  const producerSources = ALL_SOURCES.filter((s) => s.kind === 'producer').length;
  const officialSources = ALL_SOURCES.filter((s) => s.kind === 'official').length;
  const editorialSources = ALL_SOURCES.filter((s) => s.kind === 'editorial').length;
  const openQuestions = WINERIES.reduce((sum, w) => sum + w.openQuestions.length, 0);
  const unspecifiedVintages = WINES.filter((w) => w.vintage === 'unspecified').length;

  return (
    <>
      <h2 className="chapter-title" style={{ fontSize: 'var(--step-2)' }}>
        How we check things
      </h2>
      <p className="chapter-standfirst">
        The rules we wrote for ourselves before we wrote a word of the book.
      </p>

      <h3 className="section-title">Three kinds of sentence</h3>
      <div className="prose">
        <p>
          A <strong>fact</strong> is checkable against a source we cite, with the date we checked
          it. An <span className="tag tag--interpretation">Our reading</span> is our opinion about
          what the facts mean — ours to defend, not the winery&rsquo;s. An{' '}
          <span className="tag tag--recommendation">Advice</span> is a serving or pairing
          suggestion, which is a judgement by nature. Anything we cannot source does not get
          published as a fact; it becomes a question we would put to the producer, printed as a
          question.
        </p>
      </div>

      <h3 className="section-title">How the ten were chosen</h3>
      <div className="prose">
        <p>
          This is an editorial selection, not a ranking, and we do not present it as one. There is
          no scoring method behind it and no &ldquo;best in Canada&rdquo; claim. We looked for
          quality, a story worth telling, regional spread across Ontario, British Columbia, Nova
          Scotia and Québec, a range we could actually describe, and producers we would want to
          work with. Each chapter states its own reasons on the page.
        </p>
        <p>
          <strong>None of the ten is a commercial partner.</strong> No supply agreement exists with
          any producer in this book. When one does, that producer&rsquo;s page will say so, and the
          distinction between editorial selection and signed partner will stay visible.
        </p>
      </div>

      <h3 className="section-title">Where we stand today</h3>
      <dl className="ledger">
        <div>
          <dt>Sources cited</dt>
          <dd>
            {ALL_SOURCES.length} — {producerSources} from producers, {officialSources} official,{' '}
            {editorialSources} press
          </dd>
        </div>
        <div>
          <dt>Wines verified</dt>
          <dd>{WINES.length}, across {new Set(WINES.map((w) => w.winerySlug)).size} of {WINERIES.length} producers</dd>
        </div>
        <div>
          <dt>Vintages we could not confirm</dt>
          <dd>{unspecifiedVintages} — printed as gaps, never filled in with a guess</dd>
        </div>
        <div>
          <dt>Open questions for winemakers</dt>
          <dd>{openQuestions}, listed on the producers&rsquo; own pages</dd>
        </div>
      </dl>

      <p className="gap-note">
        <strong>A limitation worth stating:</strong> most of the pages behind our citations were
        confirmed through search retrieval rather than opened directly, because the environment this
        book was built in could not reach them. Those notes are marked{' '}
        <span className="tag tag--unverified">indirect</span> in every source list. Re-reading them
        against the live pages is the first job on the list.
      </p>
    </>
  );
}
