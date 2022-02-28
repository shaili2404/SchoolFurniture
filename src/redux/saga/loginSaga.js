import { call, put } from 'redux-saga/effects';
import {
    LOGIN_SUCEESS,
    LOGIN_ERROR
} from '../actionTypes'
import { loginService } from '../configration/service';
// import { useNavigation } from '@react-navigation/native'; 
import { storeData, getSaveData, removeData, clearAll } from '../../utils/helpers';
import { navigate } from '../../routes/rootNavigation';
import NavigationRouteNames from "../../routes/ScreenNames";

import { CommonActions } from '@react-navigation/native';

function* loginSaga(action) {
    try {
        const data = yield call(loginService, action.payload)
        console.log("check",data);
        storeData('token',data?.data?.access_token);
        navigate(NavigationRouteNames.FIRST);
        if (data?.data?.status === 200) {
            yield put({ type: LOGIN_SUCEESS, payload: data })
            //  navigation.navigate("First");
        } else {
            yield put({ type: LOGIN_ERROR, payload: data })
        }
       
    } catch (e) {
        yield put({ type: LOGIN_ERROR, payload: e })
    }
}

export default loginSaga;