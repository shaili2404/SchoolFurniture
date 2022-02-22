import { postRequest } from ".";
import endUrl from "./endUrl";

export const loginService = (payload) => postRequest(endUrl.login, payload);
export const resetPassService = (payload) => postRequest(endUrl.resetPassword, payload);