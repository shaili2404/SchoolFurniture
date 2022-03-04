import axios from "axios";
import { Baseurl } from "./baseurl";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json'

export const getRequest = (url) => {
    return axios.get(url)
}

export const postRequest = (url, data) => {
    return axios.post(`${Baseurl}${url}`, data)
}

export const putRequest = (url, data) => {
    return axios.put(url, data)
}

export const setBasseUrl = () => {
    axios.defaults.baseURL = Baseurl
}

export const setAuthentication = (Token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
}
