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
import Dummydatauser from "../../../../../component/dummyData/DummyDatauser";
export const SchoolDistrictList = () => {
  const [listData, setListData] = useState([]);
  const rendercomponent = ({ item }) => {
      console.log(item)
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
        // district_office={item.district_office}
        // director={item.director}
        // tel={item.tel}
        //   address1={item.address1}
        //   address2={item.address2}
        //   address3={item.address3}
        //   address4={item.address4}
        //   street_code={item.street_code}
      />
    );
  };
  const HeaderComponet =  () => {
    return (
      <ListHeader
       HeaderTag1={constants.DistrictOffice}
       HeaderTag2={constants.Director}
       HeaderTag3={constants.TelphoneNo}
       HeaderTag4={constants.Address1}
       HeaderTag5={constants.Address2}
       HeaderTag6={constants.Address3}
       HeaderTag7={constants.Address4}
       HeaderTag8={constants.manage}


      />
    );
  };
  const apicall = async () => {
    var config = {
      method: "get",
      url: "https://furnitureapp.php-dev.in/api/user/school-district",
      headers: {
        Authorization:
          "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9mdXJuaXR1cmVhcHAucGhwLWRldi5pblwvYXBpXC9sb2dpbiIsImlhdCI6MTY0NTUzMTU0OSwiZXhwIjoxNjQ1NTM1MTQ5LCJuYmYiOjE2NDU1MzE1NDksImp0aSI6IlBHUjFNbW1sZndvN0k1dE0iLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.aTcMm6NpWLpdClsrfcpC-ey6Lm8WisY5KKOxhuuj4HY",
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
