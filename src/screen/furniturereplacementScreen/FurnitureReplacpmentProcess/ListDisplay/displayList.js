import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AlertMessage } from "../../../../Alert/alert";
import COLORS from "../../../../asset/color";
import Images from "../../../../asset/images";
import constants from "../../../../locales/constants";
import { AddUserModal } from "../../../../locales/constants";
import Fonts from "../../../../asset/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { STANDARD_SCREEN_SIZE } from "../../../../utils/constants";
import { RfH, RfW } from "../../../../utils/helpers";

export const DisplayList = ({
  item,
  tableKey,
  onEdit,
  mainMessage,
  submessage,
  permissionId,
  organization,
  onDeleteFurItem,
  flatListData
}) => {
  const [userModal, setUserModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [mainMsg, setMainMsg] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const [previousData,setPreviousData]=useState([])

  const onchangeInp = (val) => {
    flatListData.map((element) => {
      if (element.id === item.id) {
        element.collected_count = val;
      }
    });
    setPreviousData(flatListData)
  };
  const onDelete = (item) => {
    if (organization == "School") {
      onDeleteFurItem(item);
    } else {
      setAlert(true);
    }
  };

  return (
    <SafeAreaView style={Styles.firstView}>
      <View style={Styles.mainView}>
        {tableKey.map((val, index) => (
          <View key={val} style={Styles.viewStyle} key={index}>
            {val === "collectionCount" ? (
              <TextInput
                placeholder={constants.Enterval}
                placeholderTextColor={COLORS.Black}
                style={Styles.inputStyles}
                onChangeText={(val) => onchangeInp(val)}
              />
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
            <TouchableOpacity onPress={() => onDelete(item)}>
              <Image source={Images.deleteIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>

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
    height: RfH(50),
  },
  firstView: {
    backgroundColor: COLORS.LightGreen,
    height: RfH(56),
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.4,
  },
  viewStyle: {
    width: RfW(180),
   alignSelf:'center',
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
    justifyContent: "center",
  },
  inputStyles: {
    height: RfH(30),
    backgroundColor: COLORS.White,
    width: RfW(140),
  },
});
