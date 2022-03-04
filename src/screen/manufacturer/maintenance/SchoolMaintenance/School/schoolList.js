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
  Text
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

const PAGESIZE = 10;

export const SchoolList = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [addUserModal, setAdduserModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const [operation, setOperation] = useState("");
  const [updateItem, setUpdateItem] = useState({});
  const [pagination, setPagination] = useState({ currentPage: 0, totalPage: 0, startIndex: 0, endIndex: 0 });
  const [errorMessage, setErrorMessage] = useState("");
  const [erroralert, seterrorAlert] = useState(false);
  const [alert, setAlert] = useState(false);


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
    { key: "school_principal", value: constants.SchoolPrinciple },
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
        link={endUrl.schoolList}
        mainMessage={AlertText.deleteschool}
        submessage={AlertText.UndoMessgae}
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
    console.log('114',obj)
    const service = oper == "Add" ? axios.post(`${Baseurl}${endUrl.schoolList}`, obj) : axios.put(`${Baseurl}${endUrl.schoolList}/${updateItem.id}`, obj);
    service.then((res) => {
      setLoader(false);
      setAlert(true);
      apicall()
    }).catch((e) => {
      setLoader(false);
      seterrorAlert(true)
      console.log(e);
    })
  };

  const apicall = () => {
    setLoader(true)
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    axios.get(`${Baseurl}${endUrl.schoolList}`).then((res) =>{
      initialPagination(res?.data?.data);
      setListData(res?.data?.data)
      setLoader(false)
    }
    ).catch((e) =>
      console.log('apicall', e)
    )
  };
  const initialPagination = (list) => {
    const len = list.length;
    const totalPage = Math.ceil(len / PAGESIZE);
    setPagination({
      currentPage: 1,
      totalPage: totalPage,
      startIndex: 0,
      endIndex: len > PAGESIZE ? PAGESIZE : len
    })
  }

  const onNext = () => {
    let { currentPage, totalPage } = pagination;
    if (currentPage === totalPage) {
      return;
    }
    setPagination((prevState) => {
      return {
        ...prevState,
        currentPage: currentPage + 1,
        startIndex: currentPage * PAGESIZE,
        endIndex: (currentPage + 1) * PAGESIZE > listData.length ? listData.length : (currentPage + 1) * PAGESIZE
      }
    })
  };
  const onPrevious = () => {
    let { currentPage } = pagination;
    if (currentPage === 1) {
      return;
    }
    setPagination((prevState) => {
      return {
        ...prevState,
        currentPage: currentPage - 1,
        startIndex: (currentPage - 2) * PAGESIZE,
        endIndex: (currentPage - 1) * PAGESIZE
      }
    })
  };

  const onsearch = () => {
    setLoader(true)
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    axios.get(`${Baseurl}${endUrl.searchSchool}${searchtask}`).then((res) => {
      setListData(res?.data?.data);
      setLoader(false)
    }).catch((e) => {
      console.log('search error', e)
      setLoader(false)
      setErrorMessage(constants.SchoolFound);
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
    if (listData) setLoader(false);
  }, [listData]);

  useEffect(() => {
    if (searchtask == "") {
      apicall();
      setErrorMessage("");
      setLoader(false)
    }
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
        {errorMessage ? (
            <View style={Styles.errorView}>
            <Text style={Styles.errormessStyle}>{errorMessage}</Text>
            </View>
          ) : (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            ListHeaderComponent={HeaderComponet}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={listData}
            renderItem={rendercomponent}
          />
        </ScrollView>
          )}
      </View>
      <View style={Styles.lastView}>
        <TouchableOpacity onPress={onPrevious} >
          {pagination.currentPage === 1 ? (
            <Image source={Images.leftarrow} />
          ) : (
            <Image
              source={Images.rightarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext} >
          {pagination.currentPage === pagination.totalPage ? (
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
        <AddSchool
          visible={addUserModal}
          setmodalVisible={(val) => setAdduserModal(val)}
          onSubmitDetails={(value, oper) => onSubmitDetails(value, oper)}
          data={addArray}
          name={constants.School}
          operation={operation}
          updateItem={updateItem}
          buttonVal={ operation === 'Add'? constants.add : constants.update}
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
        {erroralert ? (
        <AlertMessage
          visible={erroralert}
          setmodalVisible={(val) => seterrorAlert(val)}
          mainMessage={
            operation == "Add"
              ? AlertText.schoolAdded
              : AlertText.editfailure
          }
          onConfirm={() => onPressokay()}
        />
      ) : null}
    </SafeAreaView>
  );
};
