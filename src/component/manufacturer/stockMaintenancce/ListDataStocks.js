import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import COLORS from "../../../asset/color";
import Images from "../../../asset/images";
import { AlertMessage } from "../../../Alert/alert";

export const ListDataSTocks = ({ item, tableKey}) => {
  const [userModal, setUserModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const[dataArray,setDataArray]=useState()
  const navigation = useNavigation();

  const onDelete = () => {
    setAlert(true);
  };

  const onPressYes = async () => {
    setAlert(false);
    const token = "${loginData?.user?.data?.access_token}";
    try {
      const response = await axios.delete(
        `${link}/${item.id}`
      );
      if (response.status === 200) {
        reloadList();
      }
    } catch (e) {
    }
  };


  return (
    <SafeAreaView style={Styles.firstView}>
      
      <View style={Styles.mainView}>
        {tableKey.map((val) => (
          <View key={val} style={Styles.viewStyle}>
            <Text style={Styles.textStyle}>{item[val]}</Text>
          </View>
        ))}

        <View style={Styles.viewsssStyle}>
          <TouchableOpacity onPress={() => onEdit(item, "Edit")}>
            <Image source={Images.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={Styles.viewsssStyle}>
          <TouchableOpacity onPress={onDelete}>
            <Image source={Images.deleteIcon} />
          </TouchableOpacity>
        </View>
      </View> 

      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={mainMessage}
          subMessage={submessage}
          type={constants.dropdown_Type}
          onConfirm={() => onPressYes()}
        />
      ) : null}
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  textStyle: {
    fontSize: 14,
    fontWeight: "normal",
    color: COLORS.Black,
    textAlign: "left",
    textAlignVertical: "center",
  },
  mainView: {
    flexDirection: "row",
    justifyContent:'space-around'
  },
  firstView: {
    backgroundColor: COLORS.LightGreen,
    height: 40,
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.4,
  },
  viewStyle: {
    width: '30%',
    marginTop: 12,
  },
  viewsssStyle: {
    width: '10%',
    marginTop: 12,
  },
});
