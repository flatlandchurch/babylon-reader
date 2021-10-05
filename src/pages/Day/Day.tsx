import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { keyframes, styled } from 'goober';
import { createRegex, extractRangeFromMatch } from 'verse-reference-regex';

import { useCopyright, usePlan, useTexts, Day as DayType } from '../../DataProvider';
import Paragraph from './Paragraph';
import Stanza from './Stanza';
import condense from './condense';
import descriptions from '../../descriptions';

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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
`;

const CompleteButton = styled<{ completing: boolean }>('button')`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 25px;
  font-size: 14px;
  background: #222;
  color: #fff;
  appearance: none;
  border: 0;
  margin: 24px auto 0;
  cursor: pointer;

  .material-icons {
    font-size: 20px;
    margin-right: 8px;
  }

  span {
    animation-name: ${rotate};
    animation-duration: 1.5s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-play-state: ${(props) => (props.completing ? 'running' : 'paused')};
  }
`;

const parseChapter = (ch: string) => {
  const regexpr = createRegex();
  const chapterFormatted = ch.replace('.', ' ').replace(/^1/, '1 ').replace(/^2/, '2 ');
  const range = extractRangeFromMatch(regexpr.exec(chapterFormatted));
  return `${range.book} ${range.start.chapter}`;
};

const Day = ({ params }) => {
  const plan = usePlan();
  const [completing, setCompleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { day } = params;
  const dayPlan = plan[parseInt(day) - 1] || ({} as DayType);
  const { texts, loading } = useTexts(dayPlan ? dayPlan.chapters : []);
  const copyright = useCopyright();

  const Description = descriptions[parseInt(day, 10)];

  useEffect(() => {
    fetch('/.netlify/functions/completions').then(async (d) => {
      if (d.status === 400) {
        window.location.href = '/';
      }
      const data = await d.json();
      const dayInCompletions = data.find((c) => c.day === parseInt(day, 10));
      const isComplete = !!dayInCompletions;
      setIsComplete(isComplete);
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleComplete = async () => {
    setCompleting(true);
    fetch('/.netlify/functions/complete', {
      method: 'POST',
      body: JSON.stringify({
        day,
        read: new Date().toISOString(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((d) => {
      setCompleting(false);
      window.location.href = '/';
    });
  };

  return (
    <Article>
      {!loading && (
        <h1>
          Day {day}: {dayPlan.title}
        </h1>
      )}
      <Description />
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
      {!loading && !isComplete && (
        <CompleteButton onClick={handleComplete} completing={completing} disabled={completing}>
          {completing ? (
            <span className="material-icons">motion_photos_on</span>
          ) : (
            <Fragment>
              <span className="material-icons">check</span>
              <span>Mark Complete</span>
            </Fragment>
          )}
        </CompleteButton>
      )}
      <Copyright>{getCopyright(copyright)}</Copyright>
    </Article>
  );
};

export default Day;
