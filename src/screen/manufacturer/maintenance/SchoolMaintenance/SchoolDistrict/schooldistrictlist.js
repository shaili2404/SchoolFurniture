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
import AlertText from "../../../../../Alert/AlertText";
import { AlertMessage } from "../../../../../Alert/alert";

export const SchoolDistrictList = () => {
  const [listData, setListData] = useState([]);
  const [remaningData, setRemaningData] = useState([]);
  const [previousdata, setPreviousData] = useState([]);
  const [pageNumber, setPageNumber] = useState(10);
  const loginData = useSelector((state) => state?.loginData);
  const [addUserModal, setAdduserModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const [operation, setOperation] = useState("");
  const [updateItem, setUpdateItem] = useState({});
  const [alert, setAlert] = useState(false);
  const [leftarrow, setleftArrow] = useState(true);
  const [rightarrow, setrightArrow] = useState(true);
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
        onEdit={(item, task) => onEdit(item, task)}
      />
    );
  };

  const onEdit = (item, task) => {
    setOperation(task);
    setUpdateItem(item);
    setAdduserModal(true);
  };

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

    const service = oper == "Add" ? axios.post(`${Baseurl}${endUrl.schoolDistList}`, obj) : axios.put(`${Baseurl}${endUrl.schoolDistList}/${updateItem.id}`, obj);
    service.then((res) => {
      setLoader(false);
      setAlert(true);
    }).catch((e) => {
      setLoader(false);
      console.log("getError", e);
      console.log(obj)
    })
  };

  const apicall = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    axios
      .get(`${Baseurl}${endUrl.schoolDistList}`)
      .then((res) => {
        // setListData(res?.data?.data)
        getdata(res?.data?.data);
      })
      .catch((e) => console.log("apicall", e));
  };

  const getdata = (val) => {
    if (val && val.length > 10) {
      setListData(val.splice(0, 10));
      setrightArrow(false);
      // setPreviousData((predata) => {
      //   return {
      //     ...predata,
      //     listData,
      //   };
      // });
      setRemaningData(val);
    } else {
      setListData(val);
      setrightArrow(true);
    }
  };

  const loadmoredata = () => {
    getdata(remaningData);
  };
  const lessdata = () => {
    if (previousdata.length > 0) {
      setrightArrow(false);
    }
    getdata(previousdata);
  };

  const onsearch = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    axios
      .get(`${Baseurl}${endUrl.districtSearch}${searchtask}`)
      .then((res) => {
        setListData(res?.data?.data);
      })
      .catch((e) => {
        console.log("search error", e);
      });
  };

  const onAddPress = (task) => {
    setOperation(task);
    setAdduserModal(true);
  };

  useEffect(() => {
    apicall();
  }, []);
  useEffect(() => {
    if (listData) setLoader(false);
  }, [listData]);
  useEffect(() => {
    if (searchtask == "") apicall();
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
        <TouchableOpacity onPress={lessdata} disabled={leftarrow}>
          {leftarrow ? (
            <Image source={Images.leftarrow} />
          ) : (
            <Image
              source={Images.rightarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={loadmoredata} disabled={rightarrow}>
          {rightarrow ? (
            <Image
              source={Images.leftarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          ) : (
            <Image source={Images.rightarrow} />
          )}
        </TouchableOpacity>
      </View>
      <View style={Styles.plusView}>
        <TouchableOpacity onPress={() => onAddPress("Add")}>
          <Image source={Images.addCricleIcon} />
        </TouchableOpacity>
      </View>
      {addUserModal ? (
        <AddUserModal
          visible={addUserModal}
          setmodalVisible={(val) => setAdduserModal(val)}
          onSubmitDetails={(value, oper) => onSubmitDetails(value, oper)}
          data={addArray}
          name={constants.District}
          operation={operation}
          updateItem={updateItem}
          buttonVal={constants.add}
        />
      ) : null}
      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={operation == "Add" ? AlertText.districtAdd : AlertText.districtUpdate}
          subMessage={operation == "Add" ? AlertText.districtUpdateSub : AlertText.districtUpdateSub}
          onConfirm={() => onPressYes()}
        />) : null}
    </SafeAreaView>
  );
};