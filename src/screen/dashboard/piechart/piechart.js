import React from "react";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import COLORS from "../../../asset/color";

export const PieChartScreen = () => {
  const data = [
    {
      name: "Pending Repair",
      population: 200,
      color: COLORS.Dash_LightGreen,
      legendFontColor: COLORS.Black,
      legendFontSize: 8,
    },
    {
      name: "Pending Delivery",
      population: 200,
      color: COLORS.Dash_yellow,
      legendFontColor: COLORS.Black,
      legendFontSize: 8,
    },
    {
      name: "Pending Replenishment",
      population: 200,
      color: COLORS.Dash_brown,
      legendFontColor: COLORS.Black,
      legendFontSize: 8,
    },
    {
      name: "Replenishment Rejected",
      population: 200,
      color: COLORS.Dash_skinCol,
      legendFontColor: COLORS.Black,
      legendFontSize: 8,
    },
    {
      name: "Delivery Confirmed",
      population: 200,
      color: COLORS.Dash_orange,
      legendFontColor: COLORS.Black,
      legendFontSize: 8,
    },
    {
      name: "Repair Completed",
      population: 200,
      color: COLORS.Dash_Lightbrown,
      legendFontColor: COLORS.Black,
      legendFontSize: 8,
    },
    {
      name: "Replenishment Approved",
      population: 200,
      color: COLORS.Dash_DarkGreen,
      legendFontColor: COLORS.Black,
      legendFontSize: 8,
    },
  ];
  
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `${COLORS.Black}, ${opacity})`,
    strokeWidth: 2, 
    barPercentage: 0.5,
    useShadowColorFromDataset: false, 
    
  };

  

  return (
    <PieChart
      data={data}
      width={Dimensions.get("window").width}
      height={200}
      chartConfig={chartConfig}
      accessor={"population"}
      backgroundColor={COLORS.LightGreen}
      center={[0, 5]}
      absolute
     
    />
  );
};
