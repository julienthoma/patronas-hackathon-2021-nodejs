import { createTypedHooks } from 'easy-peasy';
import { IStoreModel } from '../store/store';

export const { useStoreActions, useStoreState, useStoreDispatch, useStore } =
  createTypedHooks<IStoreModel>();
