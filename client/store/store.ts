import { action, Action, computed, Computed, createStore } from 'easy-peasy';
import { IKillFeedItem, IPlayer } from '../../shared/types';
import { IConnectEvent } from '../../server/MessageParser';

export type IStoreModel = {
  killFeedItems: IKillFeedItem[];
  connectEvents: IConnectEvent[];
  onlinePlayers: Computed<IStoreModel, IPlayer[]>;
  playerMap: Record<string, IPlayer>;
  players: Computed<IStoreModel, IPlayer[]>;
  addKillFeedItem: Action<IStoreModel, IKillFeedItem>;
  recentKillFeedItems: Computed<IStoreModel, IKillFeedItem[]>;
  updatePlayers: Action<IStoreModel, Record<string, IPlayer>>;
  updateConnectEvents: Action<IStoreModel, IConnectEvent[]>;
};

export const store = createStore<IStoreModel>({
  killFeedItems: [],
  playerMap: {},
  connectEvents: [],
  players: computed([state => state.playerMap], playerMap =>
    Object.keys(playerMap).map(key => playerMap[key])
  ),
  onlinePlayers: computed(
    [state => state.connectEvents, state => state.playerMap],
    (connectEvents, playerMap) => {
      const connectedMap: Record<string, boolean> = {};

      connectEvents.forEach(event => {
        connectedMap[event.steamId] = event.isConnectEvent;
      });

      const connectedPlayers: IPlayer[] = [];

      for (const [steamId, isOnline] of Object.entries(connectedMap)) {
        if (isOnline) {
          connectedPlayers.push(playerMap[steamId]);
        }
      }

      return connectedPlayers;
    }
  ),
  addKillFeedItem: action((state, payload) => {
    state.killFeedItems.unshift(payload);
  }),
  recentKillFeedItems: computed([state => state.killFeedItems], items => items.slice(0, 10)),
  updatePlayers: action((state, payload) => {
    state.playerMap = payload;
  }),
  updateConnectEvents: action((state, payload) => {
    state.connectEvents = payload;
  }),
});
