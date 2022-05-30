import React, { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryLegend,
  VictoryAxis,
} from "victory-native";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import Loader from "../../../component/loader";
import constants from "../../../locales/constants";
import style from "./style";
import {
  exportDataToExcel,
  handleClick,
} from "../../../component/jsontoPdf/JsonToPdf";

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
            x: 1,
            y: data?.collection_accepted,
            color: "#88B2DC",
          },
          {
            x: 2,
            y: data?.delivery_confirmed,
            color: "#E97A7A",
          },
          {
            x: 3,
            y: data?.pending_collection,
            color: "#8CBD90",
          },
          {
            x: 4,
            y: data?.pending_delivery,
            color: "#C3AF7A",
          },
          {
            x: 5,
            y: data?.pending_repairs,
            color: "#AEF182",
          },
          {
            x: 6,
            y: data?.pending_replenishment,
            color: "#FF6700",
          },
          {
            x: 7,
            y: data?.repair_completed,
            color: "#FFC000",
          },
          {
            x: 8,
            y: data?.replenishment_approved,
            color: "#FFBF94",
          },
          {
            x: 9,
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
          ? handleClick("", {}, res?.data?.data?.records, "Previous_year_chart")
          : exportDataToExcel(
              "",
              {},
              res?.data?.data?.records,
              "Previous_year_chart"
            );
      })
      .catch((e) => {});
  };

  return loader ? (
    <Loader />
  ) : (
    <View>
      <TouchableOpacity onPress={() => onbarclick()}>
        <Text style={style.dashbarchart}>{constants.Previous_year_status}</Text>
      </TouchableOpacity>
      <VictoryChart domainPadding={{ x: 50 }} width={380} height={500}>
        <VictoryBar
          style={{ data: { fill: ({ datum }) => `${datum.color}` } }}
          data={sampleData}
        />
        <VictoryAxis
         dependentAxis
          style={{
             ticks: { stroke: "transparent" },
          }}
        />
         <VictoryAxis
          style={{
            //  ticks: { stroke: "transparent" },
            tickLabels: { fill: "transparent" },
          }}
        />

      </VictoryChart>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View>
          <VictoryLegend
            height={200}
            width={150}
            orientation="vertical"
            style={{ labels: { fontSize: 12 } }}
            data={[
              {
                name: `${constants.Status_CollectionAccepted}-${data?.collection_accepted}`,
                symbol: { fill: "#88B2DC", type: "cricle" },
              },
              {
                name: `${constants.Status_DeliveryConfirmed}-${data?.delivery_confirmed}`,
                symbol: { fill: "#E97A7A", type: "cricle" },
              },
              {
                name: `${constants.Status_PendingCollection}-${data?.pending_collection}`,
                symbol: { fill: "#8CBD90", type: "cricle" },
              },
              {
                name: `${constants.Status_pendingDilver}-${data?.pending_delivery}`,
                symbol: { fill: "#C3AF7A", type: "cricle" },
              },
              {
                name: `${constants.Status_pendingRepair}-${data?.pending_repairs}`,
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
                name: `${constants.Pending_Replenishment_Approval}-${data?.pending_replenishment}`,
                symbol: { fill: "#FF6700", type: "cricle" },
              },
              {
                name: `${constants.Status_RepairCompleted}-${data?.repair_completed}`,
                symbol: { fill: "#FFC000", type: "cricle" },
              },
              {
                name: `${constants.Replenishment_Approved}-${data?.replenishment_approved}`,
                symbol: { fill: "#FFBF94", type: "cricle" },
              },
              {
                name: `${constants.Replenishment_Rejected}-${data?.replenishment_rejected}`,
                symbol: { fill: "#2F5597", type: "cricle" },
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};
