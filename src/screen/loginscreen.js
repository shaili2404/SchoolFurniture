
import axios from "axios";
import React, { useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/actions/loginAction";

export const LoginScreen = () => {
    const [email, setEmail] = useState('testsandeep404@gmail.com');
    const [password, setPassword] = useState('Admin12345');
    const dispatch = useDispatch()

    const onLogin = async () => {
        var data = {
            "email": "testsandeep404@gmail.com",
            "password": "Admin@123"
        }
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Accept'] = 'application/json'
        dispatch(loginRequest(data))
    }

    const login = useSelector(state => state.loginData)
    //console.log("loginVal", login);

    return (
        <TouchableOpacity onPress={onLogin}>
            <Text style={{ textAlign: 'center', marginTop: 100, fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>
    )
}