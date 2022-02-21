import { put, call } from 'redux-saga/effects';
import {
    RESET_ERROR,
    RESET_SUCEESS
} from '../actionTypes';
import { resetPassService } from '../configration/service';

function* resetPassSaga(action) {
    try {
        const data = yield call(resetPassService, action.payload)
        if (data?.data?.status === 200) {
            yield put({ type: RESET_SUCEESS, payload: data })
            const navigation = useNavigation();
            yield navigation.navigate("First");
        } else {

            yield put({ type: RESET_ERROR, payload: data })
        }
    } catch (e) {
        yield put({ type: RESET_ERROR, payload: e })
    }
}

export default resetPassSaga;