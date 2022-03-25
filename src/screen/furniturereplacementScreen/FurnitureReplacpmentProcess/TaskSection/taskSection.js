import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Images from "../../../../asset/images";
import Styles from "./style";
import { useNavigation } from "@react-navigation/native";

export const TaskSection = ({
  taskName,
  taskNameButoonValue,
  taskNamePrintButoonValue,
  acceptRequest,
  printPickupPress,
}) => {
  const navigation = useNavigation();
  const [disablestatus, setDisableStatus] = useState(false);
  useEffect(() => {
    if (taskNameButoonValue == "Accepted") setDisableStatus(true);
  }, [taskNameButoonValue]);
  return (
    <View style={Styles.mainView}>
      <Text style={Styles.textView}>{taskName}</Text>
      {taskNameButoonValue ? (
        <TouchableOpacity
          style={Styles.buttonView}
          onPress={() => acceptRequest()}
          disabled={disablestatus}
        >
          <Text style={Styles.buttonText}>{taskNameButoonValue}</Text>
        </TouchableOpacity>
      ) : null}
      {taskNamePrintButoonValue ? (
        <View style={Styles.lastView}>
          <Image source={Images.PrintIcon} />
          <TouchableOpacity onPress={() => printPickupPress()}>
            <Text style={Styles.pickSlip}>{taskNamePrintButoonValue}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
