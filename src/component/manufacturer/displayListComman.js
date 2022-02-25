import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { AlertMessage } from "../../Alert/alert";
import AlertText from "../../Alert/AlertText";
import COLORS from "../../asset/color";
import Images from "../../asset/images";
import constants from "../../locales/constants";
import axios from "axios";
import { Baseurl } from "../../redux/configration/baseurl";
import { Token } from "../dummyData/Token";
import { AddUserModal } from "./AddFormModal/AddFormModal";

export const DataDisplayList = ({ item, tableKey, reloadList, Url, }) => {
  const [userModal, setUserModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const[dataArray,setDataArray]=useState()
  const onEdit = () => {
    setUserModal(true);
    for (const [key, value] of Object.entries(item)) {
      setDataArray(previousitem=>{
        return[
          ...previousitem,
          {key:value,value:key}
        ]
      })
    }
    console.log('dataArray',dataArray)
  };

  const onDelete = () => {
    setAlert(true);
  };
  

  const onPressYes = async () => {
    setAlert(false);
    const token = "${loginData?.user?.data?.access_token}";
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    // console.log(`${Baseurl}${Url}/${item.id}`);
    try {
      const response = await axios.delete(`${Baseurl}${Url}/${item.id}`);

      if (response.status === 200) {
        reloadList();
      }
    } catch (e) {
      console.log(e);
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
          <TouchableOpacity onPress={onEdit}>
            <Image source={Images.editIcon} />
          </TouchableOpacity>
        </View>
        <View style={Styles.viewsssStyle}>
          <TouchableOpacity onPress={onDelete}>
            <Image source={Images.deleteIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {userModal ? (
      <AddUserModal
        visible={userModal}
        setmodalVisible={(val) => setUserModal(val)}
        // onSubmitDetails={(value) => onSubmitDetails(value)}
         data={item}
        name={`Edit ${constants.School}`}
        buttonVal = {constants.update}
      />
    ) : null}

      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={AlertText.DeleteUser}
          subMessage={AlertText.UndoMessgae}
          type="question"
          onConfirm={() => onPressYes()}
        />
      ) : null}
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
    width: "100%",
  },
  firstView: {
    backgroundColor: COLORS.LightGreen,
    height: 46,
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 1,
  },
  viewStyle: {
    width: 180,
    marginTop: 12,
    marginHorizontal: 20,
  },
  viewsssStyle: {
    width: 20,
    marginTop: 12,
    marginHorizontal: 20,
  },
});
