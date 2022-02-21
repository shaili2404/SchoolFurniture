import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
    loginData:loginReducer
})

export default rootReducer