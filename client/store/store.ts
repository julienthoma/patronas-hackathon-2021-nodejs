import { action, Action, createStore } from 'easy-peasy';
import { IKillFeedItem } from '../../server/KillFeedParser';

export type IStoreModel = {
  killFeedItems: IKillFeedItem[];
  addKillFeedItem: Action<IStoreModel, IKillFeedItem>;
};

export const store = createStore<IStoreModel>({
  killFeedItems: [],
  addKillFeedItem: action((state, payload) => {
    state.killFeedItems.push(payload);
  }),
});
