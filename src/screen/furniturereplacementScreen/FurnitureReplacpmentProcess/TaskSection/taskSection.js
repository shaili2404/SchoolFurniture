import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Images from "../../../../asset/images";
import Styles from "./style";
import { useNavigation } from '@react-navigation/native';

export const TaskSection = ({ taskName,taskNameButoon,taskNameButoonValue,taskListButoon, downloadPdf }) => {
  const navigation = useNavigation();


  return (
    <View style={Styles.mainView}>
      <Text style={Styles.textView}>{taskName}</Text>
      {taskNameButoon? (
        <TouchableOpacity style={Styles.buttonView} onPress={()=> downloadPdf()}>
          <Text style={Styles.buttonText}>{taskNameButoonValue}</Text>
        </TouchableOpacity>
      ) : ( 
        null)}
         {taskListButoon? (
        <View style={Styles.lastView}>
        <Image source={Images.PrintIcon}/>
        <TouchableOpacity>
          <Text style={Styles.pickSlip}>{taskNameButoonValue}</Text>
        </TouchableOpacity>
        </View>
      ):null}
    </View>
  );
};
