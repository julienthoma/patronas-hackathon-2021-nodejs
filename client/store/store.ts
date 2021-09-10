import { action, Action, computed, Computed, createStore } from 'easy-peasy';
import { IKillFeedItem } from '../../shared/types';

export type IStoreModel = {
  killFeedItems: IKillFeedItem[];
  addKillFeedItem: Action<IStoreModel, IKillFeedItem>;
  recentKillFeeditems: Computed<IStoreModel, IKillFeedItem[]>;
};

export const store = createStore<IStoreModel>({
  killFeedItems: [],
  addKillFeedItem: action((state, payload) => {
    state.killFeedItems.unshift(payload);
  }),
  recentKillFeeditems: computed(
    [state => state.killFeedItems],
    items => items.slice(0, 10)
  )
});
