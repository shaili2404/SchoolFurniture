import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";

import COLORS from "../../../../asset/color";
import style from "./style";

export const InputForm = ({
  schoolname,
  schoolvalue,
  emisnumber,
  emisvalue,
  org,
  stockcollectionName,
  stockcount,
  onvalueEdit,
}) => {
  const [defaultState, setDefaultState] = useState(true);
  const [inputValues, setInputValues] = useState("");

  const onValueChange = (val) => {
    setInputValues(val);
    onvalueEdit(val)
  };

  return (
    <View style={style.subContainer}>
      <View>
        {defaultState === true ? (
          <View style={style.changeView}>
            <Text style={style.changeText}>{schoolname}</Text>
          </View>
        ) : null}
        <TextInput
          style={style.emailInputStyle}
          placeholder={defaultState === true ? "" : { schoolname }}
          placeholderTextColor={COLORS.Black}
          editable={false}
          opacity={defaultState === true ? 1 : 0.5}
          value={schoolvalue}
        />
      </View>
      <View>
        {defaultState === true ? (
          <View style={style.changeView}>
            <Text style={style.changeText}>{emisnumber}</Text>
          </View>
        ) : null}
        <TextInput
          style={style.emailInputStyle}
          placeholder={defaultState === true ? "" : { emisnumber }}
          placeholderTextColor={COLORS.Black}
          opacity={defaultState === true ? 1 : 0.5}
          value={String(emisvalue)}
          editable={false}
        />
      </View>
      <View>
        {defaultState === true ? (
          <View style={style.changeView}>
            <Text style={style.changeText}>{stockcollectionName}</Text>
          </View>
        ) : null}
        <TextInput
          style={style.emailInputessStyle}
          placeholder={defaultState === true ? "" : { stockcollectionName }}
          placeholderTextColor={COLORS.Black}
          opacity={defaultState === true ? 1 : 0.5}
          value={org == "School" ? inputValues : String(stockcount)}
          editable={org == "School" ? true : false}
          onChangeText={(val) => onValueChange(val)}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};
