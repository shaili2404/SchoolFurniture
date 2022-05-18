import React from "react";
import {
  VictoryChart,
  VictoryBar,
  VictoryGroup,
  VictoryLabel,
  VictoryStack,
} from "victory-native";
import { View, Text } from "react-native";

export const BarChart = () => {
  const getBarData = () => {
    return [1, 2].map((ele) => {
      return [
        {
          x: 1,
          y: ele == 1 ? 50 : 50,
          label: ele == 1 ? "Collection Accepted" : "",
        },
        {
          x: 2,
          y: ele == 1 ? 20 : 80,
          label: ele == 1 ? "Delivery collection" : "",
        },
        {
          x: 3,
          y: ele == 1 ? 30 : 70,
          label: ele == 1 ? "Pending Collection" : "",
        },
        {
          x: 4,
          y: ele == 1 ? 10 : 90,
          label: ele == 1 ? "Pending Delivery" : "",
        },
        {
          x: 5,
          y: ele == 1 ? 30 : 70,
          label: ele == 1 ? "Pending Repair" : "",
        },
        {
          x: 6,
          y: ele == 1 ? 20 : 80,
          label: ele == 1 ? "Pending Replanishment Approval" : "",
        },
        {
          x: 7,
          y: ele == 1 ? 30 : 70,
          label: ele == 1 ? "Pending Repair" : "",
        },
        {
          x: 8,
          y: ele == 1 ? 40 : 60,
          label: ele == 1 ? "Replanishment Approved" : "",
        },
        {
          x: 9,
          y: ele == 1 ? 50 : 50,
          label: ele == 1 ? "Replanishment Rejected" : "",
        },
      ];
    });
  };
  return (
    <View>
      <Text style={{ marginLeft: 20 }}>YTD Report Status</Text>
      <VictoryChart domainPadding={{ x: 50 }} width={400} height={400}>
        <VictoryGroup
          offset={20}
          style={{ data: { width: 15 } }}
          labels={({ datum }) => `${datum.label}`}
          labelComponent={<VictoryLabel dy={-14} />}
        >
          <VictoryStack colorScale={["#47414B", "#7DB4EA"]} horizontal>
            {getBarData().map((data, index) => {
              return (
                <VictoryBar
                  key={index}
                  data={data}
                  labels={({ datum }) => (`${datum.label}`)}
                  labelComponent={ <VictoryLabel dy={-12} /> }
                />
              );
            })}
          </VictoryStack>
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
};
