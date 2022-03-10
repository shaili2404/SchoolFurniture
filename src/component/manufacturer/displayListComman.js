import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { AlertMessage } from "../../Alert/alert";
import COLORS from "../../asset/color";
import Images from "../../asset/images";
import constants from "../../locales/constants";
import axios from "axios";
import { AddUserModal } from "./AddFormModal/AddFormModal";
import { useNavigation } from "@react-navigation/native";

export const DataDisplayList = ({
  item,
  tableKey,
  reloadList,
  onEdit,
  link,
  mainMessage,
  submessage,
  data,
  schoolDataList,
  List,
}) => {
  const [userModal, setUserModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [dataArray, setDataArray] = useState();
  const navigation = useNavigation();

  const onDelete = () => {
    setAlert(true);
  };

  const onPressYes = async () => {
    setAlert(false);
    try {
      const response = await axios.delete(`${link}/${item.id}`);
      if (response.status === 200) {
        reloadList();
      }
    } catch (e) {}
  };

  return (
    <SafeAreaView style={Styles.firstView}>
      {data == "0" ?
        (<View style={Styles.mainView}>
          {tableKey.map((val, index) => (
            <TouchableOpacity onPress={() => schoolDataList(item)} key={index}>
              <View key={val} style={Styles.viewStyle}>
                <Text style={Styles.textStyle}>{item[val]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={Styles.mainView}>
          {tableKey.map((val) => (
            <View
              key={val}
              style={List === "screen" ? Styles.screenStyle : Styles.viewStyle}
            >
              <Text style={Styles.textStyle}>{item[val]}</Text>
            </View>
          ))}

          <View style={Styles.viewsssStyle}>
            <TouchableOpacity onPress={() => onEdit(item, "Edit")}>
              <Image source={Images.editIcon} />
            </TouchableOpacity>
          </View>
          <View style={Styles.viewsssStyle}>
            <TouchableOpacity onPress={onDelete}>
              <Image source={Images.deleteIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {userModal ? (
        <AddUserModal
          visible={userModal}
          setmodalVisible={(val) => setUserModal(val)}
          data={item}
          name={`Edit ${constants.School}`}
          buttonVal={constants.update}
        />
      ) : null}

      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={mainMessage?mainMessage:''}
          subMessage={submessage?submessage:''}
          type="question"
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
    width: "100%",
  },
  firstView: {
    backgroundColor: COLORS.LightGreen,
    height: 56,
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.4,
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
  },
  screenStyle: {
    width: "30%",
    marginTop: 12,
    marginHorizontal: 4,
  },
});
