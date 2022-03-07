import { call, put } from 'redux-saga/effects';
import {
    LOGIN_SUCEESS,
    LOGIN_ERROR
} from '../actionTypes'
import { loginService } from '../configration/service';
import { storeData } from '../../utils/helpers';
import { navigate } from '../../routes/rootNavigation';
import { setAuthentication } from '../configration';

function* loginSaga(action) {
    try {
        const data = yield call(loginService, action.payload)
        storeData('token', data?.data?.access_token);
        setAuthentication(data?.data?.access_token);
        navigate('First');
        if (data?.data?.status === 200) {
            yield put({ type: LOGIN_SUCEESS, payload: data })
        } else {
            yield put({ type: LOGIN_ERROR, payload: data })
        }

    } catch (e) {
        yield put({ type: LOGIN_ERROR, payload: e })
    }
}

export default loginSaga;