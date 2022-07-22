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
import { AddEditCircuit } from "../../../../../component/manufacturer/AddFormModal/AddEditCircuit";
import CommonService from "../../../../../locales/service";
import ConstKey from "../../../../../locales/ApikeyConst";

export const CircuitList = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [addUserModal, setAdduserModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const [operation, setOperation] = useState("");
  const [updateItem, setUpdateItem] = useState({});
  const [maximumNumber, setmaximunNumber] = useState(0);
  const [number, setNumber] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [erroralert, seterrorAlert] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });

  const tableKey = [ConstKey.circuit_name, ConstKey.cmc_name];
  const tableHeader = [constants.Circuit, constants.Cmc, constants.manage];

  const addArray = [
    { key: ConstKey.circuit_name, value: constants.Circuit },
    { key: ConstKey.cmc_name, value: constants.Cmc },
  ];

  // Checking permission What user is permitted
  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [userCreate, userEdit, userDlt] = CommonService.getPermission(
      arr,
      [39, 40, 41]
    );
    setPermissionId({
      userCreate: userCreate,
      userEdit: userEdit,
      userDelete: userDlt,
    });
  }, []);

  // Get Data List
  useEffect(() => {
    apicall();
  }, []);

  // set loader false on getting of data
  useEffect(() => {
    if (listData) setLoader(false);
  }, [listData]);

  // calling list data again if search input text is empty
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
        link={endUrl.CIRCUIT_List}
        mainMessage={AlertText.deleteCircuit}
        submessage={AlertText.UndoMessgae}
        permissionId={permissionId}
        afterDeleteMsg = {constants.Circuit}
        afterSecondMsg = {constants.circuitDelete}
      />
    );
  };

  // on Edit button click
  const onEdit = (item, task) => {
    setOperation(task);
    setUpdateItem(item);
    setAdduserModal(true);
  };

  // Header component of flatlist
  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  // repload function on changing of data
  const reloadList = () => {
    apicall();
  };

  // on submit detail click for both add and edit
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
      oper == "Add"
        ? axios.post(`${endUrl.CIRCUIT_List}`, obj)
        : axios.put(`${endUrl.CIRCUIT_List}/${updateItem.id}`, obj);
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

  // get list data according to pagination
  const apicall = (count) => {
    setLoader(true);
    axios
      .get(`${endUrl.CIRCUIT_List}?page=${count ? count : number}`)
      .then((res) => {
        setListData(res?.data?.data?.records);
        setmaximunNumber(res?.data?.data?.total_page);
        setLoader(false);
      })
      .catch((e) => {});
  };

  // On Next Button Clicked
  const onNext = () => {
    let count = number + 1;
    setLoader(true);
    setNumber(number + 1);
    apicall(count);
    setLoader(false);
  };

  // On previous button Clicked
  const onPrevious = () => {
    let count = number - 1;
    setLoader(true);
    setNumber(number - 1);
    apicall(count);
    setLoader(false);
  };

  // On search Button Clicked
  const onsearch = () => {
    setErrorMessage("");
    if (searchtask == "") {
      setErrorMessage(constants.enterSearchData);
    } else {
      setLoader(true);
      axios
        .get(`${endUrl.CIRCUIT_search}${searchtask}`)
        .then((res) => {
          setListData(res?.data?.data);
          setLoader(false);
        })
        .catch((e) => {
          {
            let { message, data, status } = e?.response?.data || {};
            setLoader(false);
            {
              let str = "";
              status == 422
                ? Object.values(data).forEach((value) => {
                    str += `  ${value}`;
                    setErrorMessage(str);
                  })
                : setErrorMessage(message);
            }
          }
        });
    }
  };

  // On reset button Clicked
  const onReset = () => {
    setErrorMessage("");
    setSearchTask("");
  };

  // On Add new Circuit
  const onAddPress = (task) => {
    setOperation(task);
    setAdduserModal(true);
  };

  return loader ? (
    <Loader />
  ) : (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={Styles.mainView}>
        <View style={Styles.halfView}>
          <View>
            <TextInput
              style={Styles.refrenceStyle}
              placeholder={constants.SearchCircuit}
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
          <AddEditCircuit
            visible={addUserModal}
            setmodalVisible={(val) => setAdduserModal(val)}
            onSubmitDetails={(value, oper) => onSubmitDetails(value, oper)}
            data={addArray}
            name={constants.Circuit}
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
                ? AlertText.CircuitAddedSub
                : AlertText.CircuitUpdateSub
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
      </SafeAreaView>
    </ScrollView>
  );
};
