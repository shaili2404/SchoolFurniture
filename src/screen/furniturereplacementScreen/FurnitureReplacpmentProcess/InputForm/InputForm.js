import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";

import COLORS from "../../../../asset/color";
import constants from "../../../../locales/constants";
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
  totalFur,
  task,
}) => {
  const [defaultState, setDefaultState] = useState(true);
  const [inputValues, setInputValues] =
    task == constants.ManageReqText ? useState(totalFur) : useState("");
  const [totalFurCount, setTotalFurCOunt] = useState(totalFur);

  const onValueChange = (val) => {
    if (val <= 0) {
      setInputValues("");
      setTotalFurCOunt("");
      onvalueEdit(val);
    } else {
      setInputValues(val);
      setTotalFurCOunt(val);
      onvalueEdit(val);
    }
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
            <Text style={style.changeTextsss}>{stockcollectionName}</Text>
          </View>
        ) : null}
        <TextInput
          style={style.emailInputessStyle}
          placeholder={defaultState === true ? "" : { stockcollectionName }}
          placeholderTextColor={COLORS.Black}
          opacity={defaultState === true ? 1 : 0.5}
          value={
            org == constants.school
              ? task == constants.ManageReqText
                ? String(totalFurCount)
                : inputValues
              : String(stockcount)
          }
          editable={org == constants.school ? true : false}
          onChangeText={(val) => onValueChange(val)}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};
