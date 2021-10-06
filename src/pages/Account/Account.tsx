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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 48px;
  justify-content: space-between;
  margin-top: 32px;
`;

const Badge = styled('div')`
  height: 0;
  width: 100%;
  padding-bottom: 100%;
  display: flex;
  border-radius: 50%;
  margin: 0 auto;
  border: 2px solid #000;
  background: #ccc;
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
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #000;
  position: relative;

  span {
    position: absolute;
    width: 48px;
    font-size: 48px;
    margin: 0 auto;
    display: block;
    top: calc(50% - 24px);
  }
`;

const UnlockedBadge = styled(Badge)`
  position: relative;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
  }
`;

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

  const verifiedBadges = Object.keys(badges)
    .map((k) => badges[k])
    .map((badge) => ({
      ...badge,
      unlocked: badge.condition(completions),
    }))
    .filter((badge) => (badge.unlocked ? true : !badge.hidden));

  return (
    <AccountWrapper>
      <h2>Badges</h2>
      <BadgesGrid>
        {verifiedBadges.map((badge) =>
          badge.unlocked ? (
            <BadgeWrapper>
              <UnlockedBadge>
                <img src={badge.image} alt={`${badge.title} badge`} />
              </UnlockedBadge>
              <BadgeTitle>{badge.title}</BadgeTitle>
            </BadgeWrapper>
          ) : (
            <BadgeWrapper>
              <LockedBadge>
                <span className="material-icons-outlined">locked</span>
              </LockedBadge>
              <BadgeTitle>{badge.title}</BadgeTitle>
            </BadgeWrapper>
          ),
        )}
      </BadgesGrid>
    </AccountWrapper>
  );
};

export default Account;
