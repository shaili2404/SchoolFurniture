import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Image,
} from "react-native";
import constants from "../../../../locales/constants";
import { useSelector } from "react-redux";
import Images from "../../../../asset/images";

import style from "./style";
import CommonService from "../../../../locales/service";
import Screen from "../../../../locales/navigationConst";
export const StockMaintenanceScreen = () => {
  const loginData = useSelector((state) => state?.loginData);
  const [permissionId, setPermissionId] = useState({
    stockItem: false,
    stockCat: false,
  });
  const navigation = useNavigation();
  // Get Permission to view all data list
  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [stockItem, stockCat] = CommonService.getPermission(arr, [17, 13]);
    setPermissionId({
      stockItem: stockItem,
      stockCat: stockCat,
    });
  }, []);
  return (
    <SafeAreaView style={style.container}>
      <View>
        {permissionId.stockCat && (
          <TouchableOpacity
            style={style.districtButton}
            onPress={() => navigation.navigate(Screen.StockCategory)}
          >
            <Text style={style.stockCategory}>{constants.stockCategory}</Text>
          </TouchableOpacity>
        )}
        {permissionId.stockItem && (
          <TouchableOpacity
            style={style.stockitemButton}
            onPress={() => navigation.navigate(Screen.Stock_Item)}
          >
            <Text style={style.stockitems}>{constants.stockitems}</Text>
          </TouchableOpacity>
        )}
        {permissionId.stockCat || permissionId.stockItem ? null : (
          <View style={style.errorMsgView}>
            <Image source={Images.error} style={style.errIconStyle} />
            <Text style={style.errorMsg}>{constants.Error_Permission_Msg}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
