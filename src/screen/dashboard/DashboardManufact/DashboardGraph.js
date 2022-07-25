import React, { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryLegend,
  VictoryAxis,
} from "victory-native";
import { View, Text, TouchableOpacity, Platform, Image } from "react-native";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import Loader from "../../../component/loader";
import constants from "../../../locales/constants";
import style from "./style";
import {
  exportDataToExcel,
  handleClick,
} from "../../../component/jsontoPdf/JsonToPdf";
import Images from "../../../asset/images";
import { RfH, RfW } from "../../../utils/helpers";

export const GraphChart = () => {
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
      .get(`${endUrl.Previous_year_status}`)
      .then((res) => {
        setLoader(false);
        data = res?.data?.data;
        setsampleData([
          {
            x: 1,
            y: data?.pending_collection == 0 ? 0 : data?.pending_collection,
            color: "#8CBD90",
          },
          {
            x: 2,
            y: data?.collection_accepted == 0 ? 0 : data?.collection_accepted,
            color: "#88B2DC",
          },
          {
            x: 3,
            y: data?.pending_repairs == 0 ? 0 : data?.pending_repairs,
            color: "#AEF182",
          },
          {
            x: 4,
            y: data?.repair_completed == 0 ? 0 : data?.repair_completed,
            color: "#FFC000",
          },
          {
            x: 5,
            y:
              data?.pending_replenishment == 0
                ? 0
                : data?.pending_replenishment,
            color: "#FF6700",
          },   
          {
            x: 6,
            y:
              data?.replenishment_approved == 0
                ? 0
                : data?.replenishment_approved,
            color: "#FFBF94",
          },
          {
            x: 7,
            y:
              data?.replenishment_rejected == 0
                ? 0
                : data?.replenishment_rejected,
            color: "#2F5597",
          },
          {
            x: 8,
            y:
              data?.partial_replenishment == 0
                ? 0
                : data?.partial_replenishment,
            color: "#88B2DC",
          },
          {
            x: 9,
            y: data?.pending_delivery == 0 ? 0 : data?.pending_delivery,
            color: "#C3AF7A",
          },
          {
            x: 10,
            y: data?.delivery_confirmed == 0 ? 0 : data?.delivery_confirmed,
            color: "#E97A7A",
          },
        ]);
      })
      .catch((e) => {
        setsampleData(undefined);
      });
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
          ? handleClick(
              "",
              {},
              res?.data?.data?.records,
              "Previous year status",
              tableHeader
            )
          : exportDataToExcel(
              "",
              {},
              res?.data?.data?.records,
              "Previous year status",
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
        <Text style={style.dashbarchart}>{constants.Previous_year_status}</Text>
        <Image style={style.dashbarimagesicon} source={Images.downloadIcon} />
      </TouchableOpacity>
      <VictoryChart domainPadding={{ x: 50 }} width={RfW(380)} height={RfH(500)}>
        {sampleData == undefined ? null : (
          <VictoryBar
            style={{ data: { fill: ({ datum }) => `${datum.color}` } }}
            data={sampleData}
          />
        )}
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
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View>
          <VictoryLegend
            height={200}
            width={150}
            orientation="vertical"
            style={{ labels: { fontSize: 12 } }}
            data={[
              {
                name: `${constants.Status_PendingCollection}-${data?.pending_collection}`,
                symbol: { fill: "#8CBD90", type: "cricle" },
              },
              {
                name: `${constants.Status_CollectionAccepted}-${data?.collection_accepted}`,
                symbol: { fill: "#88B2DC", type: "cricle" },
              },
              {
                name: `${constants.Status_pendingRepair}-${data?.pending_repairs}`,
                symbol: { fill: "#AEF182", type: "cricle" },
              },
              {
                name: `${constants.Status_RepairCompleted}-${data?.repair_completed}`,
                symbol: { fill: "#FFC000", type: "cricle" },
              },
              {
                name: `${constants.Pending_Replenishment_Approval}-${data?.pending_replenishment}`,
                symbol: { fill: "#FF6700", type: "cricle" },
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
                name: `${constants.Replenishment_Approved}-${data?.replenishment_approved}`,
                symbol: { fill: "#FFBF94", type: "cricle" },
              },
              {
                name: `${constants.Replenishment_Rejected}-${data?.replenishment_rejected}`,
                symbol: { fill: "#2F5597", type: "cricle" },
              },
              {
                name: `${constants.Status_Partial_Replenishment}-${data?.partial_replenishment}`,
                symbol: { fill: "#88B2DC", type: "cricle" },
              },
              {
                name: `${constants.Status_pendingDilver}-${data?.pending_delivery}`,
                symbol: { fill: "#C3AF7A", type: "cricle" },
              },
              {
                name: `${constants.Status_DeliveryConfirmed}-${data?.delivery_confirmed}`,
                symbol: { fill: "#E97A7A", type: "cricle" },
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};
