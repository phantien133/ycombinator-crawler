import {
  takeLatest, all, call, put,
} from 'redux-saga/effects';

import {
  changePage,
  fetchNews,
  fetchNew,
  updateNews,
  updateNew,
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

export function* fetchNewSaga(actions) {
  const { payload: { id, link } } = actions;
  try {
    const response = yield call([newsApi, newsApi.detail], id, link);
    yield put(updateNew({ ...response.data, id, loaded: true }));
  } catch (e) {
    yield put(updateNew({ id, loaded: true }));
  }
}

export default function* () {
  yield all([
    takeLatest(fetchNews, fetchNewsSaga),
    takeLatest(fetchNew, fetchNewSaga),
  ]);
}
