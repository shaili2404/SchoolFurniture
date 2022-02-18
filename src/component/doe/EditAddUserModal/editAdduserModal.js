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
} from "react-native";

import constants from "../../../locales/constants";
import style from "./Styles";
import COLORS from "../../../asset/color";
import Loader from "../../loader";
import Images from "../../../asset/images";

export const EditAddUserModal = (props) => {
  const [loader, setLoader] = useState(false);
  const [Name, setName] = useState(props.Name);
  const [schoolName, setSchoolName] = useState(props.schoolName);
  const [organisation, setOrganisation] = useState(props.organisation);
  const [emailId, setEmailId] = useState(props.emailId);

  return (
    <>
      <View>
        <TextInput
          style={style.emailInputStyle}
          placeholder="school"
          placeholderTextColor={COLORS.Black}
        />
      </View>
      <View>
        <TextInput
          style={style.emailInputStyle}
          placeholder="ST.maris High School Thane"
          placeholderTextColor={COLORS.Black}
        />
      </View>
      <View>
        <View style={style.changeView}>
          <Text style={style.changeText}>Enter Email Id</Text>
        </View>
        <TextInput
          style={style.emailInputStyle}
          placeholder="naman.mathur@co.oa"
          placeholderTextColor={COLORS.Black}
        />
      </View>
      <View>
        <View style={style.changeView}>
          <Text style={style.changeText}>Enter Name</Text>
        </View>
        <TextInput
          style={style.emailInputStyle}
          placeholder="5001001567"
          placeholderTextColor={COLORS.Black}
        />
      </View>

      <View style={style.backContainer}>
        <TouchableOpacity style={style.buttonStyle}>
          <Text style={style.buttonText}>{constants.nextText}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
