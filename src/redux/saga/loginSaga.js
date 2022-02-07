import { call, put } from 'redux-saga/effects';
import {
    LOGIN_SUCEESS,
    LOGIN_ERROR
} from '../actionTypes'
import { loginService } from '../configration/service';

function* loginSaga(action) {
    try {
        const data = yield call(loginService, action.payload)
        yield put({ type: LOGIN_SUCEESS, payload: data })
    } catch (e) {
        yield put({ type: LOGIN_ERROR, payload: e })
    }
}

export default loginSaga;