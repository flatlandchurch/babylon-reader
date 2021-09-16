import { h } from 'preact';
import { styled } from 'goober';
import { Link as RouterLink } from 'wouter-preact';

const Row = styled('article')`
  padding: 16px 24px;
  display: grid;
  grid-template-columns: minmax(0, max-content) 1fr minmax(0, max-content);
  grid-gap: 12px;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    display: block;
    margin: 0 auto;
    width: 88%;
    height: 1px;
    background: #dbdbdb;
    position: absolute;
    left: 6%;
    bottom: 0;
  }
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

const Link = styled(RouterLink)`
  color: #303030;
  text-decoration: none;
  display: block;

  &:last-child ${Row}::after {
    display: none;
  }
`;

const Day = ({ day }) => {
  return (
    <Link href={`/day/${day.day}`}>
      <Row key={day.day}>
        <Bubble />
        <TitleCol>
          <Title>
            Day {day.day}: {day.title}
          </Title>
          <div>{day.chapterNotation}</div>
        </TitleCol>
        <span className="material-icons">navigate_next</span>
      </Row>
    </Link>
  );
};

export default Day;
