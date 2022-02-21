import { call, put } from 'redux-saga/effects';
import {
    LOGIN_SUCEESS,
    LOGIN_ERROR
} from '../actionTypes'
import { loginService } from '../configration/service';
import { useNavigation } from '@react-navigation/native';

function* loginSaga(action) {
    const navigation = useNavigation();
    try {
        const data = yield call(loginService, action.payload)
        console.log("check",data);
        if (data?.data?.status === 200) {
            yield put({ type: LOGIN_SUCEESS, payload: data })
            navigation.navigate("First");
        } else {
            yield put({ type: LOGIN_ERROR, payload: data })
        }
    } catch (e) {
        yield put({ type: LOGIN_ERROR, payload: e })
    }
}

export default loginSaga;