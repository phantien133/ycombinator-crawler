import { handleActions } from 'redux-actions';

import {
  updateNews,
  cleanNews,
  changePage,
} from '../actions/newsActions';

export const initialState = {
  page: 1,
  isLoading: true,
  news: [],
  more: false,
  updatedAt: new Date(),
};

export default handleActions({
  [updateNews]: (state, action) => ({
    ...state, ...action.payload, isLoading: false, updatedAt: new Date().getTime(),
  }),
  [changePage]: (state, action) => ({
    ...state, page: action.payload, isLoading: true, updatedAt: new Date().getTime(),
  }),
  [cleanNews]: () => initialState,
}, initialState);
