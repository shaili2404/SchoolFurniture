import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../asset/color";
import Images from "../../asset/images";

export const ManageUserList = (props) => {
  return (
    <SafeAreaView style={Styles.firstView}>
      <View style={Styles.mainView}>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.Name}</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.Surname}</Text>
        </View>
        <View style={Styles.otherStyle}>
          <Text style={Styles.textStyle}>{props.Username}</Text>
        </View>
        <View style={Styles.otherStyle}>
          <Text style={Styles.textStyle}>{props.Emailid}</Text>
        </View>
        <View style={Styles.viewStyle}>
          <Text style={Styles.textStyle}>{props.Organisation}</Text>
        </View>
        <View style={Styles.viewsssStyle}>
          <TouchableOpacity>
            <Image source={Images.editIcon}  />
          </TouchableOpacity>
        </View>
        <View style={Styles.viewsssStyle}>
          <TouchableOpacity>
            <Image source={Images.deleteIcon}  />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: "normal",
    color: COLORS.Black,
    textAlign: "left",
    textAlignVertical: "center",
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  firstView: {
    backgroundColor: COLORS.LightGreen,
    height: 46,
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 1,
  },
  viewStyle: {
    width: 120,
    marginTop: 12,
    marginHorizontal: 20,
  },
  viewsssStyle: {
    width: 30,
    marginTop: 12,
    marginHorizontal: 20,
  },
  otherStyle: {
    width: 200,
    marginTop: 12,
    marginHorizontal: 20,
  },
});
