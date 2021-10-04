import { h } from 'preact';
import { styled } from 'goober';
import { useState, useEffect } from 'preact/hooks';

import badges from '../../badges';

const AccountWrapper = styled('div')`
  padding: 16px 24px;
`;

const BadgeWrapper = styled('div')`
  width: 100%;
  display: block;
`;

const BadgesGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 48px;
  justify-content: space-between;
  margin-top: 32px;
`;

const Badge = styled('div')`
  height: 50px;
  width: 50px;
  display: flex;
  border-radius: 50%;
  margin: 0 auto;
`;

const BadgeTitle = styled('span')`
  font-weight: bold;
  font-size: 14px;
  width: 100%;
  text-align: center;
  display: block;
  margin-top: 8px;
`;

const LockedBadge = styled(Badge)`
  border: 2px solid #000;
  background: #ccc;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #000;

  span {
    width: 24px;
    margin: 0 auto;
    display: block;
  }
`;

const UnlockedBadge = styled('div')``;

const Account = () => {
  const [completions, setCompletions] = useState([]);

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

  console.log(completions);

  // TODO calculate badges

  return (
    <AccountWrapper>
      <h2>Badges</h2>
      <BadgesGrid>
        {Object.keys(badges)
          .map((k) => badges[k])
          .map((badge) => (
            <BadgeWrapper>
              <LockedBadge>
                <span className="material-icons-outlined">locked</span>
              </LockedBadge>
              <BadgeTitle>{badge.title}</BadgeTitle>
            </BadgeWrapper>
          ))}
      </BadgesGrid>
    </AccountWrapper>
  );
};

export default Account;
