import { KillFeed } from '../components/KillFeed';
import { useStoreState } from '../hooks';
import { KillRanking } from '../components/KillRanking';
import { Box } from '@material-ui/core';

export const StartPage = (): JSX.Element => {
  const killFeedItems = useStoreState(state => state.recentKillFeedItems);
  const players = useStoreState(state => state.players);
  return (
    <Box display="flex">
      <Box flexGrow={2} m={4}>
        <KillRanking players={players} />
      </Box>
      <Box m={4}>
        <KillFeed killFeedItems={killFeedItems} />
      </Box>
    </Box>
  );
};
