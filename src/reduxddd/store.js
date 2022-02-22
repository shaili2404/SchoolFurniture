import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
console.log("getInitaial", store.getState())
// store.dispatch()
sagaMiddleware.run(rootSaga)
export default store;