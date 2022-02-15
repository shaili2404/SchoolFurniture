import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet, Dimensions, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import KeyboardAvoidingView from "react-native/Libraries/Components/Keyboard/KeyboardAvoidingView";
import COLORS from "../asset/colors";
import { LogoImg } from "../atoms/logo";
import constants from "../locales/constants";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../redux/actions/loginAction";
import { regExpEmail, regExpPassword } from "../locales/regexp";
import axios from "axios";
import Images from "../asset/images";
export const LoginScreen = () => {
    const [defaultState, setDefaultState] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage1, setErrorMessage1] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [textEntery, setTextEntry] = useState(true);
    const dispatch = useDispatch()

    const onChangeEmail = (email) => {
     if(email==''){
      setErrorMessage1(constants.ValidEmail)
      setEmail(email)
     }
     else if (!regExpEmail.test(email)){
         setErrorMessage1(constants.ValidEmail)
         setEmail(email)
     }
     else{
         setErrorMessage1('')
         setEmail(email)
     }
    }
    const onChangePass = (password) => {
        if(password==''){
            setErrorMessage2(constants.VaildPass)
            setPassword(password)
           }
           else if (!regExpPassword.test(password)){
               setErrorMessage2(constants.VaildPass)
               setPassword(password)
           }
           else{
               setErrorMessage2('')
               setPassword(password)
           }
    }
    const onLogin = async () => {
        if (email==''&&password==''){
            Alert.alert("hey")
        }
        else{
         var data = {
            "email": email,
            "password": password
          }
         axios.defaults.headers.common['Content-Type'] = 'application/json';
         axios.defaults.headers.common['Accept'] = 'application/json'
         dispatch(loginRequest(data))
        }
    }

    const haha = useSelector(state => state.loginData)
    console.log("loginVal", haha);

    return (
        <SafeAreaView style={Styles.mainView}>
            <KeyboardAvoidingView>
            <View>
                <LogoImg />
            </View>
            <View style={Styles.loginView}>
                <Text style={Styles.loginText}>{constants.Login}</Text>
            </View>
            <View style={Styles.inputStyles}>
                {defaultState===true?
                <View style={Styles.changeView}>
                    <Text style={Styles.changeText}>Enter Username </Text>
                </View>
                : null}
                <View>
                    <TextInput
                        style={Styles.emailInputStyle}
                        placeholder={defaultState === true ? "500100196" : "Enter Userame"}
                        placeholderTextColor={COLORS.Black}
                        value={email}
                        onFocus={() => setDefaultState(true)}
                        onBlur={() => setDefaultState(false)}
                        onChangeText={(email)=>onChangeEmail(email)}
                        opacity={defaultState === true ? 1 : 0.5} />
                        {errorMessage1?
                        <Text style={Styles.errorStyle}>{errorMessage1}</Text>:null}
                </View>
                <View style={Styles.passView} >
                {defaultState===true?
                <View style={Styles.changeView}>
                <Text style={Styles.changeText}>Enter Password</Text>
                </View>
                :
                null}
                    <TextInput
                        style={Styles.passInputStyle}
                        placeholder={defaultState === true ? "********" : "Enter Password"}
                        placeholderTextColor={COLORS.Black}
                        value={password}
                        onFocus={() => setDefaultState(true)}
                        onBlur={() => setDefaultState(false)}
                        onChangeText={(password)=>onChangePass(password)}
                        secureTextEntry={textEntery}
                        opacity={defaultState === true ? 1 : 0.5} />
                        <TouchableOpacity style={Styles.eyeStyle} onPress={()=>{textEntery === true? setTextEntry(false) : setTextEntry(true)}} >
                        <Image source={defaultState === true? Images.Eye_off: Images.Eye} style={Styles.imgStyle}/>
                        </TouchableOpacity>
                         {errorMessage2?
                        <Text style={Styles.errorStyle}>{errorMessage2}</Text>:null}

                </View>
            </View>
            <TouchableOpacity onPress={()=>setPassword('')}>
                <Text style={Styles.ResetStyle}>{constants.ResetPassword}</Text>
            </TouchableOpacity>
            <View style={Styles.inputStyles}>
                <TouchableOpacity style={Styles.buttonStyle} onPress={onLogin} >
                    <Text style={Styles.buttonText}>{constants.Login}</Text>
                </TouchableOpacity>

            </View>
            {defaultState === true ?  
            <TouchableOpacity onPress={()=>setDefaultState(false)}>
            <Text style={Styles.clearStyle}>Clear</Text>

            </TouchableOpacity>
            :
           false
            } 
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
const width = Dimensions.get('window').width
const hiegth = Dimensions.get('window').hiegth
const Styles = StyleSheet.create({
    mainView: {
        paddingEnd: 36,
        marginHorizontal: 36,
        width: width - 36,
        hiegth: hiegth,
    },
    loginView: {
        marginTop: 50,

    },
    loginText: {
        color: COLORS.ThemeGreen,
        fontWeight: 'bold',
        fontSize: 22
    },
    emailInputStyle: {
        borderRadius: 5,
        backgroundColor: COLORS.LightGreen,
        width: '100%',
        height: 70,
        paddingLeft: 20
    },
    passInputStyle: {
        borderRadius: 5,
       
        backgroundColor: COLORS.LightGreen,
        marginEnd: 36,
        width: '100%',
        height: 70,
        paddingLeft: 20
    },
    inputStyles: {
        marginTop: 70
    },
    buttonStyle: {
        backgroundColor: COLORS.GreenBox,
        borderRadius: 5,
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: COLORS.White,
        fontWeight: 'bold',
        fontSize: 22,

    },
    ResetStyle: {
        color: COLORS.blue,
        textAlign: 'right',
        marginTop: 5,
        textDecorationLine: 'underline',

    },
    changeText: {

        fontSize: 10

    },
    changeView: {
        position: "relative",
        left: 5,
        top: 2,
        backgroundColor: COLORS.White,
        width: 90,
    },
    changeViews: {
        position: "relative",
        left: 5,
        top:2,
        backgroundColor: COLORS.White,
        width: 90,
    },
    passView:{
        marginTop:36
    },
    clearStyle:{
        textAlign:'center',
        color: COLORS.blue,
        marginTop: 10,
        textDecorationLine: 'underline',
    },
    errorStyle:{
        color:COLORS.red
    },
    eyeStyle:{
        alignSelf:'flex-end',
        position:"relative",
        top:-40,
        right:5
    },
    imgStyle:{
       width:20
    }
})