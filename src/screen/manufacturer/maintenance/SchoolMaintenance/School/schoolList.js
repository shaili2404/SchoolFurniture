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
import Loader from "../../../../../component/loader";

export const SchoolList = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [addUserModal, setAdduserModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [searchtask, setSearchTask] = useState("");
  const [searchStatus, setSearchStatus] = useState(false);
  const tableKey = [
    "name",
    "emis",
    "district_name",
    "school_principal",
    "tel",
    `address1 `,
  ];
  const tableHeader = [
    constants.School,
    constants.schoolEmisNumber,
    constants.SchoolDistrict,
    constants.SchoolPrinciple,
    constants.SchoolTelno,
    constants.StreetAddress,
    constants.manage,
  ];

  const addArray = [
    { key: "name", value: constants.School },
    { key: "emis", value: constants.schoolEmisNumber },
    { key: "district_name", value: constants.SchoolDistrict },
    { key: "School Principle", value: constants.SchoolPrinciple },
    { key: "tel", value: constants.SchoolTelno },
    { key: "address1", value: constants.Address1 },
    { key: "address2", value: constants.Address2 },
    { key: "address3", value: constants.Address3 },
    { key: "address4", value: constants.Address4 },
    { key: "street_code", value: constants.streetCode },
  ];

  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        reloadList={() => reloadList()}
        Url={endUrl.schoolList}
      />
    );
  };

  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  const reloadList = () => {
    apicall();
  };
  const onSubmitDetails = async (value) => {
    // console.log("89", value);
    const a = "${loginData?.user?.data?.access_token}";
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;

    try {
      const response = await axios.post(
        `${Baseurl}${endUrl.schoolList}`,
        value
      );
    } catch (e) {
      console.log(e);
    }
  };

  const apicall = async () => {
    const a = "${loginData?.user?.data?.access_token}";
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    try {
      const response = await axios.get(`${Baseurl}${endUrl.schoolList}`);
      setListData(response?.data?.data);
    } catch (e) {
      console.log(e);
    }
  };
  const onsearch = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    try {
      const response = await axios.get(
        `${Baseurl}${endUrl.searchSchool}${searchtask}`
      );
      setSearchData(response?.data?.data);
      setSearchStatus(true);
      //  console.log(searchData)
    } catch (e) {
      console.log(e);
    }
  };
  const OnAddPress = () => {
    setAdduserModal(true);
  };

  useEffect(() => {
    apicall();
    if (listData) setLoader(false);
    if (searchtask === "") setSearchStatus(fals);
  }, [apicall]);

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.halfView}>
        <View>
          <TextInput
            style={Styles.refrenceStyle}
            placeholder={constants.SearchSchool}
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
            value={searchtask}
            onChangeText={(val) => setSearchTask(val)}
          />
          <TouchableOpacity style={Styles.eyeStyle} onPress={() => onsearch()}>
            <Image source={Images.SearchIcon} style={Styles.imgsStyle} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            ListHeaderComponent={HeaderComponet}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={searchStatus ? searchData : listData}
            renderItem={rendercomponent}
          />
        </ScrollView>
      </View>
      <View style={Styles.lastView}>
        <TouchableOpacity onPress={OnAddPress}>
          <Image source={Images.addCricleIcon} />
        </TouchableOpacity>
      </View>

      {addUserModal ? (
        <AddUserModal
          visible={addUserModal}
          setmodalVisible={(val) => setAdduserModal(val)}
          onSubmitDetails={(value) => onSubmitDetails(value)}
          data={addArray}
          name={constants.School}
        />
      ) : null}
    </SafeAreaView>
  );
};
