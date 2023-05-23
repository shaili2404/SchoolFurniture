import axios from "axios";
import { Baseurl } from "./baseurl";
import Config from "react-native-config";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json'

export const getRequest = (url) => {
    return axios.get(url)
}

export const postRequest = (url, data) => {
    return axios.post(`${Config.API_URL}${url}`, data)
}

export const putRequest = (url, data) => {
    return axios.put(url, data)
}

export const setBasseUrl = () => {
    axios.defaults.baseURL = Config.API_URL
}

export const setAuthentication = (Token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
}

export const loginRequest = (url, data) => {
    return axios.post(`${Config.API_URL}${url}`, data,{
      headers: { 'Content-Type': 'multipart/form-data' },
      transformRequest: data => data,
    })
  }
