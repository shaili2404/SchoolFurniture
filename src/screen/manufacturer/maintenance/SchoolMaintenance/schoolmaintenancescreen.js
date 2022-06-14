import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import constants from "../../../../locales/constants";
import style from "./style";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../../../../asset/color";
import CommonService from "../../../../locales/service";
import Images from "../../../../asset/images";
import Screen from "../../../../locales/navigationConst";

export const Schoolmaintenancescreen = () => {
  const loginData = useSelector((state) => state?.loginData);
  const [permissionId, setPermissionId] = useState({
    districtList: false,
    schoolList: false,
    cmcList: false,
    circuitList: false,
    subplaceList: false,
  });
  const navigation = useNavigation();

  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [disList, sclList, cmcList, crtList, subList] =
      CommonService.getPermission(arr, [5, 9, 34, 38, 42]);
    setPermissionId({
      districtList: disList,
      schoolList: sclList,
      cmcList: cmcList,
      circuitList: crtList,
      subplaceList: subList,
    });
  }, []);

  const ButtonName = [
    permissionId.districtList && constants.Sc_District,
    permissionId.cmcList && constants.Cmc,
    permissionId.circuitList && constants.Circuit,
    permissionId.subplaceList && constants.sub_places,
    permissionId.schoolList && constants.school,
  ];

  const navigatetoPage = (task) => {
    if (task == constants.Sc_District)
      navigation.navigate(Screen.School_District);
    else if (task == constants.Circuit) navigation.navigate(Screen.Circuit);
    else if (task == constants.Cmc) navigation.navigate(Screen.Cmc);
    else if (task == constants.sub_places)
      navigation.navigate(Screen.Sub_Places);
    else if (task == constants.school) navigation.navigate(Screen.School);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={style.container}>
        <View>
          {ButtonName.map((ele) => (
            <>
              {ele != false ? (
                <TouchableOpacity onPress={() => navigatetoPage(ele)}>
                  <LinearGradient
                    colors={[COLORS.LinearBox, COLORS.GreenBox]}
                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 1 }}
                    style={style.schoolButton}
                  >
                    <Text style={style.schooldistrict}>{ele}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : null}
            </>
          ))}
          {permissionId.districtList ||
          permissionId.cmcList ||
          permissionId.circuitList ||
          permissionId.subplaceList ||
          permissionId.schoolList ? null : (
            <View style={style.errorMsgView}>
              <Image source={Images.error} style={style.errIconStyle} />
              <Text style={style.errorMsg}>
                {constants.Error_Permission_Msg}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
