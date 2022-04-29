import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { SafeAreaView, TouchableOpacity, Text, View, ScrollView } from "react-native";
import constants from "../../../../locales/constants";
import style from "./style";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../../../../asset/color";

export const Schoolmaintenancescreen = () => {
  const loginData = useSelector((state) => state?.loginData);
  const [permissionId, setPermissionId] = useState({
    districtList: false,
    schoolList: false,
  });
  const navigation = useNavigation();

  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    let disList = false,
      sclList = false;

    arr.forEach((input) => {
      if (input.id === 5) {
        disList = true;
      }
      if (input.id === 9) {
        sclList = true;
      }
    });
    setPermissionId({
      districtList: disList,
      schoolList: sclList,
    });
  }, []);

  const ButtonName = [
    permissionId.districtList && constants.Sc_District,
    constants.Cmc,
    constants.Circuit,
    constants.sub_places,
    permissionId.schoolList && constants.school,
  ];

  const navigatetoPage = (task) => {
    if (task == constants.Sc_District)
      navigation.navigate("School District");
    else if (task == constants.Circuit) navigation.navigate("Circuit");
    else if (task == constants.Cmc) navigation.navigate("Cmc");
    else if (task == constants.sub_places) navigation.navigate("Sub Places");
    else if (task == constants.school) navigation.navigate("School");
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView style={style.container}>
      
      <View>
        {ButtonName.map((ele) => (
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
        ))}
      </View>
   
    </SafeAreaView>
    </ScrollView>
  );
};
