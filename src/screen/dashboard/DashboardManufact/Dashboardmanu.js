import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Text
} from "react-native";
import { useSelector } from "react-redux";
import Images from "../../../asset/images";
import constants from "../../../locales/constants";
import CommonService from "../../../locales/service";
import { BarChart } from "./DashboardBarChart";
import { DashboardButton } from "./DashboardButton";
import { GraphChart } from "./DashboardGraph";
import { DashPendingCollection } from "./Pendingcollection/pendingcollection";
import { Piechart } from "./PieChartDashboard";
import style from "./style";

export const DashboardManu = () => {
  const [dashboard_status, setDashboard_status] = useState(true);
  const loginData = useSelector((state) => state?.loginData);

  const [permissionId, setPermissionId] = useState({
    Dashboard_permission: false,
  });

  useLayoutEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [dashList] = CommonService.getPermission(arr, [46]);
    setPermissionId({
      Dashboard_permission: dashList,
    });
  }, []);
  const headerComponent = () => {
    return <Piechart />;
  };
  const footerComponent = () => {
    return <DashboardButton />;
  };
  return (
    <>
    {permissionId.Dashboard_permission?
    <SafeAreaView>
      {dashboard_status ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            ListHeaderComponent={() => headerComponent()}
            ListFooterComponent={() => footerComponent()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 20 }}
          />
          <View style={style.dashgraphView}>
            <GraphChart />
          </View>
          <View style={style.barchartView}>
            <BarChart />
          </View>
        </ScrollView>
      ) : (
        <DashPendingCollection />
      )}

      <View style={dashboard_status ? style.bottomIcon : style.bottomIcon1}>
        <TouchableOpacity
          onPress={() =>
            dashboard_status
              ? setDashboard_status(false)
              : setDashboard_status(true)
          }
        >
          {dashboard_status ? (
            <Image source={Images.dashboardline} />
          ) : (
            <Image source={Images.dashboardGroup} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    :
    <SafeAreaView style={style.mainsecView}>
    <View style={style.errorMsgView}>
      <Image source={Images.error} style={style.errIconStyle} />
      <Text style={style.errorMsg}>{constants.Error_Permission_Msg}</Text>
    </View>
    </SafeAreaView>
}
    </>
  );
};
