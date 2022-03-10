import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  ScrollView,
} from "react-native";

import style from "./Styles";
import COLORS from "../../../asset/color";
import Images from "../../../asset/images";
import { numberonly } from "../../../locales/regexp";

export const AddUserModal = (props) => {
  const { visible, setmodalVisible, onSubmitDetails, data, operation, updateItem, buttonVal } = props;
  const [defaultState, setDefaultState] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [disable, setDisable] = useState(true);
  const setValue = (key, value) => {
    { !numberonly.test(inputValues.tel) ? setDisable(true) : setDisable(false) }
    setInputValues(prevState => {
      return {
        ...prevState,
        [key]: value,
      }
    })
  }

  useEffect(() => {
    inputValues.district_office == "" ? setDisable(true) : setDisable(false);
  }, [inputValues])

  useEffect(() => {
    const obj = {};
    if (operation == "Edit") {
      updateItem.street_code = String(updateItem.street_code)
      data.forEach((val) => {
        obj[val.key] = updateItem[val.key];
      })
    } else {
      data.forEach((val) => {
        obj[val.key] = "";
      })
    }
    setInputValues(obj);
  }, [])

  const onNext = () => {
    onSubmitDetails(inputValues, operation)
  }

  return (
    <>
      <SafeAreaView >
        <Modal animationType="slide" visible={visible}>
          <View style={style.mainView}>
            <View style={style.subContainer}>

              <View style={style.inputStyles}>
                <View style={style.textContainer}>
                  <Text style={style.EditText}>{` ${operation} ${props.name}`}</Text>
                </View>
                <View style={style.textContainer}>
                  <TouchableOpacity onPress={() => setmodalVisible(false)}>
                    <Image source={Images.closeimage} />
                  </TouchableOpacity>
                </View>
              </View>

              <KeyboardAvoidingView behavior={Platform.OS === 'android' || 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0} style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} >
                  {data.map((input, index) =>
                    <View key={index}>
                      {defaultState === true ?
                        <View style={style.changeView}>
                          <Text style={input.value == "District Office" ? style.mandatory : style.changeText}>{input.value}</Text>
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
            </View>

            <View style={style.backContainer}>
              <TouchableOpacity
                style={disable ? style.disableStyle : style.buttonStyle}
                onPress={onNext}
                disabled={disable}>
                <Text style={style.buttonText}>{buttonVal}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};
