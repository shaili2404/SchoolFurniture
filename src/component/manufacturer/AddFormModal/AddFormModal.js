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
  Modal,
  ScrollView,
} from "react-native";

import constants from "../../../locales/constants";
import style from "./Styles";
import COLORS from "../../../asset/color";
import Images from "../../../asset/images";

export const AddUserModal = (props) => {
  const { visible, setmodalVisible, onSubmitDetails, data, name} = props;
  const [defaultState, setDefaultState] = useState(false);
  const [inputValues, setInputValues] = useState({});

  const setValue = (key, value) => {
    setInputValues(prevState => {
      return {
        ...prevState,
        [key]: value,
      }
    })
  }

  useEffect(() => {
    const obj = {};
    data.forEach((val) => {
      obj[val.key] = "";
    })
    // console.log("obj", obj)
    setInputValues(obj);
  }, [data])

  const onNext = () => {
    // console.log(inputValues)
    onSubmitDetails(inputValues)
  }

  return (
    <>
      <SafeAreaView >
        <Modal animationType="slide" visible={props.visible}>
          <View style={style.mainView}>
            <View style={style.subContainer}>
              <View style={style.inputStyles}>
                <View style={style.textContainer}>
                  <Text style={style.EditText}>{` Add ${props.name}`}</Text>
                </View>
                <View style={style.textContainer}>
                  <TouchableOpacity onPress={() => setmodalVisible(false)}>
                    <Image source={Images.closeimage} />
                  </TouchableOpacity>
                </View>
              </View>
              <KeyboardAvoidingView behavior={Platform.OS === 'android' || 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0} >
                <ScrollView showsVerticalScrollIndicator={false} >
                  {data.map((input, index) =>
                    <View key={index}>
                      {defaultState === true ?
                        <View style={style.changeView}>
                          <Text style={style.changeText}>{input.value}</Text>
                        </View>
                        : null}
                      <TextInput
                        style={style.emailInputStyle}
                        placeholder={defaultState === true ? '' : input.value}
                        placeholderTextColor={COLORS.Black}
                        onFocus={() => setDefaultState(true)}
                        onBlur={() => setDefaultState(false)}
                        opacity={defaultState === true ? 1 : 0.5}
                        value={inputValues[input.key]}
                        onChangeText={(value) => setValue(input.key, value)}
                      />
                    </View>
                  )}
                </ScrollView>
              </KeyboardAvoidingView>

              <View style={style.backContainer}>
                <TouchableOpacity style={style.buttonStyle} onPress={onNext}>
                  <Text style={style.buttonText}>{constants.nextText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};
