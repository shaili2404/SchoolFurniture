import React from "react";
import { VictoryLabel, VictoryPie } from "victory-native";
import { TouchableOpacity, View, Text } from "react-native";
import constants from "../../../locales/constants";

export const Piechart = () => {
  data = [
    { x: "", y: 35 },
    { x: "", y: 40 },
    { x: "", y: 55 },
    { x: "", y: 12 },
    { x: "", y: 15 },
    { x: "", y: 20 },
    { x: "", y: 20 },
    { x: "", y: 10 },
  ];

  return (
    <View style={{width:'100%',flexDirection:'row'}}>
      <View>
        <VictoryPie
          colorScale={[
            "#AEF182",
            "#FFC000",
            "#9E480E",
            "#FFBF94",
            "#FF6700",
            "#BF9514",
            "#72B746",
          ]}
          labels={({ datum }) => (`${datum.y}`)}

          data={data}
          radius={100}
        />
      </View>
      <View>
        <View style={{ flexDirection: "row",marginTop:5 }}>
          <View style={{height:20,width:20,backgroundColor:"#AEF182"}}></View>
          <Text style={{marginTop:2,marginLeft:10}}>{constants.Status_pendingRepair}</Text>
        </View>
        <View style={{ flexDirection: "row",marginTop:5 }}>
          <View style={{height:20,width:20,backgroundColor:"#FFC000"}}></View>
          <Text style={{marginTop:2,marginLeft:10}}>{constants.Status_pendingDilver}</Text>
        </View>
        <View style={{ flexDirection: "row" ,marginTop:5}}>
          <View style={{height:20,width:20,backgroundColor:"#9E480E"}}></View>
          <Text style={{marginTop:2,marginLeft:10}}>{constants.Pending_Replenishment_Approval}</Text>
        </View>
        <View style={{ flexDirection: "row",marginTop:5 }}>
          <View style={{height:20,width:20,backgroundColor:"#FFBF94"}}></View>
          <Text style={{marginTop:2,marginLeft:10}}>{constants.Replenishment_Rejected}</Text>
        </View>
        <View style={{ flexDirection: "row",marginTop:5 }}>
          <View style={{height:20,width:20,backgroundColor:"#FF6700"}}></View>
          <Text style={{marginTop:2,marginLeft:10}}>{constants.Status_DeliveryConfirmed}</Text>
        </View>
        <View style={{ flexDirection: "row",marginTop:5 }}>
          <View style={{height:20,width:20,backgroundColor: "#BF9514"}}></View>
          <Text style={{marginTop:2,marginLeft:10}}>{constants.Status_RepairCompleted}</Text>
        </View>
        <View style={{ flexDirection: "row",marginTop:5 }}>
          <View style={{height:20,width:20,backgroundColor: "#72B746"}}></View>
          <Text style={{marginTop:2,marginLeft:10}}>{constants.Replenishment_Approved}</Text>
        </View>
      </View>
    </View>
  );
};
