import { createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import sortOn from 'sort-on';

export type Day = {
  babylons: string[];
  chapterNotation: string;
  chapters: string[];
  content: string;
  day: number;
  notes: string;
  themes: string[];
  title: string;
  week: number;
  weekday: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
};

export type Text =
  | {
      type: 'paragraph_start' | 'paragraph_end' | 'stanza_start' | 'line_break' | 'stanza_end';
    }
  | {
      type: string;
      sectionNumber: number;
      chapterNumber: null;
      value: string;
      verseNumber: number;
    };

type Data = {
  plan: Day[];
  texts: Record<string, Text[]>;
  preferredVersion: 'niv' | 'nasb' | 'nlt';
  setAndCacheText: (ref: string, text: string) => void;
  getCachedText: (ref: string) => string;
  setPreferredVersion: (version: 'niv' | 'nasb' | 'nlt') => void;
};

export const DataContext = createContext<Partial<Data>>({ plan: [], texts: {} });

const DataProvider = ({ children }) => {
  const [plan, setPlan] = useState(JSON.parse(window.localStorage.getItem('br:plan') || '[]'));
  const [texts, setTexts] = useState(JSON.parse(window.localStorage.getItem('br:text') || '{}'));
  const [preferredVersion, setPreferredVersion] = useState<Data['preferredVersion']>(
    (window.localStorage.getItem('br:version') as Data['preferredVersion']) || 'niv',
  );

  useEffect(() => {
    if (!plan.length) {
      fetch('/data/plan.json')
        .then((d) => d.json())
        .then((d) => {
          const planData = sortOn(d, 'day');
          setPlan(planData);
          window.localStorage.setItem('br:plan', JSON.stringify(planData));
        });
    }
  }, []);

  const setAndCacheText = (ref: string, text: string) => {
    const nextTexts = {
      ...texts,
      [ref]: text,
    };
    setTexts(nextTexts);
    window.localStorage.setItem('br:text', JSON.stringify(nextTexts));
  };

  const getCachedText = (ref: string) => {
    return texts[ref];
  };

  return (
    <DataContext.Provider
      value={{
        plan,
        texts,
        preferredVersion,
        getCachedText,
        setAndCacheText,
        setPreferredVersion,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const usePlan = () => {
  const { plan } = useContext(DataContext);
  return plan;
};

export const useTexts = (chapters: string[]) => {
  const [loading, setLoading] = useState(true);
  const { setAndCacheText, getCachedText, preferredVersion } = useContext(DataContext);
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    Promise.all(
      chapters.map((ch) => {
        const ref = `${ch}.${preferredVersion}`.toLowerCase();
        if (!getCachedText(ref)) {
          return fetch(`/data/${ref}.json`)
            .then((d) => d.json())
            .then((d) => {
              setAndCacheText(ref, JSON.stringify(d));
              return d;
            });
        } else {
          return Promise.resolve(getCachedText(ref));
        }
      }),
    )
      .then((d) => {
        setTexts(d.map((j) => JSON.parse(j)));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { texts, loading };
};

export default DataProvider;
