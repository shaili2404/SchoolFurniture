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
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import { alphabetNum, emisNumber } from "../../../locales/regexp";
import constants from "../../../locales/constants";
import DropdownCR from "../../DropDown/dropDOwnCR";

export const AddEditCircuit = (props) => {
  const {
    visible,
    setmodalVisible,
    onSubmitDetails,
    data,
    operation,
    updateItem,
    buttonVal,
  } = props;
  const [defaultState, setDefaultState] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [disable, setDisable] = useState(false);
  const [distList, setDistList] = useState([]);
  const [selected, setSelected] = useState({});
  const [circuit_validate, setCircuit_validate] = useState(false);


  const setValue = (key, value) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
    if (key == "circuit_name")
      !alphabetNum.test(value)
        ? setCircuit_validate(true)
        : setCircuit_validate(false);
  };

  const getDistrictList = async () => {
    axios
      .get(`${endUrl.CMC_List}?all=true`)
      .then((res) => {
        setDistList(res?.data?.data?.records);
      })
      .catch((e) => {});
  };
  useEffect(() => {
    getDistrictList();
  }, []);

  validation = (value) => {
    return value != "" && value != undefined && value != null;
  };

  useEffect(() => {
    if (operation == constants.Edit){ 
      !validation(inputValues.circuit_name) ||
      !alphabetNum.test(inputValues.circuit_name)
        ? setDisable(true)
        : setDisable(false);
    }
     else {
      !validation(inputValues.circuit_name) ||
      !alphabetNum.test(inputValues.circuit_name) ||
      !validation(selected?.id)
      
        ? setDisable(true)
        : setDisable(false);
     }
  }, [inputValues,selected]);

  useEffect(() => {
    const obj = {};
    if (operation == constants.Edit) {
      data.forEach((val) => {
        obj[val.key] = updateItem[val.key];
      });
    } else {
      data.forEach((val) => {
        obj[val.key] = "";
      });
    }
    setInputValues(obj);
  }, []);

  const onNext = () => {
    if (operation == constants.Edit) {
      if (selected?.id) {
        inputValues.cmc_id = selected?.id;
      } else {
        inputValues.cmc_id = updateItem.cmc_id;
      }
    } else {
      inputValues.cmc_id = selected?.id;
    }
    onSubmitDetails(inputValues, operation);
  };

  return (
    <>
      <SafeAreaView>
        <Modal animationType="slide" visible={visible}>
          <View style={style.mainView}>
            <View style={style.subContainer}>
              <View style={style.inputStyles}>
                <View style={style.textContainer}>
                  <Text
                    style={style.EditText}
                  >{` ${operation} ${props.name}`}</Text>
                </View>
                <View style={style.textContainer}>
                  <TouchableOpacity onPress={() => setmodalVisible(false)}>
                    <Image source={Images.closeimage} />
                  </TouchableOpacity>
                </View>
              </View>

              <KeyboardAvoidingView
                behavior={
                  Platform.OS === "android" || "ios" ? "padding" : "height"
                }
                keyboardVerticalOffset={0}
                style={{ flex: 1 }}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  {data.map((input, index) => (
                    <View key={index}>
                      {defaultState === true ? (
                        <View style={style.changeView}>
                          <Text
                            style={
                              input.value === constants.Circuit||
                              input.value === constants.Cmc
                                ? style.mandatory
                                : null
                            }
                          >
                            {input.value}
                          </Text>
                        </View>
                      ) : null}
                      {input.value == constants.Cmc ? (
                        <>
                          <View style={style.container}>
                            <DropdownCR
                              label={
                                operation === constants.Edit
                                  ? inputValues[input.key]
                                  : input.value
                              }
                              data={distList}
                              onSelect={setSelected}
                              task="cmc_name"
                              urlval={endUrl.CMC_search}
                              searchboxname={constants.Cmc}
                            />
                          </View>
                        </>
                      ) : (
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
                      )}
                       {input.value == constants.Circuit ? (
                            <Text style={style.errorcol}>
                              {circuit_validate ? constants.Circuit_val : null}
                            </Text>
                          ) : null}
                    </View>
                  ))}
                </ScrollView>
              </KeyboardAvoidingView>
            </View>

            <View style={style.backContainer}>
              <TouchableOpacity
                style={disable ? style.disableStyle : style.buttonStyle}
                onPress={onNext}
                disabled={disable}
              >
                <Text style={style.buttonText}>{buttonVal}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};
