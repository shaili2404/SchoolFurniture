import React, { useState } from "react";
import { TouchableOpacity,Text } from "react-native";
import { useDispatch } from "react-redux";
import { loginService } from "../redux/configration/service";
import loginSaga from "../redux/saga/loginSaga";

export const LoginScreen = ()=>{
 const [email,setEmail] = useState('testsandeep404@gmail.com');
 const [password,setPassword] = useState('Admin12345');
 const dispatch = useDispatch()

  const onLogin = async  ()=>{
        let data = new FormData();
        data.append('email',email)
        data.append('password',password)
        //let data ={'email':email,'password':password}
         dispatch(loginSaga(data))


        
        //  const response = await  loginService(data)
        // console.log(response)
    }
 return (
  <TouchableOpacity onPress={onLogin}>
      <Text>Login</Text>
  </TouchableOpacity>
 )  
}