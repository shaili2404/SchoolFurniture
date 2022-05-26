import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryBar, VictoryLegend,VictoryAxis } from "victory-native";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import Loader from "../../../component/loader";
import constants from "../../../locales/constants";
import style from "./style";
import { exportDataToExcel, handleClick } from "../../../component/jsontoPdf/JsonToPdf";

export const GraphChart = () => {
  const [loader, setLoader] = useState(false);
  const [sampleData, setsampleData] = useState([]);
  const getData = () => {
    axios
      .get(`${endUrl.Previous_year_status}`)
      .then((res) => {
        setLoader(false);
        data = res?.data?.data;
        setsampleData([
          {
            x: " ",
            y: data?.collection_accepted,
            color: "#88B2DC",
          },
          {
            x: " ",
            y: data?.delivery_confirmed,
            color: "#E97A7A",
          },
          { 
            x: " ",
            y: data?.pending_collection,
            color: "#8CBD90",
          },
          {
            x: " ",
            y: data?.pending_delivery,
            color: "#C3AF7A",
          },
          {
            x: " ",
            y: data?.pending_repairs,
            color: "#AEF182",
          },
          {
            x: " ",
            y: data?.pending_replenishment,
            color: "#FF6700",
          },
          {
            x: " ",
            y: data?.repair_completed,
            color: "#FFC000",
          },
          {
            x: " ",
            y: data?.replenishment_approved,
            color: "#FFBF94",
          },
          {
            x: " ",
            y: data?.replenishment_rejected,
            color: "#2F5597",
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
      .get(endUrl.DownloadPreviousYearStatus)
      .then((res) => {
        Platform.OS == "android"
          ? handleClick("", {}, res?.data?.data, "Previous_year_chart")
          : exportDataToExcel("", {}, res?.data?.data, "Previous_year_chart");
      })
      .catch((e) => {
      });
  };

  return loader ? (
    <Loader />
  ) : (
    <View>
      <TouchableOpacity
        onPress={() => onbarclick()}
      >
        <Text style={style.dashbarchart}>{constants.Previous_year_status}</Text>
      </TouchableOpacity>
      <VictoryChart domainPadding={{ x: 50 }} width={380} height={500}>
        <VictoryBar
          style={{ data: { fill: ({ datum }) => `${datum.color}` } }}
          data={sampleData}
        />
      </VictoryChart>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View>
          <VictoryLegend
            height={200}
            width={170}
            orientation="vertical"
            style={{ labels: { fontSize: 12 } }}
            data={[
              {
                name: constants.Status_CollectionAccepted,
                symbol: { fill: "#88B2DC", type: "cricle" },
              },
              {
                name: constants.Status_DeliveryConfirmed,
                symbol: { fill: "#E97A7A", type: "cricle" },
              },
              {
                name: constants.Status_PendingCollection,
                symbol: { fill: "#8CBD90", type: "cricle" },
              },
              {
                name: constants.Status_pendingDilver,
                symbol: { fill: "#C3AF7A", type: "cricle" },
              },
              {
                name: constants.Status_pendingRepair,
                symbol: { fill: "#AEF182", type: "cricle" },
              },
            ]}
          />
        </View>
        <View>
          <VictoryLegend
            height={170}
            width={200}
            orientation="vertical"
            style={{ labels: { fontSize: 12 } }}
            data={[
              {
                name: constants.Pending_Replenishment_Approval,
                symbol: { fill: "#FF6700", type: "cricle" },
              },
              {
                name: constants.Status_RepairCompleted,
                symbol: { fill: "#FFC000", type: "cricle" },
              },
              {
                name: constants.Replenishment_Approved,
                symbol: { fill: "#FFBF94", type: "cricle" },
              },
              {
                name: constants.Replenishment_Rejected,
                symbol: { fill: "#2F5597", type: "cricle" },
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};
