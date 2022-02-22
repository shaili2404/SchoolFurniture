import axios from "axios";
import endUrl from "./endUrl";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json'

export const getRequest = () => {
    return axios.get(endUrl)
}

export const postRequest = (data) => {
    return axios.post(endUrl, data)
}

export const putRequest = (data) => {
    return axios.put(endUrl, data)
}