import { useState, lazy, Suspense } from 'react';
import HomeScreen from './components/HomeScreen';
import CustomCursor from './components/CustomCursor';
import torahStructure from './data/torahStructure.json';

const ReaderView = lazy(() => import('./components/ReaderView'));
const PerushimView = lazy(() => import('./components/PerushimView'));

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [initialVerse, setInitialVerse] = useState(null);
  // Parsha range markers only appear when the user entered the reader via
  // the weekly-parsha button. Manual navigation clears this so plain reads
  // don't get cluttered with parsha banners.
  const [parshaRange, setParshaRange] = useState(null);

  const handleStart = (book, chapter, verse = null) => {
    setSelectedBook(book);
    setSelectedChapter(chapter);
    setInitialVerse(verse);
    setParshaRange(null);
    setScreen('reader');
  };

  const handleParsha = (parsha) => {
    const book = torahStructure.books.find((b) => b.english === parsha.bookEnglish);
    if (!book) return; // safety guard if the API returns an unknown book
    setSelectedBook(book);
    setSelectedChapter(parsha.startChapter);
    setInitialVerse(parsha.startVerse);
    setParshaRange({
      heName: parsha.heName,
      heRef: parsha.heRef,
      bookEnglish: parsha.bookEnglish,
      startChapter: parsha.startChapter,
      startVerse: parsha.startVerse,
      endChapter: parsha.endChapter,
      endVerse: parsha.endVerse,
    });
    setScreen('reader');
  };

  // Keep parshaRange across chapter prev/next so the end marker still appears
  // when paging from start-chapter through to end-chapter.
  const handleNavigate = (book, chapter) => {
    setSelectedBook(book);
    setSelectedChapter(chapter);
  };

  const handleBack = () => setScreen('home');

  return (
    <>
      <CustomCursor />
      {screen === 'home' && (
        <HomeScreen
          onStart={handleStart}
          onPerushim={() => setScreen('perushim')}
          onParsha={handleParsha}
        />
      )}
      <Suspense fallback={null}>
        {screen === 'perushim' && <PerushimView onBack={() => setScreen('home')} />}
        {screen === 'reader' && selectedBook && selectedChapter && (
          <ReaderView
            book={selectedBook}
            chapter={selectedChapter}
            initialVerse={initialVerse}
            parshaRange={parshaRange}
            onBack={handleBack}
            onNavigate={handleNavigate}
          />
        )}
      </Suspense>
    </>
  );
}
