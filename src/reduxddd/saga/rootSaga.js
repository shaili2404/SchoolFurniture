import { takeLatest } from "@redux-saga/core/effects";
import { LOGIN_REQUEST } from '../actionTypes';
import loginSaga from "./loginSaga";

function* rootSaga() {
    yield takeLatest(LOGIN_REQUEST, loginSaga)
}

export default rootSaga;