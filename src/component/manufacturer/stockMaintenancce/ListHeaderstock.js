import React from "react";
import {SafeAreaView,View,Text} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../asset/color";

export const HeaderStocks = ({ tableHeader }) => {
    return (
        <SafeAreaView style={style.firstView}>
            <LinearGradient
                colors={[COLORS.LinearGreen1, COLORS.LinearGreen2]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
                style={style.firstView}
            >
                <View style={style.main}>
                    {tableHeader.map((header) => (
                        <View
                            key={header}
                            style={style.funcStyle}
                        >
                            <Text style={style.textStyle}>{header}</Text>
                        </View>
                    ))}
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};



const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const style =  StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent:'space-around'
},
firstView: {
    backgroundColor: COLORS.GreenBox,
    height: 46,
},
funcStyle: {
    width: "30%",
    marginTop: 12,
    marginHorizontal: 4,
},
textStyle: {
    fontSize: 16,
    fontWeight: "normal",
    color: COLORS.White,
    textAlign: "left",
    textAlignVertical: "center",
},
});
