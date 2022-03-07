import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import COLORS from "../../asset/color";
import LinearGradient from "react-native-linear-gradient";

export const ListHeaderComman = ({ tableHeader, List }) => {
  return (
    <SafeAreaView>
      <LinearGradient
        colors={[COLORS.LinearGreen1, COLORS.LinearGreen2]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={Styles.firstView}
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
    fontSize: 16,
    fontWeight: "normal",
    color: COLORS.White,
    textAlign: "left",
    textAlignVertical: "center",
  },
  mainView: {
    flexDirection: "row",
  },
  firstView: {
    height: 46,
    opacity: 1,
  },
  viewStyle: {
    width: 180,
    marginTop: 12,
    marginHorizontal: 20,
  },
  ScreenStyles: {
    width: "30%",
    marginTop: 12,
    marginHorizontal:4,
  },
});
