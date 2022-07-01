import React, { useState, useEffect } from "react";
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
import ConstKey from "../../../../locales/ApikeyConst";

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
  onSubmitreparableDetails,
  onsubmitDilverdetails,
  onsubmitApproved,
}) => {
  const [userModal, setUserModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [mainMsg, setMainMsg] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const [repItem, setRepItem] = useState("");
  const [reparable, setReparableItem] = useState("");
  const [reparable_Aprroved, setreparable_Aprroved] = useState("");
  const [reparable_Reject, setreparable_Reject] = useState("");
  const [confirmCount, setConfirmCount] = useState("");
  const [deliverCount, setDeliverCount] = useState("");
  const checkZero = item?.replenish_count
    ? item?.replenish_count
    : item?.replenished_count;

  const onchangeInp = (val) => {
    let Confirm_cnt;
    if (val > item.count) Confirm_cnt = item.count;
    else Confirm_cnt = val;
    setConfirmCount(Confirm_cnt);
    flatListData.map((element) => {
      if (element.id === item.id) element.confirm_count = Confirm_cnt;
    });
    onSubmitDetails(flatListData);
  };

  const onchangereparableval = (val) => {
    let value = item?.confirmed_count - val;
    if (val == "") {
      setRepItem("");
      setReparableItem("");
    } else if (val < 0) {
      setReparableItem("");
      setRepItem("");
    } else if (val > item?.confirmed_count) {
      setReparableItem(item?.confirmed_count);
      setRepItem(0);
    } else if (val <= item?.confirmed_count) {
      setRepItem(value);
      setReparableItem(val);
    }

    flatListData.map((element) => {
      if (element.id === item.id) {
        if (val == "") element.replenish_count = "";
        else
          element.replenish_count =
            value < 0 ? 0 : element?.confirmed_count - val;
        element.repair_count =
          val > element.confirmed_count
            ? element?.confirmed_count
            : val < 0
            ? 0
            : val;
      }
    });
    onSubmitreparableDetails(flatListData);
  };

  const onApprovedRejectQty = (value) => {
    const val = item?.replenish_count
      ? item.replenish_count
      : item?.replenished_count;
    const reject_count = val - value;
    if (value == "") {
      setreparable_Aprroved("");
      setreparable_Reject("");
    } else if (value < 0) {
      setreparable_Aprroved("");
      setreparable_Reject("");
    } else if (value > val) {
      setreparable_Aprroved(val);
      setreparable_Reject(0);
    } else if (value <= val) {
      setreparable_Aprroved(value);
      setreparable_Reject(reject_count);
    }

    flatListData.map((element) => {
      if (element.id === item.id) {
        if (value == "") element.reject_count = "";
        else element.reject_count = reject_count > 0 ? reject_count : 0;
        element.accept_count = value > val ? val : value > 0 ? value : 0;
      }
    });
    onsubmitApproved(flatListData);
  };
  useEffect(() => {
    flatListData.map((element) => {
      if (element?.id == item?.id) {
        element.deliver_count =
          item?.repaired_count + item?.approved_replenished_count;
        element.deliveritem =
          item?.repaired_count + item?.approved_replenished_count;
      }
    });
    onsubmitDilverdetails(flatListData);
  }, []);
  useEffect(() => {
    flatListData.map((element) => {
      if (element?.id == item?.id) {
        if (checkZero == 0) {
          element.accept_count = "0";
          element.reject_count = "0";
        }
      }
    });
    onApprovedRejectQty(flatListData);
  }, []);

  const onDelete = (item) => {
    if (organization == constants.school) onDeleteFurItem(item);
    else setAlert(true);
  };

  return (
    <SafeAreaView style={Styles.firstView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "position" : null}
        keyboardVerticalOffset={0}
      >
        <View style={Styles.mainView}>
          {tableKey.map((val, index) => (
            <View key={val} style={Styles.viewStyle}>
              {pageStatus == constants.Status_pendingRepair ? (
                <>
                  {val == ConstKey.reparableitem ||
                  val == ConstKey.replanishitem ? (
                    <TextInput
                      placeholder={
                        val == ConstKey.replanishitem ? "" : constants.Enterval
                      }
                      placeholderTextColor={COLORS.Black}
                      style={
                        val == ConstKey.replanishitem
                          ? Styles.grayinputStyles
                          : Styles.inputStyles
                      }
                      onChangeText={(value) => onchangereparableval(value)}
                      value={
                        val == ConstKey.replanishitem
                          ? String(repItem)
                          : String(reparable)
                      }
                      editable={val == ConstKey.replanishitem ? false : true}
                      keyboardType="numeric"
                    />
                  ) : (
                    <>
                      {val == ConstKey.Approved_Items ||
                      val == ConstKey.Rejected_Items ? (
                        <>
                          {checkZero == 0 ? (
                            <Text style={Styles.textStyle}>0</Text>
                          ) : (
                            <TextInput
                              placeholder={
                                val == ConstKey.replanishitem
                                  ? ""
                                  : constants.Enterval
                              }
                              placeholderTextColor={COLORS.Black}
                              style={
                                val == ConstKey.Rejected_Items
                                  ? Styles.grayinputStyles
                                  : Styles.inputStyles
                              }
                              onChangeText={(value) =>
                                onApprovedRejectQty(value)
                              }
                              value={
                                val == ConstKey.Rejected_Items
                                  ? String(reparable_Reject)
                                  : String(reparable_Aprroved)
                              }
                              editable={
                                val == ConstKey.Rejected_Items ? false : true
                              }
                              keyboardType="numeric"
                            />
                          )}
                        </>
                      ) : (
                        <Text style={Styles.textStyle}>{item[val]}</Text>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {pageStatus == constants.Status_RepairCompleted ? (
                    <>
                      {val == ConstKey.deliveritem ? (
                        <Text style={Styles.textStyle}>
                          {String(item[val])}
                        </Text>
                      ) : (
                        <Text style={Styles.textStyle}>{item[val]}</Text>
                      )}
                    </>
                  ) : (
                    <>
                      {val == ConstKey.collectionCount ? (
                        <TextInput
                          placeholder={constants.Enterval}
                          placeholderTextColor={COLORS.Black}
                          style={Styles.inputStyles}
                          onChangeText={(val) => onchangeInp(val)}
                          keyboardType="numeric"
                          value={String(confirmCount)}
                        />
                      ) : (
                        <Text style={Styles.textStyle}>{item[val]}</Text>
                      )}
                    </>
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
          type={constants.dropdown_Type}
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
    width: RfW(110),
    alignSelf: "center",
    marginHorizontal: 5,
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
    backgroundColor: COLORS.White,
    width: 140,
  },
});

