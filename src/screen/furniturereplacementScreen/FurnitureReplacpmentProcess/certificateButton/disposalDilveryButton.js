import React, { useState,useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import COLORS from "../../../../asset/color";
import Images from "../../../../asset/images";
import Dropdown from "../../../../component/DropDown/dropdown";
import constants from "../../../../locales/constants";
import style from "./style";

export const DisposalDIlveryButton = ({
  onPressDeliveryNote,
  ondilverycheckboxone,
  printdilverystatus,
  uploadPrintDilveryStatus,
  uploadDilveryNote,
  checkboxStatusreplanish,
  oncheckboxvalue,
  taskofPage
}) => {
  const [checkBoxStatus1, setCheckBoxStatus1] = useState(false);
  const [checkBoxStatus2, setCheckBoxStatus2] = useState(false);

  const ondilverycheckone = () => {
    setCheckBoxStatus1(checkBoxStatus1 ? false : true);
    ondilverycheckboxone(checkBoxStatus1);
  };
  const onclickcheckbox = () => {
    setCheckBoxStatus2(checkBoxStatus2 ? false : true);
    oncheckboxvalue(checkBoxStatus2);
  };
  useEffect(() => {
    taskofPage  == constants.Status_pendingDilver ? setCheckBoxStatus1(true) : null
  }, []);
  return (
    <View style={{ backgroundColor: COLORS.White }}>
      <SafeAreaView style={style.mainView}>
        <View>
          <View style={style.bottonView}>
            <TouchableOpacity onPress={() => ondilverycheckone()} disabled={taskofPage == constants.Status_pendingDilver?true:false}>
              <View style={style.checkVIew} />
              {checkBoxStatus1 ? (
                <Image source={Images.rightIcon} style={style.rightTick} />
              ) : (
                false
              )}
            </TouchableOpacity>
            <View>
              <Text style={style.cecktext}>
                {constants.Delivery_hasreadytoDilvered}
              </Text>
            </View>
          </View>
          {printdilverystatus ? (
            <TouchableOpacity
              style={style.buttonCol}
              onPress={() => onPressDeliveryNote()}
            >
              <View style={style.printView}>
                <View>
                  <Image source={Images.printIconWhite} />
                </View>
                <View>
                  <Text style={style.textCOl}>{constants.Delivery_Note}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            false
          )}
          {uploadPrintDilveryStatus ? (
            <TouchableOpacity style={style.buttonCol} onPress={() => uploadDilveryNote()}>
              <View>
                <Text style={style.textCOl}>
                  {constants.Delivery_signedCopy}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            false
          )}
          {checkboxStatusreplanish?
          <View style={style.bottonView}>
            <TouchableOpacity
              onPress={() => onclickcheckbox()}
            >
              <View style={style.checkVIew} />
              {checkBoxStatus2 ? (
                <Image
                  source={Images.rightIcon}
                  style={{
                    height: 15,
                    width: 15,
                    alignSelf: "center",
                    position: "absolute",
                    top: 4,
                  }}
                />
              ) : (
                false
              )}
            </TouchableOpacity>
            <View>
              <Text style={style.cecktext}>
                {constants.Delivery_hasDelivered}
              </Text>
            </View>
          </View>
          : false}
        </View>
      </SafeAreaView>
    </View>
  );
};
