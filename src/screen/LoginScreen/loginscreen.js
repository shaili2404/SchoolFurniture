import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { loginRequest } from "../../redux/actions/loginAction";
import { regExpEmail, regExpPassword } from "../../locales/regexp";
import Images from "../../asset/images";
import COLORS from "../../asset/color";
import { LogoImg } from "../../atoms/logo";
import constants from "../../locales/constants";
import Loader from "../../component/loader";
import Styles from "./styles";

export const LoginScreen = () => {
  const [defaultState, setDefaultState] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage1, setErrorMessage1] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessage2, setErrorMessage2] = useState(false);
  const [textEntery, setTextEntry] = useState(true);
  const [loader, setLoader] = useState(false);
  const [invalidcred, setInvalidcred] = useState(false);
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.loginData);
  console.log("LoginData", loginData);

  useEffect(() => {
    if (loginData) setLoader(false);
    const status = loginData?.err?.response?.status;
    if (status === 200) {
      setInvalidcred(false);
      setErrorMessage('');
    }
    else if (status === 401){
      setInvalidcred(true);
      setErrorMessage(constants.ErrorCredential);
    }
  }, [loginData]);

  const onChangeEmail = (email) => {
    if (email == "" || !regExpEmail.test(email)) {
      setErrorMessage1(false);
      setEmail(email);
    } else {
      setErrorMessage1(true);
      setEmail(email);
    }
  };

  const onChangePass = (password) => {
    if (password == "" || !regExpPassword.test(password)) {
      setErrorMessage2(false);
      setPassword(password);
    } else {
      setErrorMessage2(true);
      setPassword(password);
    }
  };

  const onLogin = () => {
    setLoader(true);
    var data = {
      email: email,
      password: password,
    };
    dispatch(loginRequest(data));
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainView}>
      <KeyboardAvoidingView >
        <View>
          <LogoImg />
        </View>
        <View style={Styles.loginView}>
          <Text style={Styles.loginText}>{constants.Login}</Text>
        </View>
        <View style={Styles.inputStyles}>
          {defaultState === true ? (
            <View style={Styles.changeView}>
              <Text style={Styles.changeText}>{constants.EnterUsername}</Text>
            </View>
          ) : null}
          <View>
            <TextInput
              style={
                invalidcred ? Styles.emailInputStyles : Styles.emailInputStyle
              }
              placeholder={defaultState === true ? " " : "Enter Userame"}
              placeholderTextColor={COLORS.Black}
              value={email}
              onFocus={() => setDefaultState(true)}
              onBlur={() => setDefaultState(false)}
              onChangeText={(email) => onChangeEmail(email)}
              opacity={defaultState === true ? 1 : 0.5}
            />
            {invalidcred ? (
              <TouchableOpacity
              disabled
                style={Styles.errIcon}
                onPress={() => {
                  textEntery === true
                    ? setTextEntry(false)
                    : setTextEntry(true);
                }}
              >
                <Image source={Images.error} style={Styles.errIconStyle} />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={Styles.passView}>
            {defaultState === true ? (
              <View style={Styles.changeView}>
                <Text style={Styles.changeText}>{constants.EnterPassword}</Text>
              </View>
            ) : null}
            <TextInput
              style={
                invalidcred ? Styles.passInputStyles : Styles.passInputStyle
              }
              placeholder={
                defaultState === true ? " " : constants.EnterPassword
              }
              placeholderTextColor={COLORS.Black}
              value={password}
              onFocus={() => setDefaultState(true)}
              onBlur={() => setDefaultState(false)}
              onChangeText={(password) => onChangePass(password)}
              secureTextEntry={textEntery}
              opacity={defaultState === true ? 1 : 0.5}
            />
            {invalidcred ? (
              <TouchableOpacity
              disabled
                style={Styles.errIcon}
                onPress={() => {
                  textEntery === true
                    ? setTextEntry(false)
                    : setTextEntry(true);
                }}
              >
                <Image source={Images.error} style={Styles.errIconStyle} />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              style={invalidcred ? Styles.eyeStyles : Styles.eyeStyle}
              onPress={() => {
                textEntery === true ? setTextEntry(false) : setTextEntry(true);
              }}
            >
              <Image
                source={defaultState === true ? Images.Eye_off : Images.Eye}
                style={Styles.imgStyle}
              />
            </TouchableOpacity>
          </View>
        </View>
        {invalidcred ? (
          <View style={Styles.messageStyle}>
            <View style={Styles.credStyle}>
              <Text style={Styles.errorStyle}>{constants.ErrorCredential}</Text>
            </View>

            <View>
              <TouchableOpacity onPress={() => setPassword("")}>
                <Text style={Styles.ResetStyle}>{constants.ResetPassword}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setPassword("")}>
            <Text style={Styles.ResetStyle}>{constants.ResetPassword}</Text>
          </TouchableOpacity>
        )}

        <View style={Styles.inputStyles}>
          {errorMessage1 === true && errorMessage2 === true ? (
            <TouchableOpacity style={Styles.buttonStyle} onPress={onLogin}>
              <Text style={Styles.buttonText}>{constants.Login}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={Styles.buttonStyle}
              onPress={onLogin}
              disabled
            >
              <Text style={Styles.buttonText}>{constants.Login}</Text>
            </TouchableOpacity>
          )}
        </View>

        {defaultState === true ? (
          <TouchableOpacity onPress={() => setDefaultState(false)}>
            <Text style={Styles.clearStyle}>{constants.Clear}</Text>
          </TouchableOpacity>
        ) : (
          false
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
