import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Styles from "./Styles";
import { Picker } from "@react-native-picker/picker";

const AddNewUsers = () => {
  const [organizationList, setOrganizationList] = useState([]);

  return (
    <View style={Styles.mainView}>
      <Picker
        style={Styles.userPicker}
        selectedValue={organizationList}
        onValueChange={(itemValue, itemIndex) => setOrganizationList(itemValue)}
      >
        <Picker.Item label="Select Organisation" value="Select Organisation" />
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
};

export default AddNewUsers;
