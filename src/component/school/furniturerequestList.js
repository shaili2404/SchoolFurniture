import React from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import COLORS from "../../asset/color";

export const FurnitureRequestList = (props) => {
    return (
        <SafeAreaView style={Styles.firstView}>
          <View style={Styles.mainView}>
            <View style={Styles.viewStyle}>
              <Text style={Styles.textStyle}>{props.Date}</Text>
            </View>
            <View style={Styles.otherStyle}>
              <Text style={Styles.textStyle}>{props.RefrenceNo}</Text>
            </View>
            <View style={Styles.otherStyle}>
              <Text style={Styles.textStyle}>{props.status}</Text>
            </View>
            <View style={Styles.otherStyle}>
              <Text style={Styles.textStyle}>{props.EmisNumber}</Text>
            </View>
            <View style={Styles.otherStyle}>
              <Text style={Styles.textStyle}>{props.TotalFurnitureCount}</Text>
            </View>
          </View>
        </SafeAreaView>
      );
    };
    
    
    const Styles = StyleSheet.create({
        textStyle:{
            fontSize:16,
            fontWeight:'normal',
            color:COLORS.Black,
           textAlign:'left',
           textAlignVertical:'center'
        },
        mainView:{
            flexDirection:'row',
            justifyContent:"space-between"
            
        },
        firstView:{
            backgroundColor:COLORS.LightGreen,
            height:46,
            borderBottomColor:COLORS.Black,
            borderBottomWidth:1
        },
        viewStyle:{
            width:120,
            marginTop:12,
            marginHorizontal:20
        },
        otherStyle:{
            width:200,
            marginTop:12,
            marginHorizontal:20
        }
    })