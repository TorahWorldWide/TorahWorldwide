# משימה: תרגומי בראשית ב-3 רמות + UI מעודכן

אתה Claude Code. תעבוד בריפו `TorahWorldWide/TorahWorldwide` (clone אם צריך). תבצע את כל המשימה לבד מקצה לקצה ובסוף תדחוף ל-master.

---

## חלק 1: צור 3 קבצי פרומפט

תיצור את התיקייה `translation-prompts/` בשורש הריפו ותכתוב לתוכה 3 קבצים:

### `translation-prompts/easy.txt`
```
# BIBLICAL HEBREW → MODERN HEBREW (LEVEL 1: EASY)

Target: 12-year-old Israeli, never opened a Bible. Maximum readability.

## CARDINAL RULE
Full translation into natural modern Hebrew. If a kid would pause on a word — replace it. NOT a "cleaned up" biblical text — a REAL modern translation.

## RULES
1. PESHAT ONLY. No derash, no Christian/later-Jewish theology imported.
2. Modernize narrative vav: וַיֹּאמֶר אֱלֹהִים → אֱלוֹהִים אָמַר (add subject, don't keep "ו" at sentence start).
3. Modern grammar: break biblical construct chains (חית הארץ → הַחַיּוֹת שֶׁל הָאָרֶץ), expand suffix pronouns (בראם → בָּרָא אוֹתָם), modern prepositions (על פני → מֵעַל).
4. Replace biblical vocabulary: רקיע→כִּפַּת הַשָּׁמַיִם, תהום→הַמַּעֲמַקִּים, ישרצו→יִתְפַּשְּׁטוּ, למינהו→לְפִי הַמִּין שֶׁלּוֹ, נפש חיה→יְצוּר חַי, לאכלה→לַאֲכִילָה, תדשא→תַּצְמִיחַ, מאורות→גּוּפֵי אוֹר, הוליד→נוֹלַד לוֹ, ויוסף→הִמְשִׁיךְ.
5. Preserve definite articles (הַמַּבּוּל = THE flood, keep ה).
6. NO foreign theology: נפש חיה ≠ נְשָׁמָה (use יְצוּר חַי), רוּחַ אֱלֹהִים ≠ "רוח הקודש", עלמה ≠ בתולה, משיח = anointed (not "the Messiah").
7. שרצו (swarm) ≠ פרו (multiply) — translate distinctly.
8. Modernize idioms: נשא עיניו→הֵרִים אֶת מַבָּטוֹ, שלח ידו→הוֹשִׁיט אֶת יָדוֹ, ידע את אשתו→שָׁכַב עִם אִשְׁתּוֹ, שפך דם→רָצַח, חזק לבו→הִתְעַקֵּשׁ, מות תמות→בְּוַדַּאי תָּמוּת.
9. Keep drama. NEVER use exclamation marks. Names stay original (אַבְרָהָם, יִצְחָק).
10. Modern Israeli nikud only — NO Masoretic patterns, NO cantillation marks.
11. Spaces between ALL words — never merge (אֶת הַשָּׁמַיִם never אֶתהַשָּׁמַיִם).
12. Gloss obscure terms in parens once: תהו ובהו→רֵיקָנוּת מֻחְלֶטֶת וְחֹסֶר צוּרָה, בצלם→בִּדְמוּת (הַמַּשְׁמָעוּת לֹא בְּרוּרָה), עוֹלָה→קָרְבָּן שֶׁנִּשְׂרָף לְגַמְרֵי (עוֹלָה).
13. Genealogies: "X הוליד את Y" → "לְ-X נוֹלַד Y".

## OUTPUT FORMAT
ONE JSON object: { "0": "verse 0 translation", "1": "verse 1 translation", ... }
Verses 0-indexed. Output ONLY the JSON. No markdown fences, no commentary.
```

### `translation-prompts/medium.txt`
```
# BIBLICAL HEBREW → ACCURATE MODERN HEBREW (LEVEL 2: MEDIUM)

Target: literate teen/adult. Modern Hebrew but peshat-precise. Keep weight, preserve all linguistic distinctions.

## CARDINAL RULE
Modern Hebrew translation, but PRECISE. Every binyan, every biblical idiom, every theological trap — translated correctly per peshat. Reader should never get a wrong impression of what the text says.

## RULES
1. PESHAT ONLY — plain contextual meaning. No derash, no homiletical readings, no theology beyond what the text says.
2. Modernize narrative vav like easy level (add subject or time connector, don't start sentences with bare ו).
3. Modern grammar: break construct chains where biblical-sounding, expand suffixes, modern prepositions.
4. Replace biblical vocabulary — same as easy.
5. Preserve definite articles strictly (הַמַּבּוּל not מבול).
6. THEOLOGICAL TRAPS — translate what the text says, not what later traditions read in:
   - נֶפֶשׁ = יְצוּר חַי / חַי / אִישׁ (NOT נְשָׁמָה in immortal/spiritual sense)
   - נֶפֶשׁ חַיָּה = יְצוּר חַי (used for animals AND humans in Genesis)
   - רוּחַ אֱלֹהִים = רוּחַ אֱלוֹהִים (context: wind/breath/spirit — NOT "רוח הקודש")
   - עַלְמָה = אִשָּׁה צְעִירָה (NOT בתולה — that's בְּתוּלָה)
   - מָשִׁיחַ = מָשׁוּחַ בְּשֶׁמֶן (anyone anointed: king/priest — NOT "the Messiah")
   - בָּשָׂר (in "all flesh") = יְצוּרִים / בַּעֲלֵי חַיִּים (NOT meat-for-eating sense)
   - לֵב/לֵבָב = often מַחְשָׁבָה / רָצוֹן / כַּוָּנָה (seat of THOUGHT, not just feeling)
   - תּוֹרָה = הוֹרָאָה / הַדְרָכָה (not only "law")
7. שרצו ≠ פרו — distinct.
8. BIBLICAL IDIOMS — modernize the meaning:
   נשא עיניו→הֵרִים מַבָּטוֹ, שלח ידו→הוֹשִׁיט יָדוֹ, נשא פנים→הֶעֱדִיף, שפך דם→רָצַח, חזק לב→הִתְעַקֵּשׁ, מות תמות→בְּוַדַּאי תָּמוּת, מות יומת→יוֹצֵא לְהוֹרְגוֹ, ידע את אשתו→שָׁכַב עִם אִשְׁתּוֹ, מעל (sending)→הַרְחֵק מ.
9. BINYAN AWARENESS: Pi'el often intensive (וַיְשַׁלַּח = expelled forcefully, stronger than שָׁלַח). Hif'il causative (הוֹלִיד = caused-to-be-born → נוֹלַד לוֹ). Translate the SHIFTED meaning.
10. AMBIGUITY — preserve it. Don't "solve" with derash. Add brief gloss if needed.
11. Drama, no exclamation marks. Names original.
12. Modern Israeli nikud (NOT Masoretic, NO cantillation).
13. Spaces between ALL words.
14. Gloss obscure terms once in parens.
15. Genealogies: "לְ-X נוֹלַד Y" structure.

## OUTPUT FORMAT
ONE JSON object: { "0": "...", "1": "...", ... }
Verses 0-indexed. Output ONLY the JSON. No fences, no commentary.
```

### `translation-prompts/close.txt`
```
# BIBLICAL HEBREW → ACCESSIBLE BIBLICAL HEBREW (LEVEL 3: CLOSE TO SOURCE)

Target: someone who wants to read close to the original, just helped past obscure words. Preserves biblical voice.

## CARDINAL RULE
Keep biblical sentence structure, narrative vav, and dignified vocabulary. Replace ONLY genuinely obscure words. The result should feel like the Torah with footnotes baked in.

## RULES
1. PESHAT ONLY.
2. PRESERVE NARRATIVE VAV: keep וַיֹּאמֶר, וַיְהִי, וַיַּרְא, וַיֵּלֶךְ — they ARE the biblical voice. Just add modern nikud.
3. KEEP CONSTRUCT CHAINS when understandable (חַיַּת הָאָרֶץ stays, דְּבַר ה' stays).
4. REPLACE ONLY GENUINELY OBSCURE vocabulary, and gloss in parens once:
   - ישרצו → יִשְׁרְצוּ (יִתְרַבּוּ וְיִתְפַּשְּׁטוּ)
   - תְּהוֹם → תְּהוֹם (הַמַּעֲמַקִּים)
   - רָקִיעַ → רָקִיעַ (כִּפַּת הַשָּׁמַיִם)
   - רֶמֶשׂ → רֶמֶשׂ (זוֹחֲלִים קְטַנִּים)
   - מָאוֹר → מָאוֹר (גּוּף אוֹר)
   - לְמִינֵהוּ → לְמִינוֹ (modernize suffix only)
   - בְּתֻמּוֹ → בְּתֻמּוֹ (כְּשֶׁנִּגְמַר)
5. KEEP BIBLICAL IDIOMS — that's the whole point of this tier:
   נָשָׂא עֵינָיו, שָׁלַח יָדוֹ, בָּא בַּיָּמִים, מוֹת תָּמוּת, יָדַע אֶת אִשְׁתּוֹ — all keep as is.
6. Preserve definite articles.
7. NO foreign theology even here: נֶפֶשׁ חַיָּה stays (not נְשָׁמָה), רוּחַ אֱלֹהִים stays (not רוח הקודש), עַלְמָה stays (not בְּתוּלָה), מָשִׁיחַ = anointed (not "the Messiah").
8. Modern Israeli nikud (NOT Masoretic patterns, NO cantillation marks).
9. Spaces between ALL words.
10. Sparse parenthetical glosses — only for truly obscure terms, once per chapter.
11. GENEALOGIES — keep biblical structure: "הוֹלִיד אֶת", "וַיְחִי", "וַיָּמָת".
12. Binyan awareness — preserve shifted meanings.
13. Drama via word choice and rhythm. NEVER exclamation marks. Names original.
14. Preserve ambiguity.

## EXAMPLES
Genesis 1:1 → בְּרֵאשִׁית בָּרָא אֱלוֹהִים אֶת הַשָּׁמַיִם וְאֶת הָאָרֶץ.
Genesis 1:2 → וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ (רֵיקָנוּת וְחֹסֶר צוּרָה), וְחֹשֶׁךְ עַל פְּנֵי תְהוֹם (הַמַּעֲמַקִּים), וְרוּחַ אֱלוֹהִים מְרַחֶפֶת עַל פְּנֵי הַמַּיִם.
Genesis 22:2 → וַיֹּאמֶר: קַח נָא אֶת בִּנְךָ, אֶת יְחִידְךָ, אֲשֶׁר אָהַבְתָּ, אֶת יִצְחָק, וְלֶךְ לְךָ אֶל אֶרֶץ הַמּוֹרִיָּה.

Notice: kept וַיֹּאמֶר, קַח נָא, וְלֶךְ לְךָ — biblical voice preserved.

## OUTPUT FORMAT
ONE JSON object: { "0": "...", "1": "...", ... }
Verses 0-indexed. Output ONLY the JSON. No fences, no commentary.
```

---

## חלק 2: תרגם בראשית 1-15 ב-3 רמות

לכל פרק 1-15 ולכל אחת מ-3 הרמות (easy/medium/close):

1. הורד את העברית עם נקודות (בלי טעמים) מ-Sefaria:
   ```
   https://www.sefaria.org/api/v3/texts/Genesis.{N}?version=hebrew
   ```
   קח את `versions[0].text` (מערך פסוקים). נקה: הסר תגי `<...>` בהמלן, הסר את `׃` בסוף, הסר טעמי מקרא (תווי יוניקוד `\u0591-\u05AF`, `\u05BD`, `\u05C0`, `\u05C3`, `\u05C6`) — אבל **השאר את כל הניקוד**.

2. שלח את הפרומפט של הרמה + הפסוקים (מסומנים `[0] verse`, `[1] verse`...) ל-claude ובקש JSON.

3. שמור ב: `public/translations/Genesis_{N}.{level}.json` במבנה:
   ```json
   {
     "0": "פסוק 0 מתורגם",
     "1": "פסוק 1 מתורגם"
   }
   ```

4. **ודא ולידציה:** מספר המפתחות חייב להיות שווה למספר הפסוקים שהורדו. אם לא — הרץ שוב את אותו פרק+רמה.

**סה"כ יווצרו 45 קבצים חדשים** (15 פרקים × 3 רמות).

---

## חלק 3: מחק קבצי תרגום ישנים

מחק את הקבצים הבאים (אבל **לא** את ה-`.no-nikud.json`):
```
public/translations/Genesis_1.json
public/translations/Genesis_2.json
...
public/translations/Genesis_15.json
```

הקבצים `Genesis_1.no-nikud.json` וכו' נשארים — הם לא קשורים לתרגום.
פרקים 16-50 הישנים גם נשארים בינתיים.

---

## חלק 4: עדכן את ה-UI ב-`src/components/ReaderView.jsx`

המצב הנוכחי: state `showSavedTranslations` בוליאני, כפתור אחד "הצג תרגום / הסתר תרגום" שטוען מ-`Genesis_{N}.json`.

המצב החדש: 4 רמות במחזור — `off` → `easy` → `medium` → `close` → `off`.

### שינויים נדרשים:

**1. החלף את ה-state** (סביב שורה 62-63):
```jsx
// OLD:
const [savedTranslations, setSavedTranslations] = useState(null);
const [showSavedTranslations, setShowSavedTranslations] = useState(false);

// NEW:
const [translationLevel, setTranslationLevel] = useState('off'); // 'off' | 'easy' | 'medium' | 'close'
const [translationsByLevel, setTranslationsByLevel] = useState({ easy: null, medium: null, close: null });
```

**2. החלף את ה-useEffect שטוען תרגום** (סביב שורה 118-126):
```jsx
useEffect(() => {
  setTranslationsByLevel({ easy: null, medium: null, close: null });
  setTranslationLevel('off');
  ['easy', 'medium', 'close'].forEach(level => {
    fetch(`/translations/${book.english}_${chapter}.${level}.json`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => setTranslationsByLevel(prev => ({ ...prev, [level]: data })))
      .catch(() => {});
  });
}, [book.english, chapter]);
```

**3. החלף שימושים ב-`savedTranslations` ו-`showSavedTranslations`:**
- `showSavedTranslations` ⟶ `translationLevel !== 'off'`
- `savedTranslations` ⟶ `translationsByLevel[translationLevel]`
- כל קוד בעריכה (admin) — תוכל להשאיר את `editingTranslations` אבל שיעבוד על הרמה הפעילה: `translationsByLevel[translationLevel]`. בשמירה (`saveTranslationEdits`), שלח גם את הרמה: `{ book, chapter, level: translationLevel, translations: ... }`.

**4. החלף את הכפתור** (סביב שורה 1361-1374):
```jsx
{(translationsByLevel.easy || translationsByLevel.medium || translationsByLevel.close) && (
  <button
    onClick={() => {
      const order = ['off', 'easy', 'medium', 'close'];
      const idx = order.indexOf(translationLevel);
      // Cycle to next level that has data (skip levels with no file)
      for (let i = 1; i <= 4; i++) {
        const next = order[(idx + i) % 4];
        if (next === 'off' || translationsByLevel[next]) {
          setTranslationLevel(next);
          break;
        }
      }
    }}
    className={`absolute left-24 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg border text-sm font-ui
                cursor-pointer transition-[transform,opacity,color,background-color,border-color,box-shadow,filter] duration-200 ${
                  translationLevel !== 'off'
                    ? 'border-gold/50 text-gold bg-gold/10'
                    : 'border-white/15 text-white/40 hover:text-gold hover:border-gold/30'
                }`}
    title="החלף רמת תרגום"
  >
    {translationLevel === 'off' && 'הצג תרגום'}
    {translationLevel === 'easy' && 'תרגום: קל'}
    {translationLevel === 'medium' && 'תרגום: מדויק'}
    {translationLevel === 'close' && 'תרגום: קרוב למקור'}
  </button>
)}
```

**5. ודא שהכפתור נראה טוב גם במובייל וגם בדסקטופ** — אותו מיקום של הכפתור הישן (left-24 בסביבות שורת המצבים). אם הטקסט "תרגום: קרוב למקור" רחב מדי במובייל, קצר ל-"קרוב" / "מדויק" / "קל" במובייל בלבד:
```jsx
{isMobile ? (
  translationLevel === 'off' ? 'תרגום' :
  translationLevel === 'easy' ? 'קל' :
  translationLevel === 'medium' ? 'מדויק' : 'קרוב למקור'
) : (
  translationLevel === 'off' ? 'הצג תרגום' :
  translationLevel === 'easy' ? 'תרגום: קל' :
  translationLevel === 'medium' ? 'תרגום: מדויק' : 'תרגום: קרוב למקור'
)}
```

**6. ה-API לעריכה** (`/api/save-translation`) — עדכן לקבל פרמטר `level` אם הוא קיים. אם הוא לא קיים בצד שרת (זה אופציונלי, רק לאדמין) — דחוף את ההכרזה ב-`scripts/` או ב-Vercel function שמטפלת בזה. אם אין לך זמן — דלג על העריכה (היא של אדמין בלבד, לא קריטית).

---

## חלק 5: בדיקה וקומיט

1. הרץ `cd torah-reader && npm run dev` (או הריצה הרגילה של הפרויקט).
2. גלוש לבראשית פרק 1 → לחץ על הכפתור → ראה שמחזורי בין 4 מצבים.
3. גלוש לפרק 16 (שאין לו תרגום חדש) → ודא שהכפתור לא מוצג בכלל (או מוצג רק עם המצבים שיש להם דאטה).
4. ודא שאין שגיאות בקונסול.
5. קומיט עם הודעה:
   ```
   Add 3-level translation system for Genesis 1-15

   - New translation prompts (easy/medium/close) per peshat methodology
   - Translated Genesis 1-15 in all 3 levels (45 files)
   - Removed old single-level translations for chapters 1-15
   - ReaderView UI now cycles through 4 modes: off → easy → medium → close
   - Old chapters 16-50 single-level translations preserved unchanged
   ```
6. `git push origin master`.

---

## הערות חשובות

- **אל תיגע** בקבצים `Genesis_*.no-nikud.json` — הם לא קשורים לעבודה הזו.
- **אל תיגע** בתרגומים של פרקים 16-50 (`Genesis_16.json` ומעלה) — הם לא משתנים כאן.
- אם תרגום מסוים יוצא רע (לא JSON תקין, חסרים פסוקים) — הרץ שוב את אותו פרק+רמה. עד 3 נסיונות.
- שמור את הקבצים תמיד עם `JSON.stringify(obj, null, 2)` (indent=2, UTF-8, אין escape של עברית).
- כשאתה שולח את הפסוקים לתרגום, סמן אותם `[0] verse-text\n[1] verse-text\n...` בשורות נפרדות.

תתחיל. תדווח לי בסוף עם רשימת קבצים שנוצרו וקישור לקומיט.
