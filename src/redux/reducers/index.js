import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import resetPassReducer from "./resetPassReducer";

const rootReducer = combineReducers({
    loginData: loginReducer,
    resetpassData: resetPassReducer
})

export default rootReducer