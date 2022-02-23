import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import COLORS from "../../asset/color";

export const ListHeaderComman = (props) => {
  return (
    <SafeAreaView style={Styles.firstView}>
      <View style={Styles.mainView}>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.DistrictOffice}</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.Director}</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.TelphoneNo}</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.Address1}</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.Address2}</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.Address3}</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.Address4}</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.streetCode}</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.manage}</Text>
        </View>
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
