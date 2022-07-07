import React, { useState, useEffect, useLayoutEffect } from "react";
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
import styles from "./Styles";
import COLORS from "../../asset/color";
import Images from "../../asset/images";

import constants from "../../locales/constants";
import axios from "axios";
import endUrl from "../../redux/configration/endUrl";
import { useSelector } from "react-redux";
import { DataDisplayList } from "../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../component/manufacturer/ListHeaderComman";
import Loader from "../../component/loader";
import AlertText from "../../Alert/AlertText";
import DatePicker from "react-native-date-picker";
import { useNavigation, useIsFocused } from "@react-navigation/core";
import CommonService from "../../locales/service";
import ConstKey from "../../locales/ApikeyConst";
import Screen from "../../locales/navigationConst";

export const ManageRequests = () => {
  const isFocused = useIsFocused();
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endData, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [close, setCLose] = useState(false);
  const [startDateStatus, setStartDateStatus] = useState(true);
  const [enddateStatus, setendDatestatus] = useState(true);
  const [searchStatus, setSearchStatus] = useState(true);
  const [dateErrorMessage, setDateErrorMessage] = useState("");
  const [maximumNumber, setmaximunNumber] = useState(0);
  const [number, setNumber] = useState(1);

  const [permissionId, setPermissionId] = useState({
    userList: false,
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const tableKey = [
    ConstKey.school_name,
    ConstKey.emis,
    ConstKey.created_at,
    ConstKey.ref_number,
    ConstKey.status,
    ConstKey.total_furniture,
  ];

  const tableHeader = [
    constants.School,
    constants.emisNumber,
    constants.dateCreated,
    constants.refrenceNumber,
    constants.status,
    constants.totalFurnitureCount,
    constants.manage,
  ];
  // get permission for list edit and delete
  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [userList, userEdit, userDlt] = CommonService.getPermission(
      arr,
      [29, 31, 32]
    );
    setPermissionId({
      userList: userList,
      userEdit: userEdit,
      userDelete: userDlt,
    });
  }, [listData]);

  // render component of flatlist
  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        reloadList={() => reloadList()}
        link={endUrl.delManageRequest}
        mainMessage={AlertText.deleteManageRequest}
        submessage={AlertText.UndoMessgae}
        onEdit={(item, task) => onEdit(item, task)}
        permissionId={permissionId}
      />
    );
  };
  // header component of flatlist
  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };
  // reload list if request is edit and delete
  const reloadList = () => {
    apicall();
  };
  // get request list on render
  const apicall = (count) => {
    setLoader(true);
    axios
      .get(`${endUrl.getManageRequest}?page=${count ? count : number}`)
      .then((res) => {
        setListData(res?.data?.data?.records);
        setmaximunNumber(res?.data?.data?.total_page);
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
        setListData(undefined);
      });
  };
  // on Next button Click
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
  // on edit button click
  const onEdit = (task) => {
    let data = task;
    navigation.navigate(Screen.Furniture_Replacment_Process, {
      items: data,
      task: "MangeRequest",
    });
  };
  // to see if start date is greater than end date
  useEffect(() => {
    if (startDate.getTime() > endData.getTime()) {
      setDateErrorMessage(AlertText.DateError);
    } else {
      setDateErrorMessage("");
    }
  }, [startDate, endData]);

  // setting header title on header
  useLayoutEffect(() => {
    const title = "Manage Request";
    navigation.setOptions({ title });
  }, []);
  // on search button click
  const onsearch = () => {
    setSearchStatus(false);
    let strtDte = `${startDate?.getFullYear()}-${
      startDate?.getMonth() + 1
    }-${startDate?.getDate()}`;
    let endDte = `${endData?.getFullYear()}-${
      endData?.getMonth() + 1
    }-${endData.getDate()}`;
    let str = "";
    if (!validation(searchtask)) str += `${ConstKey.ref_number}=${searchtask}&`;
    if (startDateStatus == false) str += `${ConstKey.start_date}=${strtDte}&`;
    if (enddateStatus == false) str += `${ConstKey.end_date}=${endDte}&`;
    setLoader(true);
    axios
      .get(`${endUrl.searchManageRequest}?${str}`)
      .then((res) => {
        setListData(res?.data?.data);
        initialPagination(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => {
        // setLoader(false);
        // setErrorMessage(e?.response?.data?.message);
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
  };
  // on reset button click
  const onReset = () => {
    setSearchStatus(true);
    setSearchTask("");
    setStartDateStatus(true);
    setendDatestatus(true);
    setDateErrorMessage("");
    setErrorMessage(false);
  };
  // validating if input text is null
  const validation = (value) => {
    return value == "" || value == undefined || value == null;
  };
  // get data list
  useEffect(() => {
    apicall();
  }, [isFocused]);
  // flase loader on get of list
  useEffect(() => {
    if (listData) setLoader(false);
  }, [listData]);
  // get data list on empty if search text
  useEffect(() => {
    if (searchtask === "") {
      apicall();
      setErrorMessage("");
      setLoader(false);
    }
  }, [searchtask]);

  return loader ? (
    <Loader />
  ) : (
    <>
      {permissionId.userList ? (
        <SafeAreaView style={styles.mainView}>
          <View style={styles.radioView}>
            <View style={styles.radioDate}>
              <View>
                <TextInput
                  style={styles.refrenceStyle}
                  placeholder={constants.referenceNumber}
                  placeholderTextColor={COLORS.Black}
                  opacity={0.5}
                  value={searchtask}
                  onChangeText={(val) => setSearchTask(val)}
                />
              </View>
              <View style={styles.viewInputStyle}>
                <View style={styles.dropStyle}>
                  <Text style={styles.textStyle}>
                    {startDateStatus
                      ? "Start Date"
                      : `${startDate?.getDate()}/${
                          startDate?.getMonth() + 1
                        }/${startDate?.getFullYear()}`}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.eyeStyle}
                  onPress={() => setOpen(true)}
                >
                  <Image source={Images.Calendar} style={styles.imgStyle} />
                  <DatePicker
                    modal
                    open={open}
                    date={startDate}
                    mode="date"
                    onConfirm={(date) => {
                      setOpen(false);
                      setStartDate(date);
                      setStartDateStatus(false);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </TouchableOpacity>
                <View style={styles.dropStyle}>
                  <Text style={styles.textStyle}>
                    {enddateStatus
                      ? "End Date"
                      : `${endData?.getDate()}/${
                          endData?.getMonth() + 1
                        }/${endData?.getFullYear()}`}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.eyeStylee}
                  onPress={() => setCLose(true)}
                >
                  <Image source={Images.Calendar} style={styles.imgStylee} />
                  <DatePicker
                    modal
                    open={close}
                    date={endData}
                    mode="date"
                    onConfirm={(date) => {
                      setCLose(false);
                      setEndDate(date);
                      setendDatestatus(false);
                    }}
                    onCancel={() => {
                      setCLose(false);
                    }}
                  />
                </TouchableOpacity>
              </View>
              {dateErrorMessage ? (
                <View style={styles.dateerrorView}>
                  <Text style={styles.DateerrormessStyle}>
                    {dateErrorMessage}
                  </Text>
                </View>
              ) : null}
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={searchStatus ? onsearch : onReset}
              >
                <Text style={styles.buttonText}>
                  {" "}
                  {searchStatus ? constants.search : constants.Reset}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {errorMessage ? (
            <View style={styles.errorView}>
              <Text style={styles.errormessStyle}>{errorMessage}</Text>
            </View>
          ) : (
            <>
              {listData == undefined ? (
                <>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <ListHeaderComman tableHeader={tableHeader} />
                  </ScrollView>
                  <View style={styles.noDataView}>
                    <Text style={styles.noDataText}>
                      {constants.No_Collection_Requests_Found}
                    </Text>
                  </View>
                </>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <FlatList
                    ListHeaderComponent={HeaderComponet}
                    keyExtractor={(item) => item.id}
                    data={listData}
                    scrollEnabled={false}
                    renderItem={rendercomponent}
                  />
                </ScrollView>
              )}
            </>
          )}
          <View style={styles.lastView}>
            <TouchableOpacity
              onPress={onPrevious}
              disabled={number == 1 ? true : false}
            >
              {number == 1 ? (
                <Image source={Images.leftarrow} />
              ) : (
                <Image
                  source={Images.rightarrow}
                  style={styles.transformStyle}
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
                  style={styles.transformStyle}
                />
              ) : (
                <Image source={Images.rightarrow} />
              )}
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.errrorparentView}>
          <View style={styles.errorMsgView}>
            <Image source={Images.error} style={styles.errIconStyle} />
            <Text style={styles.errorMsg}>
              {constants.Error_Permission_Msg}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};
