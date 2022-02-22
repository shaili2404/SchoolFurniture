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
} from "react-native";
import COLORS from "../../../../../asset/color";
import Images from "../../../../../asset/images";
import { FurnitureRequestList } from "../../../component/school/furniturerequestList";

import constants from "../../../../../locales/constants";
import axios from "axios";
import { DataDisplayList } from "../../../../../component/doe/displayListComman";
import { ListHeader } from "../../../../../component/doe/ListHeaderComman";
export const SchoolDistrictList = () => {
  const [listData, setListData] = useState([]);
  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        value1={item.district_office}
        value2={item.director}
        value3={item.tel}
        value4={item.address1}
        value5={item.address2}
        value6={item.address3}
        value7={item.address4}
        value8={item.street_code}
      />
    );
  };
  const HeaderComponet = async () => {
    return (
      <ListHeader
        value1="District Office"
        value2="Director"
        value3="TelePhone no"
        value4={item.address1}
        value5={item.address2}
        value6={item.address3}
        value7={item.address4}
        value8={item.street_code}
      />
    );
  };
  const apicall = async () => {
    var config = {
      method: "get",
      url: "https://furnitureapp.php-dev.in/api/user/school-district",
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9mdXJuaXR1cmVhcHAucGhwLWRldi5pblwvYXBpXC9sb2dpbiIsImlhdCI6MTY0NTUyMjAyNywiZXhwIjoxNjQ1NTI1NjI3LCJuYmYiOjE2NDU1MjIwMjcsImp0aSI6IjEzZk5TaUdhdjllMlVMNHAiLCJzdWIiOjIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.wrcgObbSGa-Y7eu3Qxag7uRaE2A5Bb9hbkVRrvM98uA",
      },
    };

    try {
      const response = await axios(config);
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
          <TouchableOpacity style={Styles.eyeStyle}>
            <Image source={Images.SearchIcon} style={Styles.imgsStyle} />
          </TouchableOpacity>
          <TextInput
            style={Styles.refrenceStyle}
            placeholder={constants.SearchDistrict}
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
          />
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            // ListHeaderComponent={HeaderComponet}
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
