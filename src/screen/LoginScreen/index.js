import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Platform
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { loginRequest } from "../../redux/actions/loginAction";
import { regExpPassword } from "../../locales/regexp";
import Images from "../../asset/images";
import COLORS from "../../asset/color";
import { LogoImg } from "../../atoms/logo";
import constants from "../../locales/constants";
import Loader from "../../component/loader";
import Styles from "./styles";
import { NetworkInfo } from "react-native-network-info";
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
  const [defaultState, setDefaultState] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emptyUserName, setEmptyUserName] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [emptyPass, setEmptyPass] = useState(true);
  const [textEntery, setTextEntry] = useState(true);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state?.loginData);
  const [idsAddresss, setIpAddress] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const { loading, err } = loginData;
    setLoader(loading);
    const { message } = err?.data || {};
    setErrorMessage(message);

    NetworkInfo.getIPAddress().then((ipAddress) => {
      //console.log(ipAddress);
      setIpAddress(ipAddress)
    });
    NetworkInfo.getIPV4Address().then((ipv4Address) => {
      console.log(ipv4Address);
      setIpAddress(ipv4Address)
    });
  }, [loginData]);

  const onChangeEmail = (username) => {
    if (username == "") {
      setEmptyUserName(true);
      setUsername(username);
    } else {
      setEmptyUserName(false);
      setUsername(username);
    }
  };

  const onChangePass = (password) => {
    if (password == "" || !regExpPassword.test(password)) {
      setEmptyPass(true);
      setPassword(password);
    } else {
      setEmptyPass(false);
      setPassword(password);
    }
  };

  const onLogin = () => {
    var data = {
      username: username,
      password: password,
      ip: idsAddresss,
    };
    dispatch(loginRequest(data));
  };

  const onClear = () => {
    Keyboard.dismiss();
    setDefaultState(false);
    setUsername("");
    setPassword("");
    setErrorMessage("");
    setEmptyUserName(true);
    setEmptyPass(true);
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.subContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'position' : null} keyboardVerticalOffset={0} >
          <LogoImg />
          <View style={Styles.loginView}>
            <Text style={Styles.loginText}>{constants.Login}</Text>
          </View>
          <View style={defaultState === true ? Styles.inputSty : Styles.inputStyles}>
            {defaultState === true ? (
              <View style={Styles.changeView}>
                <Text style={Styles.changeText}>{constants.EnterUsername}</Text>
              </View>
            ) : null}
            <View>
              <TextInput
                style={
                  errorMessage ? Styles.emailInputStyles : Styles.emailInputStyle
                }
                placeholder={
                  defaultState === true ? " " : constants.EnterUsername
                }
                placeholderTextColor={COLORS.Black}
                value={username}
                onFocus={() => setDefaultState(true)}
                // onBlur={() => setDefaultState(false)}
                onChangeText={(username) => onChangeEmail(username)}
                opacity={defaultState === true ? 1 : 0.5}
              />
              {errorMessage ? (
                <TouchableOpacity disabled style={Styles.errIcon}>
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
                  errorMessage ? Styles.passInputStyles : Styles.passInputStyle
                }
                placeholder={
                  defaultState === true ? " " : constants.EnterPassword
                }
                placeholderTextColor={COLORS.Black}
                value={password}
                onFocus={() => setDefaultState(true)}
                //onBlur={() => setDefaultState(false)}
                onChangeText={(password) => onChangePass(password)}
                secureTextEntry={textEntery}
                opacity={defaultState === true ? 1 : 0.5}
              />
              {errorMessage ? (
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
                style={errorMessage ? Styles.eyeStyles : Styles.eyeStyle}
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

          <View style={{ flexDirection: errorMessage ? "row" : "column" }}>
            {errorMessage ? (
              <View style={Styles.credStyle}>
                <Text style={Styles.errorStyle}>{errorMessage}</Text>
              </View>
            ) : null}
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('PasswordReset')}
              >
                <Text style={Styles.ResetStyle}>{constants.ResetPassword}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View style={defaultState === true ? Styles.inputStyless : Styles.inputStyles}>
          <TouchableOpacity
            style={Styles.buttonStyle}
            onPress={onLogin}
            // onPress={()=> navigation.navigate('First') }
            disabled={emptyUserName || emptyPass}
          >
            <Text style={Styles.buttonText}>{constants.Login}</Text>
          </TouchableOpacity>
        </View>

        {defaultState === true ? (
          <TouchableOpacity onPress={onClear}>
            <Text style={Styles.clearStyle}>{constants.Clear}</Text>
          </TouchableOpacity>
        ) : (
          false
        )}
      </View>
    </SafeAreaView>
  );
};