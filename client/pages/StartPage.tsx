import { KillFeed } from '../components/KillFeed';
import { useStoreState } from '../hooks';
import { KillRanking } from '../components/KillRanking';
import { Box } from '@material-ui/core';

export const StartPage = (): JSX.Element => {
  const killFeedItems = useStoreState(state => state.recentKillFeedItems);
  const players = useStoreState(state => state.players);
  return (
    <>
      <video
        id="background-video"
        style={{ position: 'absolute', width: '100%', zIndex: -1, opacity: 0.3 }}
        playsInline
        autoPlay
        muted
        loop
        poster="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/730/4abc0f064d8ff94fa10570b1e5cb231331bb4049.jpg"
      >
        <source
          src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/730/28280d425d20a4d8cd9cfeff3389c234968ca301.webm"
          type="video/webm"
        />
        <source
          src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/730/2c007a6c2e9d7f11023bdf9dd31f6e4b048ee30d.mp4"
          type="video/mp4"
        />
      </video>
      <Box display="flex">
        <Box flexGrow={2} m={4}>
          <KillRanking players={players} />
        </Box>
        <Box m={4} zIndex={2}>
          <KillFeed killFeedItems={killFeedItems} />
        </Box>
      </Box>
    </>
  );
};
