import React, { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryLabel,
  VictoryAxis,
} from "victory-native";
import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import Loader from "../../../component/loader";
import constants from "../../../locales/constants";
import {
  exportDataToExcel,
  handleClick,
} from "../../../component/jsontoPdf/JsonToPdf";
import style from "./style";
import Images from "../../../asset/images";

export const BarChart = () => {
  const [loader, setLoader] = useState(false);
  const tableHeader = [
    constants.schoolName,
    constants.emisNumber,
    constants.District,
    constants.referenceNumber,
    constants.dateCreated,
    constants.FurCategory,
    constants.furItem,
    constants.status,
  ];
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
            y: data?.delivery_confirmed,
            label: constants.Status_DeliveryConfirmed,
          },
          {
            x: 2,
            y: data?.pending_delivery,
            label: constants.Status_pendingDilver,
          },
          {
            x: 3,
            y: data?.partial_replenishment,
            label: constants.Status_Partial_Replenishment,
          },
          {
            x: 4,
            y: data?.replenishment_rejected,
            label: constants.Status_Replanishment_Rejected,
          },
          {
            x: 5,
            y: data?.replenishment_approved,
            label: constants.Status_Replanishment_Approved,
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
            y: data?.pending_repairs,
            label: constants.Status_pendingRepair,
          },
          {
            x: 9,
            y: data?.collection_accepted,
            label: constants.Status_CollectionAccepted,
          },
          {
            x: 10,
            y: data?.pending_collection,
            label: constants.Status_PendingCollection,
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
          ? handleClick(
              "",
              {},
              res?.data?.data,
              "YTD_Status_Report",
              tableHeader
            )
          : exportDataToExcel(
              "",
              {},
              res?.data?.data,
              "YTD_Status_Report",
              tableHeader
            );
      })
      .catch((e) => {});
  };

  return loader ? (
    <Loader />
  ) : (
    <View>
      <TouchableOpacity onPress={() => onbarclick()} style={style.mainVIew}>
        <Text style={style.dashbarchart}>{constants.YTD_Report_Status}</Text>
        <Image style={style.dashbarimagesicon} source={Images.downloadIcon} />
      </TouchableOpacity>
      <VictoryChart domainPadding={{ x: 50 }} width={380} height={500}>
        <VictoryBar
          style={{ data: { fill: "#7DB4EA" } }}
          data={sampleData}
          horizontal
          labels={({ datum }) => `${datum.label}`}
          labelComponent={<VictoryLabel textAnchor={"start"} dy={-17} x={50} />}
        />
        <VictoryAxis
          dependentAxis
          style={{
            ticks: { stroke: "transparent" },
          }}
        />
        <VictoryAxis
          style={{
            tickLabels: { fill: "transparent" },
          }}
        />
      </VictoryChart>
    </View>
  );
};
