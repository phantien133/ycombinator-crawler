import { handleActions } from 'redux-actions';

import {
  updateNews,
  cleanNews,
} from '../actions/newsActions';

export const initialState = {
  items: [],
  metadata: { totalHits: 0 },
  updatedAt: new Date(),
};

export default handleActions({
  [updateNews]: (state, action) => ({
    ...state, ...action.payload, updatedAt: new Date().getTime(),
  }),
  [cleanNews]: () => initialState,
}, initialState);
