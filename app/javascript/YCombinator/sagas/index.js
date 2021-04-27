import { all, fork } from 'redux-saga/effects';

import newsSaga from './newsSaga';

export default function* () {
  yield all([
    fork(newsSaga),
  ]);
}
