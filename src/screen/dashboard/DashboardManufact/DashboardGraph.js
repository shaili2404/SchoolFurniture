import React from "react";
import {
  VictoryChart,
  VictoryArea,
} from "victory-native";
import { TouchableOpacity, View,Text } from "react-native";
import style from "./style";

export const GraphChart = () => {
  const data1 = [
    { x: "jan", y: 0 },
    { x: "feb", y: 1 },
    { x: "mar", y: 2 },
    { x: "apr", y: 3 },
    { x: "may", y: 3 },
    { x: "jun", y: 2 },
    { x: "july", y: 1 },
    { x: "aug", y: 0 },
    { x: "sep", y: 0 },
    { x: "oct", y: 4 },
    { x: "nov", y: 8 },
    { x: "dec", y: 0 },
  ];
  const data2 = [
    { x: "jan", y: 0 },
    { x: "feb", y: 3 },
    { x: "mar", y: 4 },
    { x: "apr", y: 5 },
    { x: "may", y: 2 },
    { x: "jun", y: 5 },
    { x: "july", y: 7 },
    { x: "aug", y: 9 },
    { x: "sep", y: 0 },
    { x: "oct", y: 3 },
    { x: "nov", y: 8 },
    { x: "dec", y: 0 },
  ];
  const data3 = [
    { x: "jan", y: 0 },
    { x: "feb", y: 2 },
    { x: "mar", y: 3 },
    { x: "apr", y: 4 },
    { x: "may", y: 1 },
    { x: "jun", y: 2 },
    { x: "july", y: 4 },
    { x: "aug", y: 2 },
    { x: "sep", y: 2 },
    { x: "oct", y: 4 },
    { x: "nov", y: 2 },
    { x: "dec", y: 0 },
  ];
  const data4 = [
    { x: "jan", y: 0 },
    { x: "feb", y: 2 },
    { x: "mar", y: 6 },
    { x: "apr", y: 1 },
    { x: "may", y: 1 },
    { x: "jun", y: 4 },
    { x: "july", y: 6 },
    { x: "aug", y: 3 },
    { x: "sep", y: 0 },
    { x: "oct", y: 2 },
    { x: "nov", y: 3 },
    { x: "dec", y: 0 },
  ];
  const data5 = [
    { x: "jan", y: 0 },
    { x: "feb", y: 2 },
    { x: "mar", y: 2 },
    { x: "apr", y: 3 },
    { x: "may", y: 2 },
    { x: "jun", y: 2 },
    { x: "july", y: 2 },
    { x: "aug", y: 1 },
    { x: "sep", y: 1 },
    { x: "oct", y: 7 },
    { x: "nov", y: 5 },
    { x: "dec", y: 0 },
  ];
  const data6 = [
    { x: "jan", y: 1 },
    { x: "feb", y: 2 },
    { x: "mar", y: 3 },
    { x: "apr", y: 4 },
    { x: "may", y: 5 },
    { x: "jun", y: 6 },
    { x: "july", y: 7 },
    { x: "aug", y: 8 },
    { x: "sep", y: 9 },
    { x: "oct", y: 4 },
    { x: "nov", y: 3 },
    { x: "dec", y: 0 },
  ];
  const data7 = [
    { x: "jan", y: 3 },
    { x: "feb", y: 2 },
    { x: "mar", y: 5 },
    { x: "apr", y: 6 },
    { x: "may", y: 8 },
    { x: "jun", y: 5 },
    { x: "july", y: 7 },
    { x: "aug", y: 3 },
    { x: "sep", y: 2 },
    { x: "oct", y: 1 },
    { x: "nov", y: 2 },
    { x: "dec", y: 2 },
  ];
  const data8 = [
    { x: "jan", y: 2 },
    { x: "feb", y: 2 },
    { x: "mar", y: 5 },
    { x: "apr", y: 6 },
    { x: "may", y: 8 },
    { x: "jun", y: 0 },
    { x: "july", y: 1 },
    { x: "aug", y: 2 },
    { x: "sep", y: 3 },
    { x: "oct", y: 4 },
    { x: "nov", y: 5 },
    { x: "dec", y: 0 },
  ];
  const data9 = [
    { x: "jan", y: 0 },
    { x: "feb", y: 9 },
    { x: "mar", y: 4 },
    { x: "apr", y: 6 },
    { x: "may", y: 8 },
    { x: "jun", y: 6 },
    { x: "july", y: 4 },
    { x: "aug", y: 2 },
    { x: "sep", y: 0 },
    { x: "oct", y: 2 },
    { x: "nov", y: 0 },
    { x: "dec", y: 0 },
  ];
  return (
    <View>
    <TouchableOpacity onPress={()=>onbarclick()}>
    <Text style={style.textchart}>Previous Year Statuses</Text>
    </TouchableOpacity>
    <VictoryChart width={400} height={400}>
      <VictoryArea
        data={data1}
        style={{
          data: { fill: "#8CBD90", stroke: "#8CBD90", fillOpacity: 0.4 },
        }}
        interpolation={"natural"}
      />

      <VictoryArea
        data={data2}
        style={{
          data: { fill: "#BDDAF8", stroke: "#BDDAF8", fillOpacity: 0.4 },
        }}
        interpolation={"natural"}
      />

      <VictoryArea
        data={data3}
        style={{
          data: { fill: "#359934", stroke: "#359934", fillOpacity: 0.4 },
        }}
        interpolation={"natural"}
      />

      <VictoryArea
        data={data4}
        style={{
          data: { fill: "#CBD9E7", stroke: "#CBD9E7", fillOpacity: 0.4 },
        }}
        interpolation={"natural"}
      />

      <VictoryArea
        data={data5}
        style={{
          data: { fill: "#00000029", stroke: "#00000029", fillOpacity: 0.4 },
        }}
        interpolation={"natural"}
      />

      <VictoryArea
        data={data6}
        style={{
          data: { fill: "#F670231F", stroke: "#F670231F", fillOpacity: 0.4 },
        }}
        interpolation={"natural"}
      />

      <VictoryArea
        data={data7}
        style={{
          data: { fill: "#70B3451C", stroke: "#70B3451C", fillOpacity: 0.4 },
        }}
        interpolation={"natural"}
      />

      <VictoryArea
        data={data8}
        style={{
          data: { fill: "#C00000", stroke: "#C00000", fillOpacity: 0.4 },
        }}
        interpolation={"natural"}
      />

      <VictoryArea
        data={data9}
        style={{
          data: { fill: "#E97A7A", stroke: "#E97A7A", fillOpacity: 0.4 },
        }}
        interpolation={"natural"}
      />
    </VictoryChart>
    </View>
  );
};
