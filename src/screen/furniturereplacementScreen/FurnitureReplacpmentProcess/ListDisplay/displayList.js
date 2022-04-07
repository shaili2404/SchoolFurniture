import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { AlertMessage } from "../../../../Alert/alert";
import COLORS from "../../../../asset/color";
import Images from "../../../../asset/images";
import constants from "../../../../locales/constants";
import { AddUserModal } from "../../../../locales/constants";
import Fonts from "../../../../asset/Fonts";
import { RfW } from "../../../../utils/helpers";

export const DisplayList = ({
  item,
  tableKey,
  onEdit,
  mainMessage,
  submessage,
  permissionId,
  organization,
  onDeleteFurItem,
  flatListData,
  onSubmitDetails,
  pageStatus,
}) => {
  const [userModal, setUserModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [mainMsg, setMainMsg] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const [previousData, setPreviousData] = useState([]);

  const onchangeInp = (val) => {
    flatListData.map((element) => {
      if (element.id === item.id) {
        element.confirm_count = val;
      }
    });
    setPreviousData(flatListData);
    onSubmitDetails(previousData);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "position" : null}
        keyboardVerticalOffset={0}
      >
        <View style={Styles.mainView}>
          {tableKey.map((val, index) => (
            <View key={val} style={Styles.viewStyle} key={index}>
              {pageStatus == "Pending Repairs" ? (
                <>
                  {val == "reparableitem" || val == "replanishitem" ? (
                    <TextInput
                      placeholder={val == 'replanishitem' ? '' : constants.Enterval}
                      placeholderTextColor={COLORS.Black}
                      style={Styles.inputStyles}
                      onChangeText={(val) => onchangeInp(val)}
                      value={item[val]}
                      editable={val == 'replanishitem' ? false : true}
                    />
                  ) : (
                    <Text style={Styles.textStyle}>{item[val]}</Text>
                  )}
                </>
              ) : (
                <>
                  {val == 'collectionCount' ? (
                    <TextInput
                      placeholder={constants.Enterval}
                      placeholderTextColor={COLORS.Black}
                      style={Styles.inputStyles}
                      onChangeText={(val) => onchangeInp(val)}
                    />
                  ) : (
                    <Text style={Styles.textStyle}>{item[val]}</Text>
                  )}
                </>
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
      </KeyboardAvoidingView>
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
    fontSize: 14,
    color: COLORS.Black,
    textAlign: "left",
    textAlignVertical: "center",
  },
  mainView: {
    flexDirection: "row",
    width: "100%",
    height: 50,
  },
  firstView: {
    backgroundColor: COLORS.LightGreen,
    height: 56,
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.4,
  },
  viewStyle: {
    width: RfW(180),
    alignSelf: "center",
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
    height: 35,
    backgroundColor: COLORS.White,
    width: 140,
  },
  grayinputStyles: {
    height: 35,
    backgroundColor: COLORS.graybackground,
    width: 140,
  },
});
