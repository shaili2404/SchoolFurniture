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
  Text,
} from "react-native";
import axios from "axios";
import { useSelector } from "react-redux";

import COLORS from "../../../../../asset/color";
import Images from "../../../../../asset/images";
import constants from "../../../../../locales/constants";
import endUrl from "../../../../../redux/configration/endUrl";
import AlertText from "../../../../../Alert/AlertText";
import Loader from "../../../../../component/loader";
import { DataDisplayList } from "../../../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../../../component/manufacturer/ListHeaderComman";
import { AddSchool } from "../../../../../component/manufacturer/AddFormModal/AddSchool";
import { AlertMessage } from "../../../../../Alert/alert";
import CommonService from "../../../../../locales/service";
import ConstKey from "../../../../../locales/ApikeyConst";

export const SchoolList = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [addUserModal, setAdduserModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const [operation, setOperation] = useState("");
  const [updateItem, setUpdateItem] = useState({});

  const [errorMessage, setErrorMessage] = useState("");
  const [erroralert, seterrorAlert] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });
  const [maximumNumber, setmaximunNumber] = useState(0);
  const [number, setNumber] = useState(1);

  const tableKey = [
    ConstKey.name,
    ConstKey.emis,
    ConstKey.district_name,
    ConstKey.cmc_name,
    ConstKey.circuit_name,
    ConstKey.subplace_name,
    ConstKey.level_id,
    ConstKey.snq_id,
    ConstKey.school_principal,
    ConstKey.tel,
  ];
  const tableHeader = [
    constants.School_Name,
    constants.schoolEmisNumber,
    constants.SchoolDistrict,
    constants.Cmc,
    constants.Circuit,
    constants.subplacesname,
    constants.Level,
    constants.SNQ,
    constants.SchoolPrinciple,
    constants.SchoolTelno,
    constants.manage,
  ];

  const addArray = [
    { key: ConstKey.name, value: constants.School_Name },
    { key: ConstKey.emis, value: constants.schoolEmisNumber },
    { key: ConstKey.school_principal, value: constants.SchoolPrinciple },
    { key: ConstKey.tel, value: constants.SchoolTelno },
    { key: ConstKey.level_id, value: constants.Level },
    { key: ConstKey.snq_id, value: constants.SNQ },
    { key: ConstKey.district_name, value: constants.SchoolDistrict },
    { key: ConstKey.cmc_name, value: constants.Cmc },
    { key: ConstKey.circuit_name, value: constants.Circuit },
    { key: ConstKey.subplace_name, value: constants.subplacesname },
    { key: ConstKey.street_code, value: constants.streetCode },
  ];

  // getting permmision if user is permitted to view data
  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [userCreate, userEdit, userDlt] = CommonService.getPermission(
      arr,
      [10, 11, 12]
    );
    setPermissionId({
      userCreate: userCreate,
      userEdit: userEdit,
      userDelete: userDlt,
    });
  }, []);

  // get list data
  useEffect(() => {
    apicall();
  }, []);
  // false the loader on getting list
  useEffect(() => {
    if (listData) setLoader(false);
  }, [listData]);

  // calling data again if search text is empty
  useEffect(() => {
    if (searchtask == "") {
      apicall();
      setErrorMessage("");
      setLoader(false);
    }
  }, [searchtask]);

  // render component of flatlist
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
        permissionId={permissionId}
        page={constants.school}
        afterDeleteMsg = {constants.school}
        afterSecondMsg = {constants.SchoolDelete}
      />
    );
  };

  // on edit button click
  const onEdit = (item, task) => {
    setOperation(task);
    setUpdateItem(item);
    setAdduserModal(true);
  };

  // header component of flatlist
  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  // reload list again on changing of data
  const reloadList = () => {
    apicall();
  };

  // on submit details for add new school or edit school
  const onSubmitDetails = async (values, oper) => {
    setAdduserModal(false);
    setLoader(true);
    let obj = {};
    Object.entries(values).forEach(([key, value]) => {
      if (value != null && value != "" && key != ConstKey.district_name)
        obj[key] = value;
    });
    axios.defaults.headers.common["Content-Type"] = "application/json";
    const service =
      oper == constants.add
        ? axios.post(`${endUrl.schoolList}`, obj)
        : axios.put(`${endUrl.schoolList}/${updateItem.id}`, obj);
    service
      .then((res) => {
        setLoader(false);
        setAlert(true);
        apicall();
      })
      .catch((e) => {
        let { message, data, status } = e?.response?.data || {};
        setLoader(false);
        seterrorAlert(true);
        {
          let str = "";
          status == 422
            ? Object.values(data).forEach((value) => {
                str += `  ${value}`;
                setErrMsg(str);
              })
            : setErrMsg(message);
        }
      });
  };

  // getting data list  with pagination
  const apicall = (count) => {
    setLoader(true);
    axios
      .get(`${endUrl.schoolList}?page=${count ? count : number}`)
      .then((res) => {
        setListData(res?.data?.data?.records);
        setmaximunNumber(res?.data?.data?.total_page);
        setLoader(false);
      })
      .catch((e) => {});
  };

  // on next button click
  const onNext = () => {
    let count = number + 1;
    setLoader(true);
    setNumber(number + 1);
    apicall(count);
    setLoader(false);
  };

  // on previous button click
  const onPrevious = () => {
    let count = number - 1;
    setLoader(true);
    setNumber(number - 1);
    apicall(count);
    setLoader(false);
  };

  // on search button click
  const onsearch = () => {
    setErrorMessage("");
    if (searchtask == "") {
      setErrorMessage(constants.enterSearchData);
    } else {
      setLoader(true);
      axios
        .get(`${endUrl.searchSchool}${searchtask}`)
        .then((res) => {
          setListData(res?.data?.data);
          setLoader(false);
        })
        .catch((e) => {
          let errorMsg = e?.response?.data?.message;
          setLoader(false);
          setErrorMessage(errorMsg);
        });
    }
  };

  // on add button press to add new school
  const onAddPress = (task) => {
    setOperation(task);
    setAdduserModal(true);
  };

  // on reset button click
  const onReset = () => {
    setErrorMessage("");
    setSearchTask("");
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 40 }}
      >
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
              <TouchableOpacity style={Styles.searchButton} onPress={onReset}>
                <Text style={Styles.searchText}>{constants.Reset}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <FlatList
                ListHeaderComponent={HeaderComponet}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                data={listData}
                renderItem={rendercomponent}
                scrollEnabled={false}
              />
            </ScrollView>
          )}
        </View>
        <View style={errorMessage ? Styles.lastssView : Styles.lastView}>
          <TouchableOpacity
            onPress={onPrevious}
            disabled={number == 1 ? true : false}
          >
            {number == 1 ? (
              <Image source={Images.leftarrow} />
            ) : (
              <Image source={Images.rightarrow} style={Styles.transformStyle} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onNext}
            disabled={number == maximumNumber ? true : false}
          >
            {number == maximumNumber ? (
              <Image source={Images.leftarrow} style={Styles.transformStyle} />
            ) : (
              <Image source={Images.rightarrow} />
            )}
          </TouchableOpacity>
        </View>

        {permissionId.userCreate && (
          <View style={Styles.plusView}>
            <TouchableOpacity onPress={() => onAddPress(constants.add)}>
              <Image source={Images.addCricleIcon} />
            </TouchableOpacity>
          </View>
        )}

        {addUserModal ? (
          <AddSchool
            visible={addUserModal}
            setmodalVisible={(val) => setAdduserModal(val)}
            onSubmitDetails={(value, oper) => onSubmitDetails(value, oper)}
            data={addArray}
            name={constants.School}
            operation={operation}
            updateItem={updateItem}
            buttonVal={
              operation === constants.add ? constants.add : constants.update
            }
          />
        ) : null}
        {alert ? (
          <AlertMessage
            visible={alert}
            setmodalVisible={(val) => setAlert(val)}
            mainMessage={
              operation == constants.add
                ? AlertText.AddedSuccessFully
                : AlertText.SchoolUpdate
            }
            subMessage={
              operation == constants.add
                ? AlertText.SchoolAddedSub
                : AlertText.SchoolUpdateSub
            }
            onConfirm={() => onPressYes()}
          />
        ) : null}
        {erroralert ? (
          <AlertMessage
            visible={erroralert}
            setmodalVisible={(val) => seterrorAlert(val)}
            mainMessage={errMsg}
            onConfirm={() => onPressokay()}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};
