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
        console.log("getData", data)
        const status =  data?.user?.data?.status
        if (status === 200) {
            // Navigate
          } 
    } catch (e) {
        yield put({ type: LOGIN_ERROR, payload: e })
         console.log('15',e)
    }
}

export default loginSaga;