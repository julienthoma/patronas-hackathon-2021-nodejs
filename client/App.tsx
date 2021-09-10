import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from './components/Navigation';
import { Route, Switch } from 'react-router-dom';
import { AppRoute } from './types/routes';
import { StartPage } from './pages/StartPage';
import { ExamplePage } from './pages/ExamplePage';
import { NotFoundPage } from './pages/NotFoundPage';

const socket = io('http://localhost:3001');

const App = (): JSX.Element => {
  useEffect(() => {
    socket.on('time', data => {
      console.log(data);
    });
  }, [socket]);

  return (
    <>
      <Helmet>
        <title>HALF LIFE STATS</title>
      </Helmet>
      <Navigation />
      <Switch>
        <Route path={AppRoute.StartPage} exact>
          <StartPage />
        </Route>
        <Route path={AppRoute.ExamplePage} exact>
          <ExamplePage />
        </Route>
        <Route path={'/'}>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
};

export default App;
