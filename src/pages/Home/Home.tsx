import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import sortOn from 'sort-on';
import { styled } from 'goober';

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

  return (
    <Fragment>
      <Jumbo>
        <h1>Babylon</h1>
      </Jumbo>
      {plan && plan.map((day) => <Day key={day.day} day={day} />)}
    </Fragment>
  );
};

export default Home;
