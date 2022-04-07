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
import { useNavigation,useIsFocused } from "@react-navigation/core";

const PAGESIZE = 10;

export const ManageRequests = () => {
  const isFocused = useIsFocused()
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

  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPage: 0,
    startIndex: 0,
    endIndex: 0,
  });
  const [permissionId, setPermissionId] = useState({
    userList: false,
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [permissionArr, setpermissionArr] = useState([]);
  const navigation = useNavigation();

  const tableKey = [
    "school_name",
    "emis",
    "created_at",
    "ref_number",
    "status",
    "total_furniture",
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

  useEffect(() => {
    setpermissionArr(loginData?.user?.data?.data?.permissions);
    let userList = false,
      userCreate = false,
      userEdit = false,
      userDlt = false;
    permissionArr.forEach((input) => {
      if (input.id === 5) {
        // setErrorMessage("");
        userList = true;
      }
      if (input.id === 6) {
        userCreate = true;
      }
      if (input.id === 7) {
        userEdit = true;
      }
      if (input.id === 8) {
        userDlt = true;
      } else if (!userList) {
      }
    });
    setPermissionId({
      userList: true,
      userCreate: true,
      userEdit: true,
      userDelete: true,
    });
  }, [listData]);

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

  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  const reloadList = () => {
    apicall();
  };

  const apicall = async () => {
    setLoader(true);
    axios
      .get(endUrl.addFurRequest)
      .then((res) => {
        initialPagination(res?.data?.data);
        setListData(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => setLoader(false));
  };

   // Edit Functionality
   const onEdit = (task) => {
    let data = task
     navigation.navigate('FurnitureReplacmentProcess',{items:data,task:'MangeRequest'})
  };

  const initialPagination = (list) => {
    const len = list.length;
    const totalPage = Math.ceil(len / PAGESIZE);
    setPagination({
      currentPage: 1,
      totalPage: totalPage,
      startIndex: 0,
      endIndex: len > PAGESIZE ? PAGESIZE : len,
    });
  };

  const onNext = () => {
    setLoader(true);
    let { currentPage, totalPage } = pagination;
    if (currentPage === totalPage) {
      return;
    }
    setPagination((prevState) => {
      return {
        ...prevState,
        currentPage: currentPage + 1,
        startIndex: currentPage * PAGESIZE,
        endIndex:
          (currentPage + 1) * PAGESIZE > listData.length
            ? listData.length
            : (currentPage + 1) * PAGESIZE,
      };
    });
    setLoader(false);
  };

  const onPrevious = () => {
    setLoader(true);
    let { currentPage } = pagination;
    if (currentPage === 1) {
      return;
    }
    setPagination((prevState) => {
      return {
        ...prevState,
        currentPage: currentPage - 1,
        startIndex: (currentPage - 2) * PAGESIZE,
        endIndex: (currentPage - 1) * PAGESIZE,
      };
    });
    setLoader(false);
  };

  useEffect (()=>{
    if (startDate.getTime() > endData.getTime()){
      setDateErrorMessage(AlertText.DateError)
    }
    else{
      setDateErrorMessage('')
    }
   },[startDate,endData])

  const onsearch = () => {
    setSearchStatus(false);
    let strtDte = `${startDate?.getFullYear()}-${startDate?.getMonth()+1}-${startDate?.getDate()}`;
    let endDte = `${endData?.getFullYear()}-${endData?.getMonth()+1}-${endData.getDate()}`;
    let str = ''
    if (!validation(searchtask)) str += `ref_number=${searchtask}&`
    if (startDateStatus == false) str += `start_date=${strtDte}&`
    if (enddateStatus == false) str += `end_date=${endDte}&`
    setLoader(true);
    axios
      .get(`${endUrl.searchManageRequest}?${str}`)
      .then((res) => {
        setListData(res?.data?.data);
        initialPagination(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
        setErrorMessage(e?.response?.data?.message);
      });
  };
  const onReset = () => {
    setSearchStatus(true);
    setSearchTask("");
    setStartDateStatus(true);
    setendDatestatus(true);
    setDateErrorMessage('')
    setErrorMessage(false)
    
  };


  const validation = (value) =>{
    return value == "" || value == undefined || value == null
  }

  useEffect(() => {
    apicall();
  }, [isFocused]);

  useEffect(() => {
    if (listData) setLoader(false);
  }, [listData]);

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
                : `${startDate?.getDate()}/${startDate?.getMonth()+1}/${startDate?.getFullYear()}`}
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
                : `${endData?.getDate()}/${endData?.getMonth()+1}/${endData?.getFullYear()}`}
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
            <Text style={styles.DateerrormessStyle}>{dateErrorMessage}</Text>
          </View>
          ):null}
  
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={searchStatus ? onsearch : onReset}
        >
          <Text style={styles.buttonText}> {searchStatus ? constants.search : constants.Reset}</Text>
        </TouchableOpacity>
      </View>
      </View>
      {errorMessage ? (
        <View style={styles.errorView}>
          <Text style={styles.errormessStyle}>{errorMessage}</Text>
        </View>
      ) : (
      <ScrollView style={styles.radView} horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList
              ListHeaderComponent={HeaderComponet}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              data={listData.filter((element)=>element?.status==='Pending Collection').slice(pagination.startIndex, pagination.endIndex)}
              renderItem={rendercomponent}
            />
          </ScrollView>
          )}
      <View style={styles.lastView}>
        <TouchableOpacity onPress={onPrevious}>
          {pagination.currentPage === 1 ? (
            <Image source={Images.leftarrow} />
          ) : (
            <Image
              source={Images.rightarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext}>
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
    </SafeAreaView>
  );
};
