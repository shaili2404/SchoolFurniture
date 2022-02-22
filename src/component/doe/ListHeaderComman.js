import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import COLORS from "../../asset/color";

export const ListHeader = ({
    HeaderTag1,
    HeaderTag2,
    HeaderTag3,
    HeaderTag4,
    HeaderTag5,
    HeaderTag6,
    HeaderTag7,
    HeaderTag8,
    HeaderTag9,
    HeaderTag10,
}) => {
  return (
    <SafeAreaView style={Styles.firstView}>
      <View style={Styles.mainView}>
          {HeaderTag1?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{HeaderTag1}</Text>
        </View>
        :null}
        {HeaderTag2?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{HeaderTag2}</Text>
        </View>
        :null}
         {HeaderTag3?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{HeaderTag3}</Text>
        </View>
        :null}
         {HeaderTag4?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{HeaderTag4}</Text>
        </View>
        :null}
         {HeaderTag5?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{HeaderTag5}</Text>
        </View>
        :null}
         {HeaderTag6?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{HeaderTag6}</Text>
        </View>
        :null}
         {HeaderTag7?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{HeaderTag7}</Text>
        </View>
        :null}
         {HeaderTag8?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{HeaderTag8}</Text>
        </View>
        :null}
        {HeaderTag9?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{HeaderTag9}</Text>
        </View>
        :null}
        {HeaderTag10?
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{HeaderTag10}</Text>
        </View>
        :null}

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
