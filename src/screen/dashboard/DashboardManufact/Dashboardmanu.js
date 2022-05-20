import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Images from "../../../asset/images";
import { BarChart } from "./DashboardBarChart";
import { DashboardButton } from "./DashboardButton";
import { GraphChart } from "./DashboardGraph";
import { DashPendingCollection } from "./Pendingcollection/pendingcollection";
import { Piechart } from "./PieChartDashboard";
import style from "./style";

export const DashboardManu = () => {
  const [dashboard_status, setDashboard_status] = useState(true);
  const width = Dimensions.get("window").width;
  const headerComponent = () => {
    return <Piechart />;
  };
  const footerComponent = () => {
    return <DashboardButton />;
  };
  return (
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
  );
};
