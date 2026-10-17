export const FB_ALBUMS_TAB = "https://www.facebook.com/responsiblecharity/photos_albums";

// FB album link index — the single source of truth for every album button on the site.
// One row per album: page, block, label, city, url, verified (public?), checked (date).
// Rows with verified:false or an empty url never render. To change a link, edit here only.
const CHECKED = "2026-07-12";

export const ALBUM_LINKS = [
  // THE WORK — pillar sections
  { page: "our-work", block: "education", label: "See the albums over the years", city: null, url: FB_ALBUMS_TAB, verified: true, checked: CHECKED },
  { page: "our-work", block: "healthcare", label: "See the full Healthcare album", city: null, url: FB_ALBUMS_TAB, verified: true, checked: CHECKED },
  { page: "our-work", block: "employment", label: "See the full Employment album", city: null, url: FB_ALBUMS_TAB, verified: true, checked: CHECKED },
  // THE WORK — Education Partners band (city albums share the albums tab for now)
  { page: "our-work", block: "education-partners", label: "See more photos", city: "Kolkata", url: FB_ALBUMS_TAB, verified: true, checked: CHECKED },
  { page: "our-work", block: "education-partners", label: "See more photos", city: "Pune", url: FB_ALBUMS_TAB, verified: true, checked: CHECKED },
  // THE WORK — Parents as Partners band
  { page: "our-work", block: "parents", label: "KOLKATA", city: "Kolkata", url: "https://www.facebook.com/media/set/?set=a.116071365070581&type=3", verified: true, checked: CHECKED },
  { page: "our-work", block: "parents", label: "PUNE", city: "Pune", url: "https://www.facebook.com/media/set/?set=a.1468170039860700&type=3", verified: true, checked: CHECKED },
  { page: "our-work", block: "parents", label: "MUMBAI", city: "Mumbai", url: "https://www.facebook.com/media/set/?set=a.1808015935876107&type=3", verified: true, checked: CHECKED },
  // OUR STORY — Our Community Centers (per-center)
  { page: "our-story", block: "kolkata", label: "See more photos", city: "Kolkata", url: "https://www.facebook.com/media/set/?set=a.621972941147085&type=3", verified: true, checked: CHECKED },
  { page: "our-story", block: "pune", label: "See more photos", city: "Pune", url: FB_ALBUMS_TAB, verified: true, checked: CHECKED },
];

// Per spec: one button per city with its own verified album, always Kolkata → Pune → Mumbai;
// a single "See more photos" button when the cities share one album.
export const getAlbumButtons = (page, block) => {
  const rows = ALBUM_LINKS.filter((r) => r.page === page && r.block === block && r.verified && r.url);
  if (!rows.length) return [];
  const urls = [...new Set(rows.map((r) => r.url))];
  if (urls.length === 1) {
    if (rows.length > 1) return [{ label: "See more photos", url: urls[0], city: null }];
    return [{ label: rows[0].label, url: urls[0], city: rows[0].city }];
  }
  return rows.map((r) => ({ label: r.label || (r.city ? `${r.city} albums` : "See more photos"), url: r.url, city: r.city }));
};
