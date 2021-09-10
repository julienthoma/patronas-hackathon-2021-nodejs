import { KillFeedNew } from "../components/KillFeedNEW";

export const ExamplePage = (): JSX.Element => <div>
    <KillFeedNew killFeedItems={[
    {
      killer: 'Heri',
      target: 'spezi|Fanta',
      weapon: '9mmAR',
      killerWonId: 'STEAM_0:1:623127735',
      targetWonId: 'STEAM_0:1:63894'
    },
    {
      killer: 'Heri',
      target: 'Lox',
      weapon: '9mmAR',
      killerWonId: 'STEAM_0:1:623127735',
      targetWonId: 'STEAM_0:0:1441739'
    },
    {
      killer: 'BloodyM_is_back',
      target: 'Lox',
      weapon: 'shotgun',
      killerWonId: 'STEAM_0:1:622964031',
      targetWonId: 'STEAM_0:0:1441739'
    },
    {
      killer: 'BloodyM_is_back',
      target: 'Leonardo',
      weapon: 'shotgun',
      killerWonId: 'STEAM_0:1:622964031',
      targetWonId: 'STEAM_0:0:123294480'
    },
    {
      killer: 'BloodyM_is_back',
      target: 'spezi|Fanta',
      weapon: 'shotgun',
      killerWonId: 'STEAM_0:1:622964031',
      targetWonId: 'STEAM_0:1:63894'
    }
  ]} />
</div>;
