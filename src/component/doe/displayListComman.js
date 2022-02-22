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
import { EditAddUserModal } from "../../component/doe/EditAddUserModal/editAdduserModal";
import style from "./EditAddUserModal/Styles";

export const DataDisplayList = ({value1,value2,value3,value4,value5,value6,value7,value8,value9,value10}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alert, setAlert] = useState(false);
  const onEdit = () => {
    setModalVisible(true);
  };
  const onDelete = ()=>{
    setAlert(true)
  }

  return (
    <SafeAreaView style={Styles.firstView}>
      <View style={Styles.mainView}>
          {value1 && value1 != null ?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{value1}</Text>
        </View>:null}
        {value2 && value2 != null?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{value2}</Text>
        </View>:null}
        {value3 && value3 != null?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{value3}</Text>
        </View>:null}
        {value4 && value4 != null?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{value4}</Text>
        </View>:null}
        {value5 && value5 != null?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{value5}</Text>
        </View>:null}
        {value6 && value6 != null?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{value6}</Text>
        </View>:null}
        {value7 && value7 != null?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{value7}</Text>
        </View>:null}
        {value8 && value8 != null?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{value8}</Text>
        </View>:null}
        {value9 && value9 != null?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{value9}</Text>
        </View>:null}
        {value10 && value10 != null?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{value10}</Text>
        </View>:null}
        
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
                <Text style={style.EditText}>Edit User</Text>
              </View>
              <View>
                <TouchableOpacity onPress={()=> setModalVisible(false)}>
                  <Image source={Images.closeimage} />
                </TouchableOpacity>
              </View>
            </View>
            <EditAddUserModal edit="edit" />
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
    width:'100%'
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
 
});
