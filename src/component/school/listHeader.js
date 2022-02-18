import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import COLORS from "../../asset/color";

export const ListHeader = (props) => {
  return (
    <SafeAreaView style={Styles.firstView}>
      <View style={Styles.mainView}>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>Date Created</Text>
        </View>
        <View style={Styles.otherStyle}>
          <Text style={Styles.textStyle}>Reference No .</Text>
        </View>
        <View style={Styles.otherStyle}>
          <Text style={Styles.textStyle}>Status</Text>
        </View>
        <View style={Styles.otherStyle}>
          <Text style={Styles.textStyle}>EMIS Number</Text>
        </View>
        <View style={Styles.otherStyle}>
          <Text style={Styles.textStyle}>Total Furniture Count</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};


const Styles = StyleSheet.create({
    textStyle:{
        fontSize:16,
        fontWeight:'normal',
        color:COLORS.White,
       textAlign:'left',
       textAlignVertical:'center'
    },
    mainView:{
        flexDirection:'row',
        justifyContent:"space-between"
    },
    firstView:{
        marginTop:20,
        backgroundColor:COLORS.GreenBox,
        height:46
    },
    viewStyle:{
        width:120,
        marginTop:12,
        marginHorizontal:20,
       
    },
    otherStyle:{
        width:200,
        marginTop:12,
        marginHorizontal:20
    }
})