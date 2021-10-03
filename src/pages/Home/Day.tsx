import { h } from 'preact';
import { styled } from 'goober';

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

const Title = styled<{ locked: boolean }>('h1')`
  font-size: 14px;
  font-weight: 600;
  color: #303030;
  font-style: ${(props) => props.locked && 'italic'};
`;

const Bubble = styled<{ locked: boolean }>('div')`
  width: 24px;
  height: 24px;
  border: 2px solid #666;
  display: block;
  border-radius: 50%;
  position: relative;
  background: ${(props) => {
    if (props.locked) {
      return '#666';
    }
  }};
  
  span {
    position: absolute;
    color: #fff;
    font-size: 18px;
    left: 1px;
    top: 1px;
  }
`;

const Link = styled('a')`
  color: #303030;
  text-decoration: none;
  display: block;

  &:last-child ${Row}::after {
    display: none;
  }
`;

const DayRow = ({ day, title, chapterNotation, locked, complete }) => {
  return (
    <Row key={day}>
      <Bubble locked={locked} complete={complete}>
        <span class="material-icons-outlined">
          lock
        </span>
      </Bubble>
      <TitleCol>
        <Title locked={locked}>
          Day {day}: {title} { locked && <small>(locked)</small> }
        </Title>
        <div>{chapterNotation}</div>
      </TitleCol>
      <span className="material-icons">navigate_next</span>
    </Row>
  );
};

const Day = ({ day, unlocked, complete }) => {
  return (
    unlocked ?
      (<Link href={`/day/${day.day}`}>
        <DayRow {...day} complete={complete} />
      </Link>) :
      (<DayRow {...day} locked />)
  );
};

export default Day;
