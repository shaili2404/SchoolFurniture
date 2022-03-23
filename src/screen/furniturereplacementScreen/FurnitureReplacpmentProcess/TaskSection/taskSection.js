import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Images from "../../../../asset/images";
import Styles from "./style";

export const TaskSection = ({
  taskName,
  taskNameButoon,
  taskNameButoonValue,
  taskListButoon,
  acceptRequest,
  printPickupPress,
}) => {
  const [disablestatus, setDisableStatus] = useState(false);
  useEffect(() => {
    if (taskNameButoonValue == "Accepted") setDisableStatus(true);
  }, [taskNameButoonValue]);
  return (
    <View style={Styles.mainView}>
      <Text style={Styles.textView}>{taskName}</Text>
      {taskNameButoon ? (
        <TouchableOpacity
          style={Styles.buttonView}
          onPress={() => acceptRequest()}
          disabled={disablestatus}
        >
          <Text style={Styles.buttonText}>{taskNameButoonValue}</Text>
        </TouchableOpacity>
      ) : null}
      {taskListButoon ? (
        <View style={Styles.lastView}>
          <Image source={Images.PrintIcon} />
          <TouchableOpacity onPress={() => printPickupPress()}>
            <Text style={Styles.pickSlip}>{taskNameButoonValue}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
