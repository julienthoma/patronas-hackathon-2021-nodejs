import { action, Action, computed, Computed, createStore } from 'easy-peasy';
import { IKillFeedItem, IPlayer } from '../../shared/types';

export type IStoreModel = {
  killFeedItems: IKillFeedItem[];
  playerMap: Record<string, IPlayer>;
  players: Computed<IStoreModel, IPlayer[]>;
  addKillFeedItem: Action<IStoreModel, IKillFeedItem>;
  recentKillFeedItems: Computed<IStoreModel, IKillFeedItem[]>;
  updatePlayers: Action<IStoreModel, Record<string, IPlayer>>;
};

export const store = createStore<IStoreModel>({
  killFeedItems: [],
  playerMap: {},
  players: computed([state => state.playerMap], playerMap =>
    Object.keys(playerMap).map(key => playerMap[key])
  ),
  addKillFeedItem: action((state, payload) => {
    state.killFeedItems.unshift(payload);
  }),
  recentKillFeedItems: computed([state => state.killFeedItems], items => items.slice(0, 10)),
  updatePlayers: action((state, payload) => {
    state.playerMap = payload;
  }),
});
