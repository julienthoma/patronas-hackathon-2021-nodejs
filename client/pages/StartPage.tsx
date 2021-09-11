import { KillFeed } from '../components/KillFeed';
import { useStoreState } from '../hooks';
import { KillRanking } from '../components/KillRanking';
import { Box } from '@material-ui/core';
import { OnlineList } from '../components/OnlineList';

export const StartPage = (): JSX.Element => {
  const killFeedItems = useStoreState(state => state.recentKillFeedItems);
  const players = useStoreState(state => state.players);
  const onlinePlayers = useStoreState(state => state.onlinePlayers);
  return (
    <>
      <Box display="flex">
        <Box flexGrow={2} m={4}>
          <KillRanking players={players} connectedPlayers={onlinePlayers} />
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
