import React from "react";
import { SafeAreaView } from "react-native";
import { PieChartScreen } from "./piechart/piechart";
import ChartScreen from "./practice";


export const Dashboard = ()=>{

return(
    <SafeAreaView>
    <PieChartScreen/>
    <ChartScreen/>
    </SafeAreaView>
)
}