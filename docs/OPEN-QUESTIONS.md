# Open questions

Everything the project cannot answer for itself, in one place. The site already
surfaces all of it — commercial terms on the Trust chapter, producer questions
on each producer's page — so nothing here is hidden in a repository.

## For the business

These block a real launch. Nothing in the design depends on their values; they
live in `src/config/business.ts` and each renders as an honest "not yet set"
until confirmed.

1. **Trust membership fee** and billing period, in CAD, excluding tax.
2. **Does the fee include bottles**, and how many? Currently undecided, which is
   why no page mentions included wine.
3. **Shipping** — included or charged, and to which provinces.
4. **Member pricing** — a flat discount off list, or per-wine negotiated pricing?
   The two imply very different catalogue pages.
5. **Minimum term and cancellation terms**, in plain language.
6. **Which producers have signed supply agreements.** Until at least one has,
   every wine reads *Not contracted* and nothing can be sold. This is the single
   biggest blocker.
7. **Licensing route for interprovincial shipping**, and the provinces it
   covers. Canadian wine shipping is regulated province by province.
8. **Payment provider**, and tax handling (GST/HST/PST by province).
9. **Who is the person behind "a person, not a queue"?** The Trust promise of
   personal care implies staffing that has not been described.
10. **Returns and corked-bottle policy.**

### On the "€80 for three wines" comparison

The motivating frustration — paying a set sum for three bottles from a single
estate when you wanted choice — is in the Trust chapter as motivation, never as
a verified price comparison, and the site does not promise to beat anyone's
price. If it is ever to be used as a marketing claim it needs: a named
competitor, a dated quote of their offer, a like-for-like basket, and CAD
figures. We have none of those.

## For the producers

Each producer's chapter carries its own questions on a tipped-in leaf, published
as openly unanswered. Twenty-two in total across the ten. They fall into
recurring shapes:

- **Certification precision** — which body, which vineyards, which bottlings,
  from which vintage. Several producers are described as organic or biodynamic
  in general terms that we will not sharpen without a source.
- **Vineyard history** — planting years, clones, rootstock, row orientation for
  the named single-vineyard sites.
- **Vintage-by-vintage blends** for the flagship wines.
- **Technical panels** — lees ageing and disgorgement dates for the sparkling
  wines; residual sugar and alcohol per cuvée.
- **Language and naming** — for Nk'Mip Cellars specifically, who approves the
  nsyilxcən names and orthography we reproduce.

## For the catalogue

- Transcribe the full public list for all ten producers. Currently a verified
  sample; two producers have no wine verified at all.
- Confirm the 14 wines whose vintage we could not establish.
- Obtain rights-cleared bottle photography — see `PHOTOGRAPHY.md`.
- Re-read every source directly and upgrade it from *indirect* — see
  `VERIFICATION.md`.

## For the product

- **Accounts.** The cellar (saved bottles, list for later, tasting notes) is in
  the browser only. It needs an account before it can be honestly called
  "your cellar that remembers".
- **Order persistence.** Trial orders are held in memory and do not survive a
  restart. The page says so.
- **Age verification** is a self-declared checkbox. A real service needs
  verification at delivery, per province.
