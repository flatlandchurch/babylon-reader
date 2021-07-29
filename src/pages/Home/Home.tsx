import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import sortOn from 'sort-on';
import { styled } from 'goober';

import Day from './Day';

const Wrapper = styled('div')`
  display: block;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Home = () => {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    fetch('/data/plan.json')
      .then((d) => d.json())
      .then((d) => {
        setPlan(sortOn(d, 'day'));
      });
  }, []);

  return (
    <Wrapper>
      {plan.map((day) => (
        <Day key={day.day} day={day} />
      ))}
    </Wrapper>
  );
};

export default Home;
