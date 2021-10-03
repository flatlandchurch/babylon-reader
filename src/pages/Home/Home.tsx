import { Fragment, h } from 'preact';
import { styled } from 'goober';
import {add, isBefore, isSameDay} from 'date-fns';

import Day from './Day';
import { usePlan } from '../../DataProvider';

const Jumbo = styled('section')`
  width: 100%;
  display: block;
  padding: 24px 24px 48px;
  text-align: center;
`;

const Home = () => {
  const plan = usePlan();
  const startDate = new Date(2021, 9, 3);

  return (
    <Fragment>
      <Jumbo>
        <h1>Babylon</h1>
      </Jumbo>
      {plan && plan.map((day, idx) => {
        const unlockDay = add(startDate, { days: idx });
        const unlocked = idx === 0 || isSameDay(unlockDay, new Date()) || isBefore(unlockDay, new Date());

        return (
          <Day key={day.day} day={day} unlocked={unlocked} />
        );
      })}
    </Fragment>
  );
};

export default Home;
