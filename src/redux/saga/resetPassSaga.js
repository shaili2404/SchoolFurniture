import { put, call } from 'redux-saga/effects';
import {
    RESET_ERROR,
    RESET_SUCEESS
} from '../actionTypes';
import { resetPassService } from '../configration/service';
import { navigate } from '../../routes/rootNavigation';

function* resetPassSaga(action) {
    try {
        const data = yield call(resetPassService, action.payload)
        yield put({ type: RESET_SUCEESS, payload: data })
        navigate('');
    } catch (e) {
        yield put({ type: RESET_ERROR, payload: e })
    }
}

export default resetPassSaga;