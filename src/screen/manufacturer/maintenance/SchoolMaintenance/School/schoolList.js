import React, { useState, useEffect } from "react";
import Styles from "./style";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import COLORS from "../../../../../asset/color";
import Images from "../../../../../asset/images";

import constants from "../../../../../locales/constants";
import axios from "axios";
import { Baseurl } from "../../../../../redux/configration/baseurl";
import endUrl from "../../../../../redux/configration/endUrl";
import { useSelector } from "react-redux";
import { DataDisplayList } from "../../../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../../../component/manufacturer/ListHeaderComman";
import { AddUserModal } from "../../../../../component/manufacturer/AddFormModal/AddFormModal";
import { Token } from "../../../../../component/dummyData/Token";
import Loader from "../../../../../component/loader";
import { AddSchool } from "../../../../../component/manufacturer/AddFormModal/AddSchool";
import AlertText from "../../../../../Alert/AlertText";
import { AlertMessage } from "../../../../../Alert/alert";

export const SchoolList = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [addUserModal, setAdduserModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const [operation, setOperation] = useState("");
  const [updateItem, setUpdateItem] = useState({});

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
        onEdit={(item, task) => onEdit(item, task)}
      />
    );
  };

  const onEdit = (item, task) => {
    setOperation(task);
    setUpdateItem(item);
    setAdduserModal(true)
  }

  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  const reloadList = () => {
    apicall();
  };

  const onSubmitDetails = async (values, oper) => {
    setAdduserModal(false);
    setLoader(true);
    let obj = {};
    Object.entries(values).forEach(([key, value]) => {
      if (value != null && value != "") obj[key] = value;
    })
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;

    const service = oper == "Add" ? axios.post(`${Baseurl}${endUrl.schoolList}`, obj) : axios.put(`${Baseurl}${endUrl.schoolList}/${updateItem.id}`, obj);
    service.then((res) => {
      setLoader(false);
      setAlert(true);
    }).catch((e) => {
      setLoader(false);
      console.log("getError", e);
      console.log(obj)
    })
  };

  const apicall = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    axios.get(`${Baseurl}${endUrl.schoolList}`).then((res) =>
      setListData(res?.data?.data)
    ).catch((e) =>
      console.log('apicall', e)
    )
  };

  const onsearch = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    axios.get(`${Baseurl}${endUrl.searchSchool}${searchtask}`).then((res) => {
      setListData(res?.data?.data);
    }).catch((e) => {
      console.log('search error', e)
    })
  };

  const onAddPress = (task) => {
    setOperation(task);
    setAdduserModal(true);
  };

  useEffect(() => {
    apicall();
  }, []);

  useEffect(() => {
    apicall();
    if (listData) setLoader(false);
  }, [listData]);

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
            placeholder={constants.SearchSchool}
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
            value={searchtask}
            onChangeText={(val) => setSearchTask(val)}
          />
          <TouchableOpacity style={Styles.eyeStyle} onPress={onsearch}>
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
        <TouchableOpacity onPress={() => onAddPress("Add")}>
          <Image source={Images.addCricleIcon} />
        </TouchableOpacity>
      </View>

      {addUserModal ? (
        <AddSchool
          visible={addUserModal}
          setmodalVisible={(val) => setAdduserModal(val)}
          onSubmitDetails={(value, oper) => onSubmitDetails(value, oper)}
          data={addArray}
          name={constants.School}
          operation={operation}
          updateItem={updateItem}
          buttonVal={constants.add}
        />
      ) : null}
      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={operation == "Add" ? AlertText.AddedSuccessFully : AlertText.SchoolUpdate}
          subMessage={operation == "Add" ? AlertText.SchoolAddedSub : AlertText.SchoolUpdateSub}
          onConfirm={() => onPressYes()}
        />) : null}
    </SafeAreaView>
  );
};
