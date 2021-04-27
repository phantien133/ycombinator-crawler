import {
  takeLatest, all, call, put,
} from 'redux-saga/effects';

import {
  changePage,
  fetchNews,
  updateNews,
} from '../actions/newsActions';
import { responseDataSelector } from '../selectors/newsSelector';
import { newsApi } from '../services/api/NewsApi';

export function* fetchNewsSaga(actions) {
  const { payload: { page } } = actions;
  try {
    yield put(changePage(page));
    const response = yield call([newsApi, newsApi.list], page);
    yield put(updateNews(responseDataSelector(response.data)));
  } catch (e) {
    setTimeout(function* () {
      yield put(fetchNews(page));
    }, 30000);
  }
}

export default function* () {
  yield all([
    takeLatest(fetchNews, fetchNewsSaga),
  ]);
}
