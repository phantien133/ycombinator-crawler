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
  try {
    const { payload: { page } } = actions;
    yield put(changePage(page));
    const response = yield call([newsApi, newsApi.list], page);
    yield put(updateNews(responseDataSelector(response.data)));
  } catch (e) {
    // do nothing at the moment
  }
}

export default function* () {
  yield all([
    takeLatest(fetchNews, fetchNewsSaga),
  ]);
}
