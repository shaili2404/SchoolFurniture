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
        navigate('EmailSent');
        if (data?.data?.status === 200) {
            yield put({ type: RESET_SUCEESS, payload: data })
            const navigation = useNavigation();
            yield navigation.navigate("First");
        } else {

            yield put({ type: RESET_ERROR, payload: data })
        }
        // yield put({ type: RESET_SUCEESS, payload: data })
        // const navigation = useNavigation();
    } catch (e) {
        yield put({ type: RESET_ERROR, payload: e })
    }
}

export default resetPassSaga;