import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryBar, VictoryLabel } from "victory-native";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import Loader from "../../../component/loader";
import constants from "../../../locales/constants";
import {
  exportDataToExcel,
  handleClick,
} from "../../../component/jsontoPdf/JsonToPdf";
import style from "./style";

export const BarChart = () => {
  const [loader, setLoader] = useState(false);
  const [sampleData, setsampleData] = useState([]);
  const getData = () => {
    axios
      .get(`${endUrl.get_ytd_status}`)
      .then((res) => {
        setLoader(false);
        data = res?.data?.data;
        setsampleData([
          {
            x: 1,
            y: data?.collection_accepted,
            label: "Collection Accepted",
          },
          {
            x: 2,
            y: data?.delivery_confirmed,
            label: "Delivery Confirmed",
          },
          {
            x: 3,
            y: data?.pending_collection,
            label: "Pending Collection",
          },
          {
            x: 4,
            y: data?.pending_delivery,
            label: "Pending Delivery",
          },
          {
            x: 5,
            y: data?.pending_repairs,
            label: "Pending Repair",
          },
          {
            x: 6,
            y: data?.pending_replenishment,
            label: "Pending Replanishment Approval",
          },
          {
            x: 7,
            y: data?.repair_completed,
            label: "Repair Completed",
          },
          {
            x: 8,
            y: data?.replenishment_approved,
            label: "Replanishment Approved",
          },
          {
            x: 9,
            y: data?.replenishment_rejected,
            label: "Replanishment Rejected",
          },
        ]);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    setLoader(true);
    getData();
  }, []);

  const onbarclick = () => {
    axios
      .get(endUrl.ytd_status_report)
      .then((res) => {
        Platform.OS == "android"
          ? handleClick("", {}, res?.data?.data, "YTD_Status_Report")
          : exportDataToExcel("", {}, res?.data?.data, "YTD_Status_Report");
      })
      .catch((e) => {});
  };

  return loader ? (
    <Loader />
  ) : (
    <View>
      <TouchableOpacity onPress={() => onbarclick()}>
        <Text style={style.dashbarchart}>{constants.YTD_Report_Status}</Text>
      </TouchableOpacity>
      <VictoryChart domainPadding={{ x: 50 }} width={380} height={500}>
        <VictoryBar
          style={{ data: { fill: "#7DB4EA" } }}
          data={sampleData}
          horizontal
          labels={({ datum }) => `${datum.label}`}
          labelComponent={<VictoryLabel textAnchor={"start"} dy={-17} x={50} />}
        />
      </VictoryChart>
    </View>
  );
};
