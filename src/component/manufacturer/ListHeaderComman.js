import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import COLORS from "../../asset/color";

export const ListHeaderComman = ({ tableHeader }) => {
  return (
    <SafeAreaView style={Styles.firstView}>
      <View style={Styles.mainView}>
        {tableHeader.map((header) =>
          <View key={header} style={Styles.viewStyle}>
            <Text style={Styles.textStyle}>{header}</Text>
          </View>)}
      </View>
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
    backgroundColor: COLORS.GreenBox,
    height: 46,
  },
  viewStyle: {
    width: 180,
    marginTop: 12,
    marginHorizontal: 20,
  },
});
