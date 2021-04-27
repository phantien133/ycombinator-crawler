import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from './reducers';
import rootSaga from './sagas';

export const PERSIST_KEY = 'root';

const persistConfig = {
  key: PERSIST_KEY,
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['persistentItems'],
  transforms: [createTransform(
    (inboundState) => ({ ...inboundState, error: '' }),
    (outboundState) => ({ ...outboundState, error: '' }),
    { whitelist: ['persistentItems'] },
  )],
};

const sagaMiddleware = createSagaMiddleware();

const configDevStore = () => createStore(
  persistReducer(persistConfig, rootReducer),
  // eslint-disable-next-line no-underscore-dangle
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)(applyMiddleware(sagaMiddleware)),
);

const configProdStore = () => createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(sagaMiddleware),
);

export const store = process.env.NODE_ENV === 'production' ? configProdStore() : configDevStore();
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
