import { createContext, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import sortOn from 'sort-on';

import copyrights from './copyrights';
import fetchJSON from './fetchJSON';

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
  preferredShowVerses: boolean;
  setPreferredShowVerses: (setting: boolean) => void;
  preferredVersion: 'niv' | 'nasb' | 'nlt';
  setPreferredVersion: (version: 'niv' | 'nasb' | 'nlt') => void;
  preferredDivineName: 'lord' | 'yhwh' | 'yahweh';
  setPreferredDivineName: (name: 'lord' | 'yhwh' | 'yahweh') => void;
};

export const DataContext = createContext<Partial<Data>>({ plan: [] });

const DataProvider = ({ children }) => {
  const [plan, setPlan] = useState(JSON.parse(window.localStorage.getItem('br:plan') || '[]'));

  /** User Preferences */
  const [preferredVersion, setPreferredVersion] = useState<Data['preferredVersion']>(
    (window.localStorage.getItem('br:version') as Data['preferredVersion']) || 'niv',
  );
  const [preferredDivineName, setPreferredDivineName] = useState<Data['preferredDivineName']>(
    (window.localStorage.getItem('br:divine-name') as Data['preferredDivineName']) || 'lord',
  );
  const [preferredShowVerses, setPreferredShowVerses] = useState<boolean>(
    JSON.parse(window.localStorage.getItem('br:verses') || 'false') as boolean,
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

  return (
    <DataContext.Provider
      value={{
        plan,
        preferredVersion,
        setPreferredVersion,
        preferredDivineName,
        setPreferredDivineName,
        preferredShowVerses,
        setPreferredShowVerses,
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
  const { preferredVersion } = useContext(DataContext);
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    Promise.all(
      chapters.map((ch) => {
        const ref = `${ch}.${preferredVersion}`.toLowerCase();
        return fetchJSON(`/data/${ref}.json`);
      }),
    )
      .then((d) => {
        setTexts(d.map((j) => j));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { texts, loading };
};

export const useCopyright = () => {
  const { preferredVersion } = useContext(DataContext);
  return copyrights[preferredVersion];
};

export const useDivineName = () => {
  const { preferredDivineName } = useContext(DataContext);

  if (preferredDivineName === 'lord') {
    return {
      smallcaps: 'true',
      name: 'Lord',
    };
  }

  return {
    smallcaps: false,
    name: preferredDivineName === 'yhwh' ? 'YHWH' : 'Yahweh',
  };
};

export const useVerseSetting = () => {
  const { preferredShowVerses } = useContext(DataContext);
  return preferredShowVerses;
};

export default DataProvider;
