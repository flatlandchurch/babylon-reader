import { Fragment, h } from 'preact';
import { styled } from 'goober';
import { add, isBefore, isSameDay } from 'date-fns';

import Day from './Day';
import { usePlan } from '../../DataProvider';
import { useEffect, useState } from 'preact/hooks';

const Jumbo = styled('section')`
  width: 100%;
  display: block;
  padding: 24px 24px 48px;
  text-align: center;
`;

const Home = () => {
  const plan = usePlan();
  const [completions, setCompletions] = useState([]);
  const startDate = new Date(2021, 9, 3);

  useEffect(() => {
    fetch('/.netlify/functions/completions').then(async (d) => {
      if (d.status === 400) {
        window.location.href = '/';
      }
      const data = await d.json();
      setCompletions(data);
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <Fragment>
      <Jumbo>
        <h1>Babylon</h1>
      </Jumbo>
      {plan &&
        plan.map((day, idx) => {
          const unlockDay = add(startDate, { days: idx });
          const unlocked =
            idx === 0 || isSameDay(unlockDay, new Date()) || isBefore(unlockDay, new Date());

          const dayInCompletions = completions.find((c) => c.day === day.day);
          const isComplete = !!dayInCompletions;

          return <Day key={day.day} day={day} unlocked={unlocked} complete={isComplete} />;
        })}
    </Fragment>
  );
};

export default Home;
