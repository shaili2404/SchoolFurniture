import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import COLORS from "../../asset/color";
import LinearGradient from "react-native-linear-gradient";
import Fonts from "../../asset/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { STANDARD_SCREEN_SIZE } from "../../utils/constants";
import { RfH, RfW } from "../../utils/helpers";

export const ListHeaderComman = ({ tableHeader, List, lenofContent }) => {
  return (
    <SafeAreaView>
      <LinearGradient
        colors={[COLORS.LinearGreen1, COLORS.LinearGreen2]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={lenofContent ? Styles.firstlenView : Styles.firstView}
      >
        <View style={Styles.mainView}>
          {tableHeader.map((header) => (
            <View
              key={header}
              style={List === "screen" ? Styles.ScreenStyles : Styles.viewStyle}
            >
              <Text style={Styles.textStyle}>{header}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.semiBold,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
    // fontWeight: "normal",
    color: COLORS.White,
    textAlign: "left",
    textAlignVertical: "center",
  },
  mainView: {
    flexDirection: "row",
  },
  firstView: {
    // height: RfH(46),
    opacity: 1,
  },
  firstlenView: {
    // height: RfH(66),
    opacity: 1,
  },
  viewStyle: {
    width: RfW(110),
    marginVertical: RfH(10),
    marginHorizontal: 5,
  },
  ScreenStyles: {
    width: RfW(170),
    marginVertical: 12,
    marginHorizontal: 20,
     height: RfH(40),
  },
});
