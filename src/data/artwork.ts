export const ARTWORK = {
  'western-vineyard': {
    alt: 'Watercolor of vineyard rows descending toward a blue lake and ochre mountains.',
    caption: 'Between vines and water · an imagined western landscape',
  },
  'eastern-vineyard': {
    alt: 'Watercolor of rolling vineyards, autumn trees and pale stones.',
    caption: 'The quiet of the vineyard · an imagined eastern landscape',
  },
  'atlantic-vineyard': {
    alt: 'Watercolor of green vineyard rows beneath misty hills and an estuary sky.',
    caption: 'Where the mist settles · an imagined Atlantic landscape',
  },
  'vine-study': {
    alt: 'Botanical watercolor study of purple and golden grapes, vine leaves and curling tendrils.',
    caption: 'From the vine · a botanical study',
  },
  'cellar-study': {
    alt: 'Watercolor of a warm wine cellar with oak shelves, two wine glasses and a tasting notebook.',
    caption: 'A place for discovery · an imagined cellar',
  },
  "estate-closson-chase": {"alt": "Purple barn and ochre doors among garden flowers.", "caption": "The purple door", "source": "https://www.clossonchase.com/", "note": "A reference-led artistic interpretation; details may differ from the real place."},
  "estate-mission-hill": {"alt": "Mission Hill bell tower above the lake in evening light.", "caption": "Where light gathers", "source": "https://featured.kelownanow.com/experience-the-okanagan-mission-hill/", "note": "A reference-led artistic interpretation; details may differ from the real place."},
  "estate-cedarcreek": {"alt": "Dark gabled tasting room framed by a vineyard.", "caption": "A roof against the sky", "source": "https://www.jonesproduct.com/cedarcreek-estate-winery", "note": "A reference-led artistic interpretation; details may differ from the real place."},
  "estate-inniskillin": {"alt": "Historic barn and diamond window in a snow-covered vineyard.", "caption": "A winter pause", "source": "https://mmdusa.net/portfolio/inniskillin", "note": "A reference-led artistic interpretation; details may differ from the real place."},
  "estate-benjamin-bridge": {"alt": "Timber pavilion beside vines and a forested hill.", "caption": "The open pavilion", "source": "https://benjaminbridge.com/", "note": "A reference-led artistic interpretation; details may differ from the real place."},
  "estate-lightfoot-wolfville": {"alt": "Oak beams and amber pendant lights inside the winery.", "caption": "A warm welcome", "source": "https://lightfootandwolfville.com/", "note": "A reference-led artistic interpretation; details may differ from the real place."},
  "estate-nkmip": {"alt": "Iron chairs on a terrace overlooking lake and arid hills.", "caption": "Looking over the water", "source": "https://www.nkmipcellars.com/The-Winery", "note": "A reference-led artistic interpretation; details may differ from the real place."},
  "estate-orpailleur": {"alt": "Harvest buckets filled with pale grapes, with a tractor beyond.", "caption": "The gathering", "source": "https://orpailleur.ca/en", "note": "A reference-led artistic interpretation; details may differ from the real place."},
  "estate-tawse": {"alt": "Hands holding a cream-labelled wine bottle with a red band.", "caption": "In careful hands", "source": "https://tawsewinery.ca/", "note": "A reference-led artistic interpretation; details may differ from the real place."},
  "estate-clos-du-soleil": {"alt": "Silver tasting building and blue doorway beneath rugged hills.", "caption": "Under a mountain sky", "source": "https://www.tripadvisor.es/Attraction_Review-g183737-d6892595-Reviews-Clos_du_Soleil-Keremeos_British_Columbia.html", "note": "A reference-led artistic interpretation; details may differ from the real place."},
  "trust-passport": {"alt": "Burgundy linen notebook, brass key and a ribbon in an imagined setting.", "caption": "A key to discovery", "source": null, "note": "An imagined editorial study, not a documentary image or a wine ingredient list."},
  "roots-study": {"alt": "An imagined old vine with winding roots in stony earth.", "caption": "What the earth remembers", "source": null, "note": "An imagined editorial study, not a documentary image or a wine ingredient list."},
  "oak-study": {"alt": "Oak barrel on a wooden cradle with leaves and acorns.", "caption": "The patience of oak", "source": null, "note": "An imagined editorial study, not a documentary image or a wine ingredient list."},
  "harvest-study": {"alt": "Harvest secateurs beside a basket of purple grapes.", "caption": "The work of a season", "source": null, "note": "An imagined editorial study, not a documentary image or a wine ingredient list."},
  "ice-study": {"alt": "Golden grapes and a vine twig covered in frost and snow.", "caption": "Held by winter", "source": null, "note": "An imagined editorial study, not a documentary image or a wine ingredient list."},
  "red-aromas": {"alt": "Blackcurrants, cherries, plum, violet petals and an oak leaf.", "caption": "A study in red", "source": null, "note": "An imagined editorial study, not a documentary image or a wine ingredient list."},
  "white-aromas": {"alt": "Cut pear, lemon peel, white blossom and golden grapes.", "caption": "A study in light", "source": null, "note": "An imagined editorial study, not a documentary image or a wine ingredient list."},
  "sparkling-study": {"alt": "Two delicate glasses with a cork and an open wire cage.", "caption": "A moment shared", "source": null, "note": "An imagined editorial study, not a documentary image or a wine ingredient list."},
} as const;


export type ArtworkName = keyof typeof ARTWORK;
export function estateArtwork(slug: string): ArtworkName {
 const key = `estate-${slug}` as ArtworkName;
 return key in ARTWORK ? key : "vine-study";
}
export function craftArtwork(slug: string): ArtworkName {
 if (slug === "inniskillin") return "ice-study";
 if (["benjamin-bridge", "lightfoot-wolfville"].includes(slug)) return "sparkling-study";
 if (["tawse", "clos-du-soleil", "nkmip"].includes(slug)) return "oak-study";
 return "harvest-study";
}
