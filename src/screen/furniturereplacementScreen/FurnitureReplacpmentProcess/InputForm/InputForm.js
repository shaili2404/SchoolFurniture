import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";

import COLORS from "../../../../asset/color";
import style from "./style";

export const InputForm = (props) => {
  const { data } = props;
  const [defaultState, setDefaultState] = useState(false);
  const [inputValues, setInputValues] = useState({});

  const setValue = (key, value) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  return (
 
          <View style={style.subContainer}>
              {data.map((input, index) => (
                <View key={index}>
                  {defaultState === true ? (
                    <View style={style.changeView}>
                      <Text style={style.changeText}>{input.value}</Text>
                    </View>
                  ) : null}
                  <TextInput
                    style={style.emailInputStyle}
                    placeholder={defaultState === true ? "" : input.value}
                    placeholderTextColor={COLORS.Black}
                    onFocus={() => setDefaultState(true)}
                    onBlur={() => setDefaultState(false)}
                    opacity={defaultState === true ? 1 : 0.5}
                    value={inputValues[input.key]}
                    onChangeText={(value) => setValue(input.key, value)}
                  />
                </View>
              ))}
          </View>
     
  );
};
