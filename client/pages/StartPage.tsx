import { KillFeed } from '../components/KillFeed';

export const StartPage = (): JSX.Element => (
  <div>
    <h1>StartPage</h1>
    <KillFeed
      feedItems={[
        {
          killerName: 'Test',
          target: 'Test2',
          weapon: '9mm_pistol',
        },
        {
          killerName: 'Test2',
          target: 'Test3',
          weapon: 'assault_shotgun',
        },
        {
          killerName: 'Test3',
          target: 'Test4',
          weapon: 'gloun_gun',
        },
        {
          killerName: 'Test5',
          target: 'Test6',
          weapon: 'hivehand',
        },
        {
          killerName: 'Test7',
          target: 'Test8',
          weapon: 'laser_tripmine',
        },
      ]}
    />
  </div>
);
