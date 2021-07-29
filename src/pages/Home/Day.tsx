import { h, Fragment } from 'preact';
import { styled } from 'goober';
import { useState } from 'preact/hooks';
import { createRegex, extractRangeFromMatch } from 'verse-reference-regex';

const regexpr = createRegex({ requireVerse: false });

const Row = styled('div')`
  padding: 12px 24px;
  display: grid;
  grid-template-columns: minmax(0, max-content) 1fr minmax(0, max-content);
  grid-gap: 12px;
  align-items: center;
`;

const TitleCol = styled('div')`
  font-size: 14px;
  color: #666;
`;

const Title = styled('h1')`
  font-size: 14px;
  font-weight: 600;
  color: #303030;
`;

const Bubble = styled('div')`
  width: 24px;
  height: 24px;
  border: 2px solid #666;
  display: block;
  border-radius: 50%;
`;

const Button = styled('button')`
  display: block;
  padding: 4px;
  border: 0;
  background: transparent;
  font-size: inherit;
`;

const Expansion = styled('div')`
  padding: 12px 32px;
  background: #f0f0f0;
`;

const Day = ({ day }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Fragment>
      <Row key={day.day}>
        <Bubble />
        <TitleCol>
          <Title>
            Day {day.day}: {day.title}
          </Title>
          <div>{day.chapterNotation}</div>
        </TitleCol>
        <Button onClick={() => setExpanded((e) => !e)}>
          <span className="material-icons">{!expanded ? 'expand_more' : 'expand_less'}</span>
        </Button>
      </Row>
      <Expansion>
        {day.chapters.map((chapter) => {
          console.log(chapter);
          const cleanedChapter = chapter
            .split('.')
            .join(' ')
            .replace(/^1/, '1 ')
            .replace(/^2/, '2 ');
          const res = extractRangeFromMatch(regexpr.exec(cleanedChapter));
          console.log(res);

          return (
            <span>Read: {chapter}</span> // TODO: make these links
          );
        })}
      </Expansion>
    </Fragment>
  );
};

export default Day;
