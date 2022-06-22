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
        console.log('23',data)
        setsampleData([
          {
            x: 1,
            y: data?.collection_accepted,
            label: constants.Status_CollectionAccepted,
          },
          {
            x: 2,
            y: data?.delivery_confirmed,
            label: constants.Status_DeliveryConfirmed,
          },
          {
            x: 3,
            y: data?.pending_collection,
            label: constants.Status_PendingCollection,
          },
          {
            x: 4,
            y: data?.pending_delivery,
            label: constants.Status_pendingDilver,
          },
          {
            x: 5,
            y: data?.pending_repairs,
            label: constants.Status_pendingRepair,
          },
          {
            x: 6,
            y: data?.pending_replenishment,
            label: constants.Status_Pending_Replanishment_Approval,
          },
          {
            x: 7,
            y: data?.repair_completed,
            label: constants.Status_RepairCompleted,
          },
          {
            x: 8,
            y: data?.replenishment_approved,
            label: constants.Status_Replanishment_Approved,
          },
          {
            x: 9,
            y: data?.replenishment_rejected,
            label: constants.Status_Replanishment_Rejected,
          },
          {
            x: 10,
            y: data?.partial_replenishment,
            label: constants.Status_Partial_Replenishment,
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
