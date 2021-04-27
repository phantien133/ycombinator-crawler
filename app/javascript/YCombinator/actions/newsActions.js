import { createActions } from 'redux-actions';
import { ActionTypes } from '../constants';

export const {
  updateNews,
  fetchNews,
  cleanNews,
} = createActions({
  [ActionTypes.UPDATE_NEWS]: (payload) => payload,
  [ActionTypes.FETCH_NEWS]: (payload) => ({ keyword: payload }),
  [ActionTypes.CLEAN_NEWS]: undefined,
});
