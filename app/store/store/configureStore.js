import rootReducer from '../reducer';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import sagas from 'sagas';

const sagaMiddleware = createSagaMiddleware();
let middleware;

/* global __DEV__ */
if (__DEV__) {
  middleware = applyMiddleware(sagaMiddleware, createLogger());
} else {
  middleware = applyMiddleware(sagaMiddleware);
}

const store = createStore(rootReducer, middleware);
sagaMiddleware.run(sagas);
export default store;
