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
import { Baseurl } from "../../../redux/configration/baseurl";
import endUrl from "../../../redux/configration/endUrl";
import { Token } from "../../dummyData/Token";

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
  console.log(data)
  const [defaultState, setDefaultState] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [disable, setDisable] = useState(true);
  const [distList, setDistList] = useState([]);
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
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    axios
      .get(`${Baseurl}${endUrl.schoolDistList}`)
      .then((res) => {
        setDistList(res?.data?.data);
      })
      .catch((e) => console.log("apicall", e));
  };
  useEffect(()=>{
    getDistrictList()
  },[])

  useEffect(() => {
    inputValues.name == "" && inputValues.emis == ""
      ? setDisable(true)
      : setDisable(false);
  }, []);

  useEffect(() => {
    const obj = {};
    if (operation == "Edit") {
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
    inputValues.district_id = selected.id;
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
                          <Text style={style.changeText}>{input.value}</Text>
                        </View>
                      ) : null}
                      {input.value == "School District" ? (
                          <>
                        <View style={style.container}>
                          <Dropdown
                            label={input.value}
                            data={distList}
                            onSelect={setSelected}
                            task="district_office"
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
                style={style.buttonStyle}
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

