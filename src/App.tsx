import { h } from 'preact';
import { styled } from 'goober';
import { useEffect, useState } from 'preact/hooks';
import { Route, Link as RouterLink } from 'wouter-preact';

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
          <RouterLink href="/account">
            <Link>
              <span className="material-icons-outlined">account_circle</span>
            </Link>
          </RouterLink>
          {currentRoute !== '/' && (
            <RouterLink href="/">
              <Link href="/">
                <span className="material-icons-outlined">home</span>
              </Link>
            </RouterLink>
          )}
          <RouterLink href="/settings">
            <Link href="/settings">
              <span className="material-icons-outlined">settings</span>
            </Link>
          </RouterLink>
        </Header>
        <Route path="/" component={Home} />
        <Route path="/day/:day" component={Day} />
      </Wrapper>
    </DataProvider>
  );
};

export default App;
