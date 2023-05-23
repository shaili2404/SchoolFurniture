import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginRequest, postRequest } from '.'
import { logout } from '../../utils/helpers'
import endUrl from './endUrl'

export const loginService = (payload) => loginRequest(endUrl.login, payload)
export const resetPassService = (payload) =>
  postRequest(endUrl.resetPassword, payload)

export const saveTokenInLocalStorage = (tokenDetails) => {
  AsyncStorage.setItem('userDetails', JSON.stringify(tokenDetails))
}

export const runLogoutTimer = (timer) => {
  setTimeout(() => {
    logout()
  }, timer)
}
