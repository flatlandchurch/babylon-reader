import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { styled } from 'goober';
import { Route, Link as RouterLink, useLocation } from 'wouter-preact';

import Home from './pages/Home';
import DataProvider from './DataProvider';
import Day from './pages/Day';
import Auth from './Auth';

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
  const [pathname] = useLocation();
  const [isAuthed, setIsAuthed] = useState<boolean | 'unknown'>('unknown');

  useEffect(() => {
    fetch('/.netlify/functions/validate')
      .then((d) => {
        setIsAuthed(false);
      })
  }, []);

  return (
    <DataProvider>
      <Wrapper>
        <Header>
          {
            isAuthed === true &&
            <RouterLink href="/account">
              <Link>
                <span className="material-icons-outlined">account_circle</span>
              </Link>
            </RouterLink>
          }
          {pathname !== '/' && (
            <RouterLink href="/">
              <Link href="/">
                <span className="material-icons-outlined">home</span>
              </Link>
            </RouterLink>
          )}
        </Header>
        {
          !isAuthed &&
            <Auth />
        }
        {
          isAuthed === true &&
            <Fragment>
              <Route path="/" component={Home} />
              <Route path="/day/:day" component={Day} />
            </Fragment>
        }
      </Wrapper>
    </DataProvider>
  );
};

export default App;
