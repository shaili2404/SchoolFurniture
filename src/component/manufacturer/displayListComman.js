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

export const DataDisplayList = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alert, setAlert] = useState(false);
  const onEdit = () => {
    setModalVisible(true);
  };
  const onDelete = () => {
    setAlert(true)
  }

  return (
    <SafeAreaView style={Styles.firstView}>
      <View style={Styles.mainView}>

        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.district_office}</Text>
        </View>

        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.director}</Text>
        </View>

        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.tel}</Text>
        </View>

        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle} numberOfLines={2}>{props.address1}</Text>
        </View>

        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.address2}</Text>
        </View>

        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.address3}</Text>
        </View>

        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.address4}</Text>
        </View>

        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.street_code}</Text>
        </View>

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
