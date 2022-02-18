import React, { useState } from "react";
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
import COLORS from "../../asset/color";
import Images from "../../asset/images";
import { EditAddUserModal } from "./EditAddUserModal/editAdduserModal";
import style from "./EditAddUserModal/Styles";

export const ManageUserList = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const onEdit = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={Styles.firstView}>
      <View style={Styles.mainView}>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.Name}</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.Surname}</Text>
        </View>
        <View style={Styles.otherStyle}>
          <Text style={Styles.textStyle}>{props.Username}</Text>
        </View>
        <View style={Styles.otherStyle}>
          <Text style={Styles.textStyle}>{props.Emailid}</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.Organisation}</Text>
        </View>
        <View style={Styles.viewsssStyle}>
          <TouchableOpacity onPress={onEdit}>
            <Image source={Images.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={Styles.viewsssStyle}>
          <TouchableOpacity>
            <Image source={Images.deleteIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="slide" visible={modalVisible}>
        <SafeAreaView style={style.mainView}>
          <View style={style.subContainer}>
            <View style={style.inputStyles}>
              <View style={style.textContainer}>
                <Text style={style.EditText}>Edit User</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Image source={Images.closeimage} />
                </TouchableOpacity>
              </View>
            </View>
            <EditAddUserModal edit = 'edit' />
          </View>
        </SafeAreaView>
      </Modal>
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
    justifyContent: "space-between",
  },
  firstView: {
    backgroundColor: COLORS.LightGreen,
    height: 46,
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 1,
  },
  viewStyle: {
    width: 120,
    marginTop: 12,
    marginHorizontal: 20,
  },
  viewsssStyle: {
    width: 30,
    marginTop: 12,
    marginHorizontal: 20,
  },
  otherStyle: {
    width: 200,
    marginTop: 12,
    marginHorizontal: 20,
  },
});
