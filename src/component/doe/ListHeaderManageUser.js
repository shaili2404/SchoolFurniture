import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import COLORS from "../../asset/color";

export const ListHeaderManageUser = (props) => {
  return (
    <SafeAreaView style={Styles.firstView}>
      <View style={Styles.mainView}>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>Name</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>Surname</Text>
        </View>
        <View style={Styles.otherStyle}>
          <Text style={Styles.textStyle}>Username</Text>
        </View>
        <View style={Styles.otherStyle}>
          <Text style={Styles.textStyle}>Email id</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>Organisation</Text>
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
    width: 120,
    marginTop: 12,
    marginHorizontal: 20,
  },
  otherStyle: {
    width: 200,
    marginTop: 12,
    marginHorizontal: 20,
  },
});
