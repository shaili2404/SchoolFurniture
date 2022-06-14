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
import { AddEditSubplaces } from "../../../../../component/manufacturer/AddFormModal/AddEditSubPlaces";
import CommonService from "../../../../../locales/service";
import ConstKey from "../../../../../locales/ApikeyConst";

export const SubPlacesList = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [addUserModal, setAdduserModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const [operation, setOperation] = useState("");
  const [updateItem, setUpdateItem] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [erroralert, seterrorAlert] = useState(false);
  const [maximumNumber, setmaximunNumber] = useState(0);
  const [number, setNumber] = useState(1);
  const [alert, setAlert] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });

  const tableKey = [ConstKey.subplace_name, ConstKey.circuit_name];
  const tableHeader = [
    constants.subplacesname,
    constants.Circuit,
    constants.manage,
  ];

  const addArray = [
    { key: ConstKey.subplace_name, value: constants.subplacesname },
    { key: ConstKey.circuit_name, value: constants.Circuit },
  ];
  useEffect(() => {
    setLoader(true);
    apicall();
  }, []);

  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [userCreate, userEdit, userDlt] = CommonService.getPermission(
      arr,
      [43, 44, 45]
    );
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
        link={endUrl.SubPlace_List}
        mainMessage={AlertText.deletesubplace}
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
      if (value != null && value != "" && key != ConstKey.district_name)
        obj[key] = value;
    });
    axios.defaults.headers.common["Content-Type"] = "application/json";
    const service =
      oper == constants.add
        ? axios.post(`${endUrl.SubPlace_List}`, obj)
        : axios.put(`${endUrl.SubPlace_List}/${updateItem.id}`, obj);
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
      .get(`${endUrl.SubPlace_List}?page=${count ? count : number}`)
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

  const onReset = () => {
    setErrorMessage("");
    setSearchTask("");
  };
  const onsearch = () => {
    setErrorMessage("");
    if (searchtask == "") {
      setErrorMessage(constants.enterSearchData);
    } else {
      setLoader(true);
      axios
        .get(`${endUrl.SubPlaces_search}${searchtask}`)
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
    if (listData) setLoader(false);
  }, [listData]);

  useEffect(() => {
    if (searchtask == "") {
      setLoader(true);
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
              placeholder={constants.subplacesname}
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
              <Image source={Images.rightarrow} style={Styles.tramsformStyle} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onNext}
            disabled={number == maximumNumber ? true : false}
          >
            {number == maximumNumber ? (
              <Image source={Images.leftarrow} style={Styles.tramsformStyle} />
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
          <AddEditSubplaces
            visible={addUserModal}
            setmodalVisible={(val) => setAdduserModal(val)}
            onSubmitDetails={(value, oper) => onSubmitDetails(value, oper)}
            data={addArray}
            name={constants.subplacesname}
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
                ? AlertText.subplaceAddedSub
                : AlertText.SubplaceUpdateSub
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
