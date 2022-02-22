import { RESET_ERROR, RESET_REQUEST, RESET_SUCEESS } from "../actionTypes";

export const resetRequest = (payload) => ({
    type: RESET_REQUEST,
    payload
})

export const resetSuccess = (payload) => ({
    type: RESET_SUCEESS,
    payload
})

export const resetError = (payload) => ({
    type: RESET_ERROR,
    payload
})