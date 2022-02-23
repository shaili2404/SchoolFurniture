import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { AlertMessage } from "../../Alert/alert";
import AlertText from "../../Alert/AlertText";
import COLORS from "../../asset/color";
import Images from "../../asset/images";
import { EditAddUserModal } from "./EditAddUserModal/editAdduserModal";
import constants from "../../locales/constants";
import style from "./EditAddUserModal/Styles";
import axios from "axios";
import { Baseurl } from "../../redux/configration/baseurl";
import endUrl from "../../redux/configration/endUrl";

export const DataDisplayList = ({ item, tableKey, reloadList }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alert, setAlert] = useState(false);

  const onEdit = () => {
    setModalVisible(true);
  };

  const onDelete = () => {
    setAlert(true)
  }

  const onPressYes = async () => {
    setAlert(false);
    const token = "${loginData?.user?.data?.access_token}";
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZnVybml0dXJlYXBwLnBocC1kZXYuaW5cL2FwaVwvbG9naW4iLCJpYXQiOjE2NDU2MDg2NTksImV4cCI6MTY0NTYxMjI1OSwibmJmIjoxNjQ1NjA4NjU5LCJqdGkiOiJCTVM2eERaa0M2NDFZWXVsIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.m7AUJo8Xb5yfhtPNZ2Mzm95QSsYk4HMggK7tz3T9V4w`;
    try {
      const response = await axios.delete(
        `${Baseurl}${endUrl.schoolDistList}/${item.id}`
      );
      console.log("34", response.status);
      if (response.status === 200) {
        reloadList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={Styles.firstView}>

      <View style={Styles.mainView}>
        {tableKey.map((val) =>
          <View key={val} style={Styles.viewStyle}>
            <Text style={Styles.textStyle}>{item[val]}</Text>
          </View>
        )}

        <View style={Styles.viewsssStyle}>
          <TouchableOpacity onPress={onEdit}>
            <Image source={Images.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={Styles.viewsssStyle}>
          <TouchableOpacity onPress={onDelete}>
            <Image source={Images.deleteIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaView style={style.mainView}>
          <View style={style.subContainer}>
            <View style={style.inputStyles}>
              <View style={style.textContainer}>
                <Text style={style.EditText}>{constants.editDistrict}</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Image source={Images.closeimage} />
                </TouchableOpacity>
              </View>
            </View>
            <EditAddUserModal />
          </View>
        </SafeAreaView>
      </Modal>
      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={AlertText.DeleteUser}
          subMessage={AlertText.UndoMessgae}
          type='question'
          onConfirm={() => onPressYes()}
        />
      ) : null}
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: "normal",
    color: COLORS.Black,
    textAlign: "left",
    textAlignVertical: "center",
  },
  mainView: {
    flexDirection: "row",
    width: '100%'
  },
  firstView: {
    backgroundColor: COLORS.LightGreen,
    height: 46,
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 1,
  },
  viewStyle: {
    width: 180,
    marginTop: 12,
    marginHorizontal: 20,
  },
  viewsssStyle: {
    width: 20,
    marginTop: 12,
    marginHorizontal: 20,
  }

});
