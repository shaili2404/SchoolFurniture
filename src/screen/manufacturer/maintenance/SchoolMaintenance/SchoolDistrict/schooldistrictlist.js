import React, { useState, useEffect } from "react";
import Styles from "./style";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import COLORS from "../../../../../asset/color";
import Images from "../../../../../asset/images";
import { FurnitureRequestList } from "../../../component/school/furniturerequestList";

import constants from "../../../../../locales/constants";
import axios from "axios";
import Dummydatauser from "../../../../../component/dummyData/DummyDatauser";
import { Baseurl } from "../../../../../redux/configration/baseurl";
import endUrl from "../../../../../redux/configration/endUrl";
import { useSelector } from "react-redux";
import { DataDisplayList } from "../../../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../../../component/manufacturer/ListHeaderComman";
export const SchoolDistrictList = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const rendercomponent = ({ item }) => {
    console.log(item)
    return (
      <DataDisplayList
        district_office={item.district_office}
        director={item.director}
        tel={item.tel}
        address1={item.address1}
        address2={item.address2}
        address3={item.address3}
        address4={item.address4}
        street_code={item.street_code}
      />
    );
  };
  const HeaderComponet = () => {
    const tableHeader = [constants.DistrictOffice,
    constants.Director,
    constants.TelphoneNo,
    constants.Address1,
    constants.Address2,
    constants.Address3,
    constants.Address4,
    constants.streetCode,
    constants.manage]
    return (
      <ListHeaderComman
        tableHeader={tableHeader}
      />
    );
  };
  const apicall = async () => {
    const a = '${loginData?.user?.data?.access_token}'
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZnVybml0dXJlYXBwLnBocC1kZXYuaW5cL2FwaVwvbG9naW4iLCJpYXQiOjE2NDU2MDA3MjcsImV4cCI6MTY0NTYwNDMyNywibmJmIjoxNjQ1NjAwNzI3LCJqdGkiOiI3c1plRU1Rc0lpU0IzaUdiIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.x0F_9QBw1-egF_EcX-68OYnJdpBAvN9fZTeTc5Lf72Y`;


    try {
      const response = await axios.get(`${Baseurl}${endUrl.schoolDistList}`);
      setListData(response?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    apicall();
  }, [apicall]);
  return (
    <SafeAreaView style={Styles.mainView}>

      <View style={Styles.halfView}>
        <View>

          <TextInput
            style={Styles.refrenceStyle}
            placeholder={constants.SearchDistrict}
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
          />
          <TouchableOpacity style={Styles.eyeStyle} onPress={() => Alert.alert('HEy')}>
            <Image source={Images.SearchIcon} style={Styles.imgsStyle} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            ListHeaderComponent={HeaderComponet}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={listData}
            renderItem={rendercomponent}
          />
        </ScrollView>
      </View>
      <View style={Styles.lastView}>
        <TouchableOpacity>
          <Image source={Images.leftarrow} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.rightarrow} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
