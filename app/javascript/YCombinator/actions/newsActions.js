import { createActions } from 'redux-actions';
import { ActionTypes } from '../constants';

export const {
  changePage,
  updateNews,
  fetchNews,
  cleanNews,
} = createActions({
  [ActionTypes.CHANGE_PAGE]: (payload) => payload,
  [ActionTypes.UPDATE_NEWS]: (payload) => payload,
  [ActionTypes.FETCH_NEWS]: (page) => ({ page }),
  [ActionTypes.CLEAN_NEWS]: undefined,
});
