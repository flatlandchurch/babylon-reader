import { h } from 'preact';
import { styled } from 'goober';
import { createRegex, extractRangeFromMatch } from 'verse-reference-regex';

import { useCopyright, usePlan, useTexts, Day as DayType } from '../../DataProvider';
import Paragraph from './Paragraph';
import Stanza from './Stanza';
import condense from './condense';

const Article = styled('article')`
  padding: 0 24px;
  margin-top: 24px;
`;

const Copyright = styled('p')`
  font-size: 14px;
  font-weight: 300;
  margin: 48px 0 0;
  padding-bottom: 24px;
`;

const Chapter = styled('h2')`
  font-size: 20px;
  margin-bottom: 16px;

  &:first-child {
    margin-top: 48px;
  }
`;

const getCopyright = (text: string) => {
  const c = text.split(/www\.[a-z]+\.(?:com|org)/);
  const website = /(www\.[a-z]+\.(?:com|org))/.exec(text);

  if (!website) {
    return c;
  }

  return c.length > 1
    ? [
        c[0],
        <a href={`https://${website[1]}`} target="_blank">
          {website[1]}
        </a>,
        ...c.slice(1),
      ]
    : [
        ...c,
        <a href={`https://${website[1]}`} target="_blank">
          {website[1]}
        </a>,
      ];
};

const parseChapter = (ch: string) => {
  const regexpr = createRegex();
  const chapterFormatted = ch.replace('.', ' ').replace(/^1/, '1 ').replace(/^2/, '2 ');
  const range = extractRangeFromMatch(regexpr.exec(chapterFormatted));
  return `${range.book} ${range.start.chapter}`;
};

const Day = () => {
  const plan = usePlan();
  const [, day] = window.location.pathname.replace(/^\//, '').split('/');
  const dayPlan = plan[parseInt(day) - 1] || ({} as DayType);
  const { texts, loading } = useTexts(dayPlan ? dayPlan.chapters : []);
  const copyright = useCopyright();

  return (
    <Article>
      {!loading && (
        <h1>
          Day {day}: {dayPlan.title}
        </h1>
      )}
      {!loading &&
        texts.length &&
        dayPlan.chapters.map((ch, idx) => (
          <section key={`section-${ch}`}>
            <Chapter>{parseChapter(ch)}</Chapter>
            {condense(texts[idx]).map((unit) =>
              unit.type === 'paragraph' ? Paragraph(unit) : Stanza(unit),
            )}
          </section>
        ))}
      <Copyright>{getCopyright(copyright)}</Copyright>
    </Article>
  );
};

export default Day;
