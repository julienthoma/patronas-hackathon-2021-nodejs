import { action, Action, computed, Computed, createStore } from 'easy-peasy';
import { IKillFeedItem, IPlayer } from '../../shared/types';

export type IStoreModel = {
  killFeedItems: IKillFeedItem[];
  players: IPlayer[];
  addKillFeedItem: Action<IStoreModel, IKillFeedItem>;
  recentKillFeedItems: Computed<IStoreModel, IKillFeedItem[]>;
  updatePlayers: Action<IStoreModel, IPlayer[]>;
};

export const store = createStore<IStoreModel>({
  killFeedItems: [],
  players: [],
  addKillFeedItem: action((state, payload) => {
    state.killFeedItems.unshift(payload);
  }),
  recentKillFeedItems: computed([state => state.killFeedItems], items => items.slice(0, 10)),
  updatePlayers: action((state, payload) => {
    state.players = payload;
  }),
});
