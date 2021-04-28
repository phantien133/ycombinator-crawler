import get from 'lodash/get';

export const newsSelector = (state) => state.newsState;

export const newSelector = (state, { match: { params: { id } } }) => ({
  item: get(state, `newsState.idNews[${id}]`) || {},
});

export const responseDataSelector = (data) => ({
  news: get(data, 'data') || [],
  more: get(data, 'more') || false,
});
