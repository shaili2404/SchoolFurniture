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
import Dropdown from "../../DropDown/dropdown";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import { numberonly, streetCode, emisNumber } from "../../../locales/regexp";

export const AddSchool = (props) => {
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
  const [disable, setDisable] = useState(true);
  const [distList, setDistList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [snqList, setSnqList] = useState([]);
  const [selected, setSelected] = useState({});

  const setValue = (key, value) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [key]: value,
      };
    });
  };

  const getDistrictList = async () => {
    axios
      .get(`${endUrl.schoolDistList}`)
      .then((res) => {
        setDistList(res?.data?.data);
      })
      .catch((e) => console.log("apicall", e));
  };

  const getLevelList = async () => {
    axios
      .get(`${endUrl.schoolDistList}`)
      .then((res) => {
        setLevelList(res?.data?.data);
      })
      .catch((e) => console.log("apicall", e));
  };

  const getSnqList = async () => {
    axios
      .get(`${endUrl.schoolDistList}`)
      .then((res) => {
        setSnqList(res?.data?.data);
      })
      .catch((e) => console.log("apicall", e));
  };

  useEffect(() => {
    getDistrictList();
    getLevelList();
    getSnqList();
  }, []);

  validation = (value) => {
    return value != '' && value != undefined && value != null
  }

  useEffect(() => {
    !validation(inputValues.name) || !validation(inputValues.emis) || !emisNumber.test(inputValues.emis)
      ? setDisable(true)
      : setDisable(false)
  }, [inputValues]);

  useEffect(() => {
    const obj = {};
    if (operation == "Edit") {
      updateItem.street_code =
        updateItem.street_code === null ? null : String(updateItem.street_code);
      updateItem.emis = String(updateItem.emis);
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

  const getList = (value) => {
    if (value == "District") {
      return distList;
    } if (value == "Level") {
      return levelList;
    } if (value == "SNQ") {
      return snqList;
    }
  }

  const getTask = (value) => {
    if (value == "District") {
      return "district_office"
    }
  }

  const onNext = () => {
    if (operation == 'Edit') {
      if (selected === {}) {
        inputValues.district_id = selected.id
      }
      else {
        inputValues.district_id = updateItem.district_id
      }
    }
    else {
      inputValues.district_id = selected.id
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
                          <Text style={input.value === 'School' || input.value === 'School EMIS Number' || input.value === 'School District' ? style.mandatory : null}>{input.value}</Text>
                        </View>
                      ) : null}
                      {input.value == "District" || input.value == "Level" || input.value == "SNQ" ? (
                        <>
                          <View style={style.container}>
                            <Dropdown
                              label={
                                operation === "Edit"
                                  ? inputValues[input.key]
                                  : input.value
                              }
                              data={getList(input.value)}
                              onSelect={setSelected}
                              task={getTask(input.value)}
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
