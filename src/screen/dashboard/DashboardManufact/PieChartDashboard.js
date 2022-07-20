import React, { useEffect, useState } from "react";
import { VictoryPie, VictoryLegend } from "victory-native";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import constants from "../../../locales/constants";
import style from "./style";
import endUrl from "../../../redux/configration/endUrl";
import axios from "axios";
import Loader from "../../../component/loader";

export const Piechart = () => {
  data = [];

  const [loader, setLoader] = useState(false);
  const [sampleData, setsampleData] = useState([]);

  const getData = () => {
     
    axios
      .get(endUrl.get_percentagecollection)
      .then((res) => {
        setLoader(false);
        data = res?.data?.data;
        setsampleData([
          data?.pending_repairs == 0
            ? { x: 0, y: 0 }
            : { x: 1, y: (data?.pending_repairs) },
            data?.repair_completed == 0
            ? { x: 0, y: 0 }
            : { x: 2, y: (data?.repair_completed) },
            data?.pending_replenishment_approval == 0
            ? { x: 0, y: 0 }
            : { x: 3, y: (data?.pending_replenishment_approval) },
            data?.replenishment_approved == 0
            ? { x: 0, y: 0 }
            : { x: 4, y: (data?.replenishment_approved) },
            data?.replenishment_rejected == 0
            ? { x: 0, y: 0 }
            : { x: 5, y: (data?.replenishment_rejected) },
            data?.pending_delivery == 0
            ? { x: 0, y: 0 }
            : { x: 6, y: (data?.pending_delivery) },
          data?.delivery_confirmed == 0
            ? { x: 0, y: 0 }
            : { x: 7, y: (data?.delivery_confirmed) }, 
        ]);
      })
      .catch((e) => {
       
      });
  };

  useEffect(() => {
    setLoader(true);
    getData();
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <View style={style.pieViewss}>
      <Text style={style.textchart}>{constants.Progress_from_Collections}</Text>
      <View style={style.pieView}>
        <VictoryPie
          colorScale={[
            "#AEF182",
            "#BF9514",
            "#9E480E",
            "#72B746",
            "#FFBF94",
            "#FFC000",
            "#FF6700",
          ]}
          width={200}
          height={200}
          labels={({ datum }) => (datum.y == 0 ? "" : `${datum.y}%`)}
          labelPosition={"centroid"}
          labelPlacement={"parallel"}
          labelRadius={40}
          data={sampleData}
          radius={90}
        />

        <VictoryLegend
          orientation="vertical"
          style={{ labels: { fontSize: 12 } }}
          data={[
            {
              name: constants.Status_pendingRepair,
              symbol: { fill: "#AEF182", type: "square" },
            },
            {
              name: constants.Status_RepairCompleted,
              symbol: { fill: "#BF9514", type: "square" },
            },
            {
              name: constants.Pending_Replenishment_Approval,
              symbol: { fill: "#9E480E", type: "square" },
            },
            {
              name: constants.Replenishment_Approved,
              symbol: { fill: "#72B746", type: "square" },
            },
            {
              name: constants.Replenishment_Rejected,
              symbol: { fill: "#FFBF94", type: "square" },
            },
            {
              name: constants.Status_pendingDilver,
              symbol: { fill: "#FFC000", type: "square" },
            }, 
            {
              name: constants.Status_DeliveryConfirmed,
              symbol: { fill: "#FF6700", type: "square" },
            },
          ]}
        />
      </View>
    </View>
  );
};
