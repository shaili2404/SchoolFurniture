import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import COLORS from "../../../../asset/color";
import Images from "../../../../asset/images";
import constants from "../../../../locales/constants";
import endUrl from "../../../../redux/configration/endUrl";
import style from "./style";

export const DisposalCertificateButton = ({
  ondisposalcertPress,
  onreplanishemailcer,
  replanishCertificateStatus,
  EmailreplanishCertificateStatus,
  statusOFreplanishCertificateStatus,
  onUploadreplanisNote,
  checkboxStatusreplanish,
  oncheckboxvalue,
  disableUpload={disableUploadcpy}
}) => {
  const [checkBoxStatus, setCheckBoxStatus] = useState(false);
  const [distList, setDistList] = useState([]);

  const onclickcheckbox = () => {
    setCheckBoxStatus(checkBoxStatus ? false : true);
    oncheckboxvalue(checkBoxStatus);
  };

  const getstatusList = () => {
    axios
      .get(`${endUrl.replanishStatus}`)
      .then((res) => {
        setDistList(res?.data?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getstatusList();
  }, []);

  return (
    <View style={{ backgroundColor: COLORS.White }}>
      <SafeAreaView style={style.mainView}>
        <View>
          {replanishCertificateStatus ? (
            <TouchableOpacity
              style={style.buttonCol}
              onPress={() => ondisposalcertPress()}
            >
              <View style={style.printView}>
                <View>
                  <Image source={Images.printIconWhite} />
                </View>
                <View>
                  <Text style={style.textCOl}>
                    {constants.Replanish_Disposalcertificate}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ) : null}
          {EmailreplanishCertificateStatus ? (
            <TouchableOpacity
              style={style.buttonCol}
              onPress={() => onreplanishemailcer()}
            >
              <View>
                <Text style={style.textCOl}>
                  {constants.Replanish_certificate}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
          {statusOFreplanishCertificateStatus ? (
            <TouchableOpacity
            style={disableUpload ? style.buttonColopacity : style.buttonCol}
            disabled={disableUpload ? true : false}
              onPress={() => onUploadreplanisNote()}
            >
              <View>
                <Text style={style.textCOl}>
                  {constants.Replanish_proofreplanish}
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}
          {checkboxStatusreplanish ? (
            <View style={style.bottonView}>
              <TouchableOpacity onPress={() => onclickcheckbox()}>
                <View style={style.checkVIew} />
                {checkBoxStatus ? (
                  <Image
                    source={Images.rightIcon}
                    style={style.checkboxRightStyle}
                  />
                ) : (
                  false
                )}
              </TouchableOpacity>
              <View>
                <Text style={style.cecktext}>
                  {constants.Replanish_checkMessage}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
};
