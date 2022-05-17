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

  const tableKey = ["circuit_name", "cmc_name"];
  const tableHeader = [constants.Circuit, constants.Cmc, constants.manage];

  const addArray = [
    { key: "circuit_name", value: constants.Circuit },
    { key: "cmc_name", value: constants.Cmc },
  ];

  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    let userCreate = false,
      userEdit = false,
      userDlt = false;
    arr.forEach((input) => {
      if (input.id === 10) {
        userCreate = true;
      }
      if (input.id === 11) {
        userEdit = true;
      }
      if (input.id === 12) {
        userDlt = true;
      }
    });
    setPermissionId({
      userCreate: userCreate,
      userEdit: userEdit,
      userDelete: userDlt,
    });
  }, []);

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
      if (value != null && value != "" && key != "district_name")
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

  const apicall = (count) => {
    setLoader(true);
    axios
      .get(`${endUrl.CIRCUIT_List}?page=${count ? count : number}`)
      .then((res) => {
        setListData(res?.data?.data?.records);
        setmaximunNumber(res?.data?.data?.total_page);
        setLoader(false);
      })
      .catch((e) => console.log("apicall", e));
  };
  const onNext = () => {
    let count = number + 1;
    setLoader(true);
    setNumber(number + 1);
    apicall(count);
    setLoader(false);
  };

  const onPrevious = () => {
    let count = number - 1;
    setLoader(true);
    setNumber(number - 1);
    apicall(count);
    setLoader(false);
  };

  const onsearch = () => {
    setErrorMessage('')
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
      setLoader(false);
    }
  }, [searchtask]);

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
      <View style={errorMessage ? Styles.lastssView :Styles.lastView}>
        <TouchableOpacity
          onPress={onPrevious}
          disabled={number == 1 ? true : false}
        >
          {number == 1 ? (
            <Image source={Images.leftarrow} />
          ) : (
            <Image
              source={Images.rightarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNext}
          disabled={number == maximumNumber ? true : false}
        >
          {number == maximumNumber ? (
            <Image
              source={Images.leftarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
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
