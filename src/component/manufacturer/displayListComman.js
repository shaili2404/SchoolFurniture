import React, { useState, useEffect } from "react";
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
import Fonts from "../../asset/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { STANDARD_SCREEN_SIZE } from "../../utils/constants";
import { RfH, RfW } from "../../utils/helpers";

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
  permissionId,
  page,
  List,
}) => {
  const [userModal, setUserModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [address1, setAddress1] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [mainMsg, setMainMsg] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const navigation = useNavigation();

  const onDelete = () => {
    setAlert(true);
  };

  useEffect(() => {
    let address;
    let addressone = item.address1 === null ? "" : item.address1;
    let addresstwo = item.address2 === null ? "" : item.address2;
    let addressthree = item.address3 === null ? "" : item.address3;
    let addressfour = item.address4 === null ? "" : item.address4;
    let streetcode = item.street_code === null ? "" : item.street_code;
    tableKey.map((val) => {
      if (val === "address1") {
        address = `${addressone}${addresstwo}${addressthree}${addressfour}${streetcode}`;
      }
    });
    setAddress1(address);
  }, []);

  const onPressYes = async () => {
    setAlert(false);
    try {
      const response = await axios.delete(`${link}/${item.id}`);
      if (response.status === 200) {
        reloadList();
      }
    } catch (e) {
      setMainMsg(e?.response?.data?.message);
      setSubMsg(e?.response?.data?.data);
      setErrorMsg(true);
    }
  };

  return (
    <SafeAreaView style={Styles.firstView}>
      {data == "0" ? (
        <View style={Styles.mainView}>
          {tableKey.map((val, index) => (
            <TouchableOpacity
              onPress={() => schoolDataList(item, "Edit")}
              key={index}
            >
              <View key={val} style={Styles.viewStyle}>
                <Text style={Styles.textStyle}>{item[val]}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={Styles.mainView}>
          {tableKey.map((val, index) => (
            <View
              key={val}
              style={List === "screen" ? Styles.screenStyle : Styles.viewStyle}
              key={index}
            >
              {val === "address1" && page === "School" ? (
                <Text style={Styles.textStyle} numberOfLines={1}>
                  {address1}
                </Text>
              ) : (
                <Text style={Styles.textStyle}>{item[val]}</Text>
              )}
            </View>
          ))}
       
              {permissionId.userEdit && (
                <View style={Styles.viewsssStyle}>
                  <TouchableOpacity onPress={() => onEdit(item, "Edit")}>
                    <Image source={Images.editIcon} />
                  </TouchableOpacity>
                </View>
              )}
              {permissionId.userDelete && (
                <View style={Styles.viewsssStyle}>
                  <TouchableOpacity onPress={()=>onDelete(item)}>
                    <Image source={Images.deleteIcon} />
                  </TouchableOpacity>
                </View>
              )}
        </View>
      )}

      {userModal ? (
        <AddUserModal
          visible={userModal}
          setmodalVisible={(val) => setUserModal(val)}
          data={item}
          name={`Edit ${constants.School} `}
          buttonVal={constants.update}
        />
      ) : null}

      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={mainMessage ? mainMessage : ""}
          subMessage={submessage ? submessage : ""}
          type="question"
          onConfirm={() => onPressYes()}
        />
      ) : null}
      {errorMsg ? (
        <AlertMessage
          visible={errorMsg}
          setmodalVisible={(val) => setErrorMsg(val)}
          mainMessage={mainMsg}
          subMessage={subMsg}
        />
      ) : null}
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.regular,
    fontSize: RFValue(14, STANDARD_SCREEN_SIZE),
    color: COLORS.Black,
    textAlign: "left",
    textAlignVertical: "center",
  },
  mainView: {
    flexDirection: "row",
    width: "100%",
    height:RfH(50)
  },
  firstView: {
    backgroundColor: COLORS.LightGreen,
    height: RfH(56),
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.4,
  },
  viewStyle: {
    width: RfW(180),
    marginTop: RfH(12),
    marginHorizontal: 20,
 
  },
  viewsssStyle: {
    width: 20,
    marginTop: 12,
    marginHorizontal: 20,
  },
  screenStyle: {
    width: "30%",
    marginHorizontal: 4,
    justifyContent:'center'
  },
});
