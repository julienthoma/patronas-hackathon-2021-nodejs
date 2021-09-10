import { KillFeed } from '../components/KillFeed';

export const StartPage = (): JSX.Element => (
  <div>
    <h1>StartPage</h1>
    <KillFeed
      feedItems={[
        {
          killerName: 'Test',
          target: 'Test2',
          weapon: 'AK',
        },
        {
          killerName: 'Test2',
          target: 'Test3',
          weapon: 'AK',
        },
        {
          killerName: 'Test3',
          target: 'Test4',
          weapon: 'AK',
        },
        {
          killerName: 'Test5',
          target: 'Test6',
          weapon: 'AK',
        },
        {
          killerName: 'Test7',
          target: 'Test8',
          weapon: 'AK',
        },
      ]}
    />
  </div>
);
