import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { AppRoute } from './types/routes';
import { StartPage } from './pages/StartPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { IKillFeedItem, KillStreak, SocketMessageType } from '../shared/types';
import { useStoreActions } from './hooks';
import { killStreakSounds } from './types/KillStreak';
import './styles/main.css';

const socket = io('http://localhost:3001');

const App = (): JSX.Element => {
  const { addKillFeedItem, updatePlayers, updateConnectEvents, updateWeaponMap } = useStoreActions(
    actions => actions
  );

  useEffect(() => {
    socket.on(SocketMessageType.KILL_FEED, (data: IKillFeedItem) => {
      addKillFeedItem(data);
    });
    socket.on(SocketMessageType.PLAYER_FEED, data => {
      updatePlayers(data);
    });

    socket.on(SocketMessageType.CONNECT_FEED, data => {
      updateConnectEvents(data);
    });

    socket.on(SocketMessageType.WEAPONS, data => {
      updateWeaponMap(data);
    });

    socket.on(SocketMessageType.KILL_STREAK_EVENT, (data: KillStreak) => {
      new Audio(killStreakSounds[data]).play();
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>HALF LIFE STATS</title>
      </Helmet>
      <Switch>
        <Route path={AppRoute.StartPage} exact>
          <StartPage />
        </Route>
        <Route path={'/'}>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
};

export default App;
