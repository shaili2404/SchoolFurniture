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
import { emisNumber } from "../../../locales/regexp";
import constants from "../../../locales/constants";

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
  const [cmcList, setCmcList] = useState([]);
  const [circuitList, setCircuitList] = useState([]);
  const [subpalceList, setSubplaceList] = useState([]);
  const [dist_selected, setdist_setSelected] = useState({});
  const [cmc_selected, setcmc_setSelected] = useState({});
  const [circuit_selected, setcircuit_setSelected] = useState({});
  const [subplaces_selected, setsubplaces_setSelected] = useState({});
  const [level_selected, level_setSelected] = useState({});
  const [snq_selected, snq_setSelected] = useState({});

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
      .get(`${endUrl.schoolDistList}?all==true`)
      .then((res) => {
        setDistList(res?.data?.data?.records);
      })
      .catch((e) => {});
  };

  const getLevelList = async () => {
    axios
      .get(`${endUrl.school_level}`)
      .then((res) => {
        setLevelList(res?.data?.data);
      })
      .catch((e) => {});
  };

  const getSnqList = async () => {
    axios
      .get(`${endUrl.school_snq}`)
      .then((res) => {
        setSnqList(res?.data?.data);
      })
      .catch((e) => {});
  };
  const getsingledistdetail = async (id) => {
    axios
      .get(`${endUrl.single_distrequest}/${id}`)
      .then((res) => {
        setCmcList(res?.data?.data?.cmc_list);
      })
      .catch((e) => {});
  };
  const getsinglecmcdetail = async (id) => {
    axios
      .get(`${endUrl.single_cmcrequest}/${id}`)
      .then((res) => {
        setCircuitList(res?.data?.data?.circuit_list);
      })
      .catch((e) => {});
  };
  const getsinglecircuitdetail = async (id) => {
    axios
      .get(`${endUrl.single_circuitrequest}/${id}`)
      .then((res) => {
        setSubplaceList(res?.data?.data?.subplace_list);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    getDistrictList();
    getLevelList();
    getSnqList();
  }, []);

  validation = (value) => {
    return value != "" && value != undefined && value != null;
  };

  useEffect(() => {
    if (operation == constants.Edit) {
      !validation(inputValues.name) ||
      !validation(inputValues.emis) ||
      !emisNumber.test(inputValues.emis)
        ? setDisable(true)
        : setDisable(false);
    } else {
      !validation(inputValues.name) ||
      !validation(inputValues.emis) ||
      !emisNumber.test(inputValues.emis) ||
      !validation(dist_selected?.id) ||
      !validation(cmc_selected?.cmc_id) ||
      !validation(circuit_selected?.id) ||
      !validation(subplaces_selected?.id) ||
      !validation(level_selected?.id) ||
      !validation(snq_selected?.id)
        ? setDisable(true)
        : setDisable(false);
    }
  }, [
    inputValues,
    dist_selected,
    cmc_selected,
    circuit_selected,
    subplaces_selected,
    level_selected,
    snq_selected,
  ]);

  useEffect(() => {
    const obj = {};
    if (operation == constants.Edit) {
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
    if (value == constants.District) {
      return distList;
    }
    if (value == constants.Level) {
      return levelList;
    }
    if (value == constants.SNQ) {
      return snqList;
    }
    if (value == constants.Cmc) {
      return cmcList;
    }
    if (value == constants.Circuit) {
      return circuitList;
    }
    if (value == constants.subplacesname) {
      return subpalceList;
    }
  };

  const onDropdownselect = (value, item) => {
    if (value == constants.District) {
      setdist_setSelected(item);
      getsingledistdetail(item?.id);
    }
    if (value == constants.Level) {
      level_setSelected(item);
    }
    if (value == constants.SNQ) {
      snq_setSelected(item);
    }
    if (value == constants.Cmc) {
      setcmc_setSelected(item);
      getsinglecmcdetail(item?.cmc_id);
    }
    if (value == constants.Circuit) {
      setcircuit_setSelected(item);
      getsinglecircuitdetail(item?.id);
    }
    if (value == constants.subplacesname) {
      setsubplaces_setSelected(item);
    }
  };

  const getTask = (value) => {
    if (value == constants.District) {
      return "district_office";
    }
    if (value == constants.Cmc) {
      return "cmc_name";
    }
    if (value == constants.Circuit) {
      return "circuit_name";
    }
    if (value == constants.subplacesname) {
      return "subplace_name";
    }
    if (value == constants.SNQ) {
      return "name";
    }
    if (value == constants.Level) {
      return "name";
    }
  };
  const getnameadd = (value, key) => {
    if (value == constants.District) {
      return operation === constants.Edit ? inputValues[key] : value;
    }
    if (value == constants.Cmc) {
      return operation === constants.Edit ? inputValues[key] : value;
    }
    if (value == constants.Circuit) {
      return operation === constants.Edit ? inputValues[key] : value;
    }
    if (value == constants.subplacesname) {
      return operation === constants.Edit ? inputValues[key] : value;
    }
    if (value == constants.SNQ) {
      return operation === constants.Edit ? inputValues[key] : value;
    }
    if (value == constants.Level) {
      return operation === constants.Edit
        ? inputValues[key] === 1
          ? constants.SNQ_p
          : inputValues[key] === 2
          ? constants.SNQ_s
          : constants.SNQ_c
        : value;
    }
  };

  const onNext = () => {
    if (operation == constants.Edit) {
      dist_selected?.id
        ? (inputValues.district_id = dist_selected.id)
        : (inputValues.district_id = updateItem.district_id);
      cmc_selected?.cmc_id
        ? (inputValues.cmc_id = cmc_selected.cmc_id)
        : (inputValues.cmc_id = updateItem.cmc_id);
      circuit_selected?.id
        ? (inputValues.circuit_id = circuit_selected.id)
        : (inputValues.circuit_id = updateItem.circuit_id);
      subplaces_selected?.id
        ? (inputValues.subplace_id = circuit_selected.id)
        : (inputValues.subplace_id = updateItem.subplace_id);
      level_selected?.id
        ? (inputValues.level_id = level_selected.id)
        : (inputValues.level_id = updateItem.level_id);
      snq_selected?.id
        ? (inputValues.snq_id = snq_selected.id)
        : (inputValues.snq_id = updateItem.snq_id);
    } else {
      inputValues.district_id = dist_selected.id;
      inputValues.cmc_id = cmc_selected.cmc_id;
      inputValues.circuit_id = circuit_selected.id;
      inputValues.subplace_id = subplaces_selected.id;
      inputValues.snq_id = snq_selected.id;
      inputValues.level_id = level_selected.id;
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
                              input.value === constants.school ||
                              input.value === constants.schoolEmisNumber ||
                              input.value === constants.District ||
                              input.value == constants.Level ||
                              input.value == constants.SNQ ||
                              input.value == constants.Cmc ||
                              input.value == constants.Circuit ||
                              input.value == constants.subplacesname
                                ? style.mandatory
                                : null
                            }
                          >
                            {input.value}
                          </Text>
                        </View>
                      ) : null}
                      {input.value == constants.District ||
                      input.value == constants.Level ||
                      input.value == constants.SNQ ||
                      input.value == constants.Cmc ||
                      input.value == constants.Circuit ||
                      input.value == constants.subplacesname ? (
                        <>
                          <View style={style.container}>
                            <Dropdown
                              label={getnameadd(input.value, input.key)}
                              data={getList(input.value)}
                              onSelect={(item) =>
                                onDropdownselect(input.value, item)
                              }
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
