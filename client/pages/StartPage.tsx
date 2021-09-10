import { KillFeed } from '../components/KillFeed';
import { useStoreState } from '../hooks';

export const StartPage = (): JSX.Element => {
  const killFeedItems = useStoreState(state => state.recentKillFeedItems);
  return (
    <div>
      <KillFeed killFeedItems={killFeedItems} />
    </div>
  );
};
