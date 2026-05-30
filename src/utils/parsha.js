/**
 * parsha.js — fetch the current weekly Torah portion (Parashat HaShavua)
 * from Sefaria's public calendars API.
 *
 * Returned shape (or null on any failure / missing data):
 *   {
 *     heName: string,        // "פרשת בהעלותך"  (already includes the "פרשת " prefix)
 *     enName: string,        // "Beha'alotcha"
 *     heRef:  string,        // "במדבר ח׳:א׳-י״ב:ט״ז"   (pretty Hebrew range)
 *     bookEnglish:   string, // "Numbers"
 *     startChapter:  number, // 8
 *     startVerse:    number, // 1
 *     endChapter:    number, // 12
 *     endVerse:      number, // 16
 *   }
 *
 * Uses diaspora=0 (Israel) because the primary user reads on the Israeli schedule.
 * Dependency-free: uses fetch and a regex to parse the "Book C:V-C:V" ref string.
 */

const CALENDARS_URL = 'https://www.sefaria.org/api/calendars?diaspora=0';

// Parse strings like:
//   "Numbers 8:1-12:16"
//   "Genesis 1:1-2:3"
//   "Obadiah 1:1-1:21"
//   "I Samuel 1:1-2:10"
// The book name is everything BEFORE the trailing "<num>:<num>-<num>:<num>".
function parseRef(ref) {
  if (typeof ref !== 'string') return null;
  const trimmed = ref.trim();
  // Anchor on the trailing C:V-C:V token; the rest is the book name.
  const m = trimmed.match(/^(.+?)\s+(\d+):(\d+)-(\d+):(\d+)\s*$/);
  if (!m) return null;
  const bookEnglish = m[1].trim();
  const startChapter = parseInt(m[2], 10);
  const startVerse = parseInt(m[3], 10);
  const endChapter = parseInt(m[4], 10);
  const endVerse = parseInt(m[5], 10);
  if ([startChapter, startVerse, endChapter, endVerse].some((n) => !Number.isFinite(n))) {
    return null;
  }
  return { bookEnglish, startChapter, startVerse, endChapter, endVerse };
}

export async function fetchCurrentParsha() {
  try {
    const resp = await fetch(CALENDARS_URL);
    if (!resp.ok) return null;
    const data = await resp.json();
    const items = Array.isArray(data?.calendar_items) ? data.calendar_items : [];
    const item = items.find((it) => it?.title?.en === 'Parashat Hashavua');
    if (!item) return null;

    const heRaw = item?.displayValue?.he;
    const enName = item?.displayValue?.en;
    const heRef = item?.heRef;
    const ref = item?.ref;
    if (!heRaw || !enName || !heRef || !ref) return null;

    const parsed = parseRef(ref);
    if (!parsed) return null;

    const heName = `פרשת ${heRaw}`;
    return {
      heName,
      enName,
      heRef,
      bookEnglish: parsed.bookEnglish,
      startChapter: parsed.startChapter,
      startVerse: parsed.startVerse,
      endChapter: parsed.endChapter,
      endVerse: parsed.endVerse,
    };
  } catch {
    return null;
  }
}
