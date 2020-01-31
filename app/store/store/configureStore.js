// import rootReducer from '../reducer';
// import {createStore, applyMiddleware} from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import {createLogger} from 'redux-logger';
// import sagas from 'sagas';

// const sagaMiddleware = createSagaMiddleware();
// let middleware;

// /* global __DEV__ */
// if (__DEV__) {
//   middleware = applyMiddleware(sagaMiddleware, createLogger());
// } else {
//   middleware = applyMiddleware(sagaMiddleware);
// }

// const store = createStore(rootReducer, middleware);
// sagaMiddleware.run(sagas);
// export default store;

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducer';

const initialState = {};

let middleware;
if (__DEV__) {
  middleware = applyMiddleware(thunk, createLogger());
} else {
  middleware = applyMiddleware(thunk);
}
const store = createStore(rootReducer, initialState, middleware);

export default store;
