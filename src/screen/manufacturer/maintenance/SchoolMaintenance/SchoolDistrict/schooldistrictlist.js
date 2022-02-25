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
import Loader from "../../../../../component/loader";
import { Token } from "../../../../../component/dummyData/Token";

export const SchoolDistrictList = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [addUserModal, setAdduserModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const token = useSelector((state)=>state?.loginData?.user?.data?.access_token)
  const tableKey = [
    "district_office",
    "director",
    "tel",
    "address1",
    "address2",
    "address3",
    "address4",
    "street_code",
  ];
  const tableHeader = [
    constants.DistrictOffice,
    constants.Director,
    constants.TelphoneNo,
    constants.Address1,
    constants.Address2,
    constants.Address3,
    constants.Address4,
    constants.streetCode,
    constants.manage,
  ];

  const addArray = [
    { key: "district_office", value: constants.DistrictOffice },
    { key: "director", value: constants.Director },
    { key: "tel", value: constants.TelphoneNo },
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
        Url={endUrl.schoolDistList}
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
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    const data = new FormData();
    data.append(value);
    try {
      const response = await axios.post(
        `${Baseurl}${endUrl.schoolDistList}`,
        value
      );
      // console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const apicall = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    axios.get(`${Baseurl}${endUrl.schoolDistList}`).then((res) =>
      setListData(res?.data?.data)
    ).catch((e) =>
      console.log('apicall', e)
    )
  };
  const onsearch = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    axios.get(`${Baseurl}${endUrl.districtSearch}${searchtask}`).then((res)=>{
      setListData(res?.data?.data);
    }).catch((e)=>{
      console.log('search error',e)
    })
 };
const OnAddPress = () => {
  setAdduserModal(true);
  };

  useEffect(() => {
    apicall();
    if (listData) setLoader(false);
  }, []);
  useEffect(() => {
    if (searchtask == '') apicall();
  }, [searchtask]);

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.halfView}>
        <View>
          <TextInput
            style={Styles.refrenceStyle}
            placeholder={constants.SearchDistrict}
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
    <View style={Styles.plusView}>
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
          name={constants.District}
        />
      ) : null}
    </SafeAreaView>
  );
};
