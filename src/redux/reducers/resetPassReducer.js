import {
    RESET_REQUEST,
    RESET_SUCEESS,
    RESET_ERROR
} from "../actionTypes"

const initialState = {
    loading: false,
    user: [],
    err: ''
}

const resetPassReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_REQUEST:
            return {
                ...state,
                loading: true
            }
        case RESET_SUCEESS:
            return {
                loading: false,
                user: action.payload,
                err: ''
            }
        case RESET_ERROR:
            return {
                loading: false,
                user: [],
                err: action.payload
            }
        default: return state
    }
}

export default resetPassReducer;