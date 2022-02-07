import { 
    LOGIN_ERROR,
    LOGIN_REQUEST,
    LOGIN_SUCEESS
} from "../actionTypes"

const initialState = {
    loading:false,
    user:[],
    err:''
}

const loginReducer = (state = initialState,action) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return{
                ...state,
                loading:true
            }
        case LOGIN_SUCEESS:
            return{
                loading:false,
                user:action.payload,
                err:''
            }
        case LOGIN_ERROR:
            return{
                loading:false,
                user:[],
                err:action.payload
            }
        default:return state
    }
}

export default loginReducer;