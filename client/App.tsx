import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from './components/Navigation';
import { Route, Switch } from 'react-router-dom';
import { AppRoute } from './types/routes';
import { StartPage } from './pages/StartPage';
import { ExamplePage } from './pages/ExamplePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { IKillFeedItem, KillStreak, SocketMessageType } from '../shared/types';
import { useStoreActions } from './hooks';
import { killStreakSounds } from './types/KillStreak';

const socket = io('http://localhost:3001');

const App = (): JSX.Element => {
  const { addKillFeedItems, updatePlayers } = useStoreActions(actions => actions);

  useEffect(() => {
    socket.on(SocketMessageType.KILL_FEED, (data: IKillFeedItem[]) => {
      addKillFeedItems(data);
    });
    socket.on(SocketMessageType.PLAYER_FEED, data => {
      updatePlayers(data);
    });

    socket.on(SocketMessageType.KILL_STREAK_EVENT, (data: KillStreak) => {
      console.log(data);
      new Audio(killStreakSounds[data]).play();
    });
  }, [socket]);

  return (
    <>
      <Helmet>
        <title>HALF LIFE STATS</title>
      </Helmet>
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
