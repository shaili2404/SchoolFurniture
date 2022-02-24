import { call, put } from 'redux-saga/effects';
import {
    LOGIN_SUCEESS,
    LOGIN_ERROR
} from '../actionTypes'
import { loginService } from '../configration/service';
import { navigate } from '../../routes/rootNavigation';

function* loginSaga(action) {
    //const navigation = useNavigation();
    try {
        const data = yield call(loginService, action.payload)
        yield put({ type: LOGIN_SUCEESS, payload: data })
        navigate('PasswordReset');
    } catch (e) {
        yield put({ type: LOGIN_ERROR, payload: e })
    }
}

export default loginSaga;