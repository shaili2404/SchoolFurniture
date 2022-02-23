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
import { AddUserModal } from "../../../../../component/manufacturer/AddFormModal/AddFormModal";
import { Token } from "../../../../../component/dummyData/Token";


export const SchoolDistrictList = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [addUserModal,setAdduserModal] = useState(false)
  const tableKey = [
    "district_office",
    "director",
    "tel",
    "address1",
    "address2",
    "address3",
    "address4",
    "street_code",
  ]
  const tableHeader = [constants.DistrictOffice,
    constants.Director,
    constants.TelphoneNo,
    constants.Address1,
    constants.Address2,
    constants.Address3,
    constants.Address4,
    constants.streetCode,
    constants.manage
    ]

  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        reloadList={() => reloadList()}
      />
    );
  };

  const HeaderComponet = () => {
   
    return (
      <ListHeaderComman tableHeader={tableHeader} />
    );
  };

  const reloadList = () => {
    apicall();
  }

  const apicall = async () => {
    const a = '${loginData?.user?.data?.access_token}'
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${Token}`;
    try {
      const response = await axios.get(`${Baseurl}${endUrl.schoolDistList}`);
      setListData(response?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const OnAddPress=()=>{
   setAdduserModal(true)
  }

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
        {/* Add MOdal */}
        <View style={Styles.viewsssStyle}>
          <TouchableOpacity onPress={OnAddPress}>
            <Image source={Images.addCricleIcon} />
          </TouchableOpacity>
        </View>
        {/*  */}

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
      {addUserModal ? (
        <AddUserModal
          visible={addUserModal}
          setmodalVisible={(val) => setAdduserModal(val)}
          onSubmitDetails={() => onSubmitDetails()}
          data = {tableHeader}
         
        />
      ) : null}


    </SafeAreaView>
  );
};
