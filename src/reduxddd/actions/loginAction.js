import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCEESS } from "../actionTypes"

export const loginRequest = (payload) => ({
    type: LOGIN_REQUEST,
    payload
});

export const loginSuccess = (payload) => ({
    type: LOGIN_SUCEESS,
    payload,
});

export const loginError = (payload) => ({
    type: LOGIN_ERROR,
    payload,
});