import { KillFeed } from '../components/KillFeed';
import { useStoreState } from '../hooks';
import { KillRanking } from '../components/KillRanking';
import { Box } from '@material-ui/core';
import { OnlineList } from '../components/OnlineList';
import { WeaponList } from '../components/WeaponList';

export const StartPage = (): JSX.Element => {
  const killFeedItems = useStoreState(state => state.recentKillFeedItems);
  const players = useStoreState(state => state.players);
  const playerMap = useStoreState(state => state.playerMap);
  const weaponMap = useStoreState(state => state.weaponMap);
  const onlinePlayers = useStoreState(state => state.onlinePlayers);
  return (
    <>
      <Box display="flex">
        <Box flexGrow={2} m={4}>
          <Box display="flex" flexDirection="column">
            <KillRanking players={players} connectedPlayers={onlinePlayers} />
            <WeaponList weapons={weaponMap} playerMap={playerMap} />
          </Box>
        </Box>
        <Box m={4} zIndex={2}>
          <Box display="flex" flexDirection="column">
            <KillFeed killFeedItems={killFeedItems} />
            <OnlineList players={onlinePlayers} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
