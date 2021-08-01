import { h } from 'preact';
import { styled } from 'goober';
import { useEffect, useState } from 'preact/hooks';

import Home from './pages/Home';
import handleClick from './handleClick';
import DataProvider from './DataProvider';
import Day from './pages/Day';

const Wrapper = styled('div')`
  display: block;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled('header')`
  padding: 12px 24px;
  width: 100%;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  background: #fff;
  background: linear-gradient(#fff 85%, #fff0 100%);
`;

const Link = styled('a')`
  text-decoration: none;
  color: #525252;
`;

const App = () => {
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  const [prevRoute, setPrevRoute] = useState(null);

  useEffect(() => {
    const handlePush = ({ detail }: CustomEvent) => {
      setCurrentRoute(detail.url);
    };

    window.addEventListener('pushstate', handlePush);

    return () => window.removeEventListener('pushstate', handlePush);
  }, []);

  return (
    <DataProvider>
      <Wrapper>
        <Header>
          <Link href="/account" onClick={handleClick('/account')}>
            <span className="material-icons-outlined">account_circle</span>
          </Link>
          {currentRoute !== '/' && (
            <Link href="/" onClick={handleClick('/')}>
              <span className="material-icons-outlined">home</span>
            </Link>
          )}
          <Link href="/settings" onClick={handleClick('/settings')}>
            <span className="material-icons-outlined">settings</span>
          </Link>
        </Header>
        {currentRoute === '/' && <Home />}
        {currentRoute.includes('/day') && <Day />}
      </Wrapper>
    </DataProvider>
  );
};

export default App;
