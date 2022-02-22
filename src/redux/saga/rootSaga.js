import { takeLatest } from "@redux-saga/core/effects";
import { LOGIN_REQUEST, RESET_REQUEST } from '../actionTypes';
import loginSaga from "./loginSaga";
import resetPassSaga from "./resetPassSaga";

function* rootSaga() {
    yield takeLatest(LOGIN_REQUEST, loginSaga)
    yield takeLatest(RESET_REQUEST, resetPassSaga)
}

export default rootSaga;