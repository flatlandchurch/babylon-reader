import { h } from 'preact';
import { styled } from 'goober';
import { useEffect, useState } from 'preact/hooks';

const Wrapper = styled('div')`
  display: block;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const App = () => {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    fetch('/data/plan.json')
      .then((d) => d.json())
      .then((d) => {
        setPlan(d);
      });
  }, []);

  console.log(plan);

  return (
    <Wrapper>
      {plan.map((day) => (
        <div key={day.day}>
          <div>
            Day {day.day}: {day.title}
          </div>
          <div>{day.chapterNotation}</div>
        </div>
      ))}
    </Wrapper>
  );
};

export default App;
