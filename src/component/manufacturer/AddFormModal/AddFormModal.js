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
const { visible, setmodalVisible, onConfirm,data, } = props;
const [defaultState, setDefaultState] = useState(false);

  return (
    <>
    <SafeAreaView >
    <Modal animationType="slide" visible={props.visible}>
      <View style={style.mainView}>
          <View style={style.subContainer}>
            <View style={style.inputStyles}>
              <View style={style.textContainer}>
                <Text style={style.EditText}>{constants.editDistrict}</Text>
              </View>
              <View style={style.textContainer}>
                <TouchableOpacity onPress={() => setmodalVisible(false)}>
                  <Image source={Images.closeimage} />
                </TouchableOpacity>
              </View>
            </View>  
            <KeyboardAvoidingView behavior={Platform.OS === 'android' || 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={0} >
            <ScrollView showsVerticalScrollIndicator={false} >
            {data.map((val,index) =>
              <View>
                {defaultState === true ?
              <View style={style.changeView}>
                <Text style={style.changeText}>{val}</Text>
              </View>
              :null}
              <TextInput
                style={style.emailInputStyle}
                placeholder={defaultState === true? '': val}
                placeholderTextColor={COLORS.Black}
                onFocus={() => setDefaultState(true)}
                onBlur={()=>setDefaultState(false)}
                opacity={defaultState===true?1:0.5}
                value={''}
              />
            </View>
            )}
            </ScrollView>
            </KeyboardAvoidingView>
      
      

      <View style={style.backContainer}>
        <TouchableOpacity style={style.buttonStyle}>
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
