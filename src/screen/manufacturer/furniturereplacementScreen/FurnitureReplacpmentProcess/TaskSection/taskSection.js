import React from "react";
import { View,Text,TouchableOpacity } from "react-native";
import constants from "../../../../../locales/constants";
import Styles from "./style";

export const TaskSection = ( ) =>{
    return(
        <View style={Styles.mainView} >
        <Text style={Styles.textView}>
          {constants.coolectFurnitureRequest}
        </Text>
        <TouchableOpacity style={Styles.buttonView}>
            <Text style={Styles.buttonText}>{constants.Accept}</Text>
        </TouchableOpacity>
    </View>
    )
}