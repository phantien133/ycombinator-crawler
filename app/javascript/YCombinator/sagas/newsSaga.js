import {
  takeLatest, all, call, put,
} from 'redux-saga/effects';

import {
  fetchNews,
  updateNews,
  cleanNews,
} from '../actions/newsActions';
// import { responseDataSelector } from '../selectors/newsSelector';

export function* fetchNewsSaga(actions) {
  try {

  } catch (e) {
    // do nothing at the moment
  }
}

export default function* () {
  yield all([
    takeLatest(fetchNews, fetchNewsSaga),
  ]);
}
