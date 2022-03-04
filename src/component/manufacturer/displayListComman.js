import React, { useState } from "react";
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
import { useNavigation } from '@react-navigation/native';

export const DataDisplayList = ({ item, tableKey, reloadList, onEdit,
  link,
  mainMessage,
  submessage, Url, data, schoolDataList}) => {
  const [userModal, setUserModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const[dataArray,setDataArray]=useState()
  const navigation = useNavigation();

  // const onEdit = (item) => {
  //   if(userModal){
  //     setUserModal(true);
  //   } else {
  //     // console.log("jjj",item);
  //     navigation.navigate('AddNewUsers',{Item: item, btnStatus: '0'});
  //   }
    
  // };

  const onDelete = () => {
    setAlert(true);
  };

  const onPressYes = async () => {
    setAlert(false);
    const token = "${loginData?.user?.data?.access_token}";
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    try {
      const response = await axios.delete(
        `${Baseurl}${link}/${item.id}`
      );
      if (response.status === 200) {
        reloadList();
      }
    } catch (e) {
    }
  };


  return (
    <SafeAreaView style={Styles.firstView}>
      { data == "0" ? 
     <View style={Styles.mainView}>
     {tableKey.map((val,index) => (
       <TouchableOpacity onPress={()=> schoolDataList(item)}>
       <View key={val} style={Styles.viewStyle}>
         <Text style={Styles.textStyle}>{item[val]}</Text>
       </View>
       </TouchableOpacity>
     ))}
      </View>: 
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
      </View> }

      {userModal ? (
        <AddUserModal
          visible={userModal}
          setmodalVisible={(val) => setUserModal(val)}
          // onSubmitDetails={(value) => onSubmitDetails(value)}
          data={item}
          name={`Edit ${constants.School}`}
          buttonVal={constants.update}
        />
      ) : null}

      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={mainMessage}
          subMessage={submessage}
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
    height: 56,
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.4,
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
