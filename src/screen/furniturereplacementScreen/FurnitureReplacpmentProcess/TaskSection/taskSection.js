import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Images from "../../../../asset/images";
import Styles from "./style";

export const TaskSection = ({ name, button,buttonvalue }) => {
  return (
    <View style={Styles.mainView}>
      <Text style={Styles.textView}>{name}</Text>
      {button === true ? (
        <TouchableOpacity style={Styles.buttonView}>
          <Text style={Styles.buttonText}>{buttonvalue}</Text>
        </TouchableOpacity>
      ) : (
        <View style={Styles.lastView}>
        <Image source={Images.PrintIcon}/>
        <TouchableOpacity>
          <Text style={Styles.pickSlip}>{buttonvalue}</Text>
        </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
