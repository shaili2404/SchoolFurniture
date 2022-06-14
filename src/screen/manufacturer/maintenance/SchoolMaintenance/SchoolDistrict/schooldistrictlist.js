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
import COLORS from "../../../../../asset/color";
import Images from "../../../../../asset/images";

import constants from "../../../../../locales/constants";
import axios from "axios";
import endUrl from "../../../../../redux/configration/endUrl";
import { useSelector } from "react-redux";
import { DataDisplayList } from "../../../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../../../component/manufacturer/ListHeaderComman";
import { AddUserModal } from "../../../../../component/manufacturer/AddFormModal/AddFormModal";
import Loader from "../../../../../component/loader";
import AlertText from "../../../../../Alert/AlertText";
import { AlertMessage } from "../../../../../Alert/alert";
import CommonService from "../../../../../locales/service";
import ConstKey from "../../../../../locales/ApikeyConst";

export const SchoolDistrictList = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [addUserModal, setAdduserModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const [operation, setOperation] = useState("");
  const [updateItem, setUpdateItem] = useState({});
  const [alert, setAlert] = useState(false);
  const [erroralert, seterrorAlert] = useState(false);
  const [maximumNumber, setmaximunNumber] = useState(0);
  const [number, setNumber] = useState(1);
  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [eMsg, setEMsg] = useState("");

  const tableKey = [ConstKey.district_office];

  const tableHeader = [constants.DistrictOffice, constants.manage];

  const addArray = [
    { key: ConstKey.district_office, value: constants.DistrictOffice },
  ];

  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [userCreate, userEdit, userDlt] = CommonService.getPermission(
      arr,
      [6, 7, 8]
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
        link={endUrl.schoolDistList}
        mainMessage={AlertText.deletedistrict}
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
      if (value !== null && value !== "") {
        obj[key] = value;
      }
    });
    axios.defaults.headers.common["Content-Type"] = "application/json";
    const service =
      oper == constants.add
        ? axios.post(`${endUrl.schoolDistList}`, obj)
        : axios.put(`${endUrl.schoolDistList}/${updateItem.id}`, obj);
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
                setEMsg(str);
              })
            : setEMsg(message);
        }
      });
  };

  const apicall = async (count) => {
    setLoader(true);
    axios
      .get(`${endUrl.schoolDistList}?page=${count ? count : number}`)
      .then((res) => {
        setListData(res?.data?.data?.records);
        setmaximunNumber(res?.data?.data?.total_page);
        setLoader(false);
      })
      .catch((e) => setLoader(false));
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

  const onsearch = async () => {
    setErrorMessage("");
    if (searchtask == "") {
      setErrorMessage(constants.enterSearchData);
    } else {
      setLoader(true);
      axios
        .get(`${endUrl.districtSearch}${searchtask}`)
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
  const onReset = () => {
    setErrorMessage("");
    setSearchTask("");
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
              placeholder={constants.SearchDistrict}
              placeholderTextColor={COLORS.Black}
              opacity={0.5}
              value={searchtask}
              onChangeText={(val) => setSearchTask(val)}
            />
            <TouchableOpacity
              style={Styles.eyeStyle}
              onPress={() => onsearch()}
            >
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
                showsVerticalScrollIndicator={true}
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
          <AddUserModal
            visible={addUserModal}
            setmodalVisible={(val) => setAdduserModal(val)}
            onSubmitDetails={(value, oper) => onSubmitDetails(value, oper)}
            data={addArray}
            name={constants.District}
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
                ? AlertText.districtAdd
                : AlertText.districtUpdate
            }
            subMessage={
              operation == constants.add
                ? AlertText.districtAddedSub
                : AlertText.districtUpdateSub
            }
            onConfirm={() => onPressYes()}
          />
        ) : null}
        {erroralert ? (
          <AlertMessage
            visible={erroralert}
            setmodalVisible={(val) => seterrorAlert(val)}
            mainMessage={eMsg}
            onConfirm={() => onPressokay()}
          />
        ) : null}
      </SafeAreaView>
    </ScrollView>
  );
};
