import { handleActions } from 'redux-actions';

import {
  updateNews,
  updateNew,
  cleanNews,
  changePage,
} from '../actions/newsActions';

export const initialState = {
  page: 1,
  isLoading: true,
  news: [],
  idNews: {},
  more: false,
  updatedAt: new Date(),
};

const mergeIdNews = (state, news) => {
  const obj = { ...state.idNews };
  news.forEach((item) => {
    obj[item.id.toString()] = item.meta;
  });
  return obj;
};

export default handleActions({
  [updateNews]: (state, action) => ({
    ...state,
    ...action.payload,
    idNews: mergeIdNews(state, action.payload.news),
    isLoading: false,
    updatedAt: new Date().getTime(),
  }),
  [updateNew]: (state, { payload }) => ({
    ...state,
    updatedAt: new Date().getTime(),
    idNews: mergeIdNews(state, [{ id: payload.id, meta: payload }]),
  }),
  [changePage]: (state, action) => ({
    ...state, page: action.payload, isLoading: true, more: false, updatedAt: new Date().getTime(),
  }),
  [cleanNews]: () => initialState,
}, initialState);
