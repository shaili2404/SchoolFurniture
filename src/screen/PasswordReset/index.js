import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  Platform
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { resetRequest } from "../../redux/actions/resetAction";
import { LogoImg } from "../../atoms/logo";
import constants from "../../locales/constants";
import style from "./styles";
import COLORS from "../../asset/color";
import Images from "../../asset/images";
import Loader from "../../component/loader";
import { useNavigation } from '@react-navigation/native';

const PasswordReset = () => {
  const [username, setUserName] = useState("");
  const [defaultState, setDefaultState] = useState(false);
  const [emptymail, setEmptyMail] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const resetData = useSelector((state) => state.resetpassData);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const { loading, err } = resetData;
    setLoader(loading);
    const { message } = err?.response?.data || {};
    setErrorMessage(message);
  }, [resetData]);

  const onPressReset = () => {
    //  onPress={() => navigation.navigate('PasswordReset')}
    //  return
    var data = {
      username: username,
    };
    dispatch(resetRequest(data));
  }

  const onChangeEmail = (username) => {
    if (username == "") {
      setEmptyMail(true);
      setUserName(username);
    } else {
      setEmptyMail(false);
      setUserName(username);
    }
  };

  const onClear = () => {
    Keyboard.dismiss()
    setDefaultState(false);
    setUserName("");
    setErrorMessage("");
    setEmptyMail(true);
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={style.mainView}>
      <View style={style.subContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'position' : ''} >
          <View>
            <LogoImg />
          </View>
          <View style={style.textContainer}>
            <Text style={style.resetText}>{constants.ResetPassword}</Text>
          </View>
          <View style={style.inputStyles}>
            {defaultState === true ? (
              <View style={style.changeView}>
                <Text style={style.changeText}>{constants.EnterUsername}</Text>
              </View>
            ) : null}
            <View>
              <TextInput
                style={
                  errorMessage ? style.emailInputStyles : style.emailInputStyle
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
                <TouchableOpacity
                  disabled
                  style={style.errIcon}
                >
                  <Image source={Images.error} style={style.errIconStyle} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          {errorMessage ? (
            <View style={style.credStyle}>
              <Text style={style.errorStyle}>
                {errorMessage}
              </Text>
            </View>
          ) : null}

          {defaultState === true ? (
            <View style={style.inputStyles}>
              <TouchableOpacity
                style={style.buttonStyle}
                onPress={onPressReset}
                // onPress={() => navigation.navigate('EmailSent')}
                disabled={emptymail}
              >
                <Text style={style.buttonText}>{constants.Reset}</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          {defaultState === true ? (
            <TouchableOpacity onPress={onClear}>
              <Text style={style.clearStyle}>{constants.Clear}</Text>
            </TouchableOpacity>
          ) : (
            false
          )}

        </KeyboardAvoidingView>
        <TouchableOpacity style={style.backContainer}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={style.BackText}>{constants.BackToLogin}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordReset;