import { KillFeed } from '../components/KillFeed';
import { useStoreState } from '../hooks';

export const StartPage = (): JSX.Element => {
  const killFeedItems = useStoreState(state => state.recentKillFeeditems);
  return (
    <div>
      <h1>StartPage</h1>
      <KillFeed killFeedItems={killFeedItems} />
    </div>
  );
};
