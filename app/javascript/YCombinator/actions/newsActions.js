import { createActions } from 'redux-actions';
import { ActionTypes } from '../constants';

export const {
  changePage,
  updateNews,
  updateNew,
  fetchNews,
  fetchNew,
  cleanNews,
} = createActions({
  [ActionTypes.CHANGE_PAGE]: (payload) => payload,
  [ActionTypes.UPDATE_NEWS]: (payload) => payload,
  [ActionTypes.UPDATE_NEW]: (payload) => payload,
  [ActionTypes.FETCH_NEWS]: (page) => ({ page }),
  [ActionTypes.FETCH_NEW]: (payload) => payload,
  [ActionTypes.CLEAN_NEWS]: undefined,
});
