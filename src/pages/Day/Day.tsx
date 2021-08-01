import { h } from 'preact';
import { styled } from 'goober';

import { usePlan, useTexts } from '../../DataProvider';
import Paragraph from './Paragraph';
import Stanza from './Stanza';
import condense from './condense';

const Article = styled('article')`
  padding: 0 24px;
  margin-top: 24px;
`;

const Day = () => {
  const plan = usePlan();
  const [, day] = window.location.pathname.replace(/^\//, '').split('/');
  const dayPlan = plan[parseInt(day) - 1];
  const { texts, loading } = useTexts(dayPlan.chapters);
  console.log(texts);

  return (
    <Article>
      <h1>
        Day {day}: {dayPlan.title}
      </h1>
      {!loading &&
        texts.length &&
        dayPlan.chapters.map((ch, idx) => (
          <section key={`section-${ch}`}>
            <h2>{ch}</h2>
            {condense(texts[idx]).map((unit) =>
              unit.type === 'paragraph' ? Paragraph(unit) : Stanza(unit),
            )}
          </section>
        ))}
    </Article>
  );
};

export default Day;
