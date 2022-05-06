import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import COLORS from "../../asset/color";
import DatePicker from "react-native-date-picker";
import Images from "../../asset/images";
import constants from "../../locales/constants";
import Styles from "./style";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { DataDisplayList } from "../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../component/manufacturer/ListHeaderComman";
import { useSelector } from "react-redux";
import axios from "axios";
import endUrl from "../../redux/configration/endUrl";
import Loader from "../../component/loader";
import Dropdown from "../../component/DropDown/dropdown";
import AlertText from "../../Alert/AlertText";

const PAGESIZE = 6;

export const ReplanishmentReports = () => {
  const isFocused = useIsFocused();
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPage: 0,
    startIndex: 0,
    endIndex: 0,
  });
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [close, setCLose] = useState(false);
  const [open, setOpen] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [dropData, setDropData] = useState([]);
  const [select, setSelect] = useState([]);
  const [refnumber, setrefNumber] = useState("");
  const [emisNumber, setEmisNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dateErrorMessage, setDateErrorMessage] = useState("");
  const [startDateStatus, setStartDateStatus] = useState(true);
  const [enddateStatus, setendDatestatus] = useState(true);
  const [searchStatus, setSearchStatus] = useState(true);
  const [maximumNumber, setmaximunNumber] = useState(0);
  const [number, setNumber] = useState(1);

  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });
  const organization = useSelector(
    (state) => state?.loginData?.user?.data?.data?.user?.organization
  );
  const validation = (value) => {
    return value == "" || value == undefined || value == null;
  };
  useEffect(() => {
    if (startDate.getTime() > endDate.getTime())
      setDateErrorMessage(AlertText.DateError);
    else setDateErrorMessage("");
  }, [startDate, endDate]);
  const onsearch = () => {
    setSearchStatus(false);
    let strtDte = `${startDate?.getFullYear()}-${
      startDate?.getMonth() + 1
    }-${startDate?.getDate()}`;
    let endDte = `${endDate?.getFullYear()}-${
      endDate?.getMonth() + 1
    }-${endDate.getDate()}`;
    let str = "";
    if (!validation(refnumber)) str += `ref_number=${refnumber}&`;
    if (startDateStatus == false) str += `start_date=${strtDte}&`;
    if (enddateStatus == false) str += `end_date=${endDte}&`;
    if (!validation(emisNumber)) str += `emis=${emisNumber}&`;
    if (select?.id) str += `status_id=${select?.id}&`;
    setLoader(true);
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios
      .get(`${endUrl.searchfurRequest}?${str}`)
      .then((res) => {
        setCollectionList(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => {
        onerrorapi(e);
        setErrorMessage(e?.response?.data?.message);
      });
  };
  const onsuccessapi = (res) => {
      console.log(res?.data?.data)
    setCollectionList(res?.data?.data?.records);
    setmaximunNumber(res?.data?.data?.total_page);
    setLoader(false);
  };
  const onerrorapi = (e) => {
    console.log(e)
    setLoader(false);
  };

  const getCollectionRequest = (count) => {
    setLoader(true);
    axios
      .get(`${endUrl.collectionreqList}?page=${count ? count : number}`)
      .then((res) => onsuccessapi(res))
      .catch((e) => onerrorapi(e));
  };
  const getstatusList = () => {
    setLoader(true);
    axios
      .get(`${endUrl.statusList}`)
      .then((res) => setDropData(res?.data?.data))
      .catch((e) => console.log("apicall", e));
  };

  useLayoutEffect(() => {
    const title = constants.Reports;
    navigation.setOptions({ title });
  }, []);

  useEffect(() => {
    getCollectionRequest();
    getstatusList();
  }, [isFocused]);

  const onNext = () => {
    let count = number + 1;
    setLoader(true);
    setNumber(number + 1);
    getCollectionRequest(count);
    setLoader(false);
  };

  const onPrevious = () => {
    let count = number - 1;
    setLoader(true);
    setNumber(number - 1);
    getCollectionRequest(count);
    setLoader(false);
  };

  const onReset = () => {
    setSearchStatus(true);
    setEmisNumber("");
    setrefNumber("");
    setStartDateStatus(true);
    setendDatestatus(true);
    setErrorMessage("");
    setDateErrorMessage("");
    getCollectionRequest();
    setNumber(1);
  };

  useEffect(() => {
    if (refnumber == "") {
      getCollectionRequest();
      getstatusList();
    }
  }, [refnumber]);

  const tableHeader = [
          constants.schoolName,
          constants.schoolEmisNumber,
          constants.DistrictOffice,
          constants.ReplanishmentReports_trancRefNo,
          constants.ReplanishmentReports_tranRefDate,
          constants.FurnitureCat,
          constants.ReplanishmentReports_Replcount,
          constants.ReplanishmentReports_replaStatus,
          constants.ReplanishmentReports_TotalPerSchool
 
        ]
    
  const tableKey =
       [
          "school_name",
          "created_at",
          "ref_number",
          "status",
          "emis",
          "total_furniture",
        ];
  const rendercomponent = ({ item }) => {
    return (
    
          
            <DataDisplayList
              tableKey={tableKey}
              item={item}
              permissionId={permissionId}
            />
    )
  };
  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  return loader ? (
    <Loader />
  ) : (
   
      <SafeAreaView style={Styles.mainView}>
                           {/* <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}> */}

        <View>
         <View style={Styles.changeView}>
                <Text style={Styles.changeText}>{constants.selReports}</Text>
            </View>
        </View>
        <View style={Styles.halfView}>
          <View style={Styles.searchButtonView}>
            <Text style={Styles.transactionText}>
              {constants.Filter}
            </Text>
            <TouchableOpacity
              style={Styles.searchButton}
              onPress={searchStatus ? onsearch : onReset}
            >
              <Text style={Styles.searchText}>
                {searchStatus ? constants.search : constants.Reset}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.refView}>
            <TextInput
              style={Styles.refrenceStyle}
              placeholder={constants.schoolName}
              placeholderTextColor={COLORS.Black}
              opacity={0.5}
              value={refnumber}
              onChangeText={(val) => setrefNumber(val)}
            />
             <View style={Styles.dropdownsecStyle}>
            <Dropdown
              label={constants.DistrictOffice}
              data={dropData}
              onSelect={setSelect}
              task="name"
            />
          </View>
          </View>
          <View style={Styles.container}>
            <Dropdown
              label={constants.replanishment_status}
              data={dropData}
              onSelect={setSelect}
              task="name"
            />
          </View>
          <View style={Styles.viewInputStyle}>
            <View style={Styles.dropsssssStyle}>
              <Text style={Styles.textStyle}>
                {startDateStatus
                  ? "Start Date"
                  : `${startDate?.getDate()}/${
                      startDate?.getMonth() + 1
                    }/${startDate?.getFullYear()}`}
              </Text>
            </View>
            <TouchableOpacity
              style={Styles.eyeStyle}
              onPress={() => setOpen(true)}
            >
              <Image source={Images.Calender} style={Styles.imgStyle} />
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
            <View style={Styles.dropsssssStyle}>
              <Text style={Styles.textStyle}>
                {enddateStatus
                  ? "End Date"
                  : `${endDate?.getDate()}/${
                      endDate?.getMonth() + 1
                    }/${endDate?.getFullYear()}`}
              </Text>
            </View>
            <TouchableOpacity
              style={Styles.eyeStyles}
              onPress={() => setCLose(true)}
            >
              <Image source={Images.Calender} style={Styles.imgStyle} />
              <DatePicker
                modal
                open={close}
                date={endDate}
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
          <View style={Styles.containerfurcat}>
            <Dropdown
              label={constants.FurnitureCat}
              data={dropData}
              onSelect={setSelect}
              task="name"
            />
          </View>
          {dateErrorMessage ? (
            <View style={Styles.dateerrorView}>
              <Text style={Styles.DateerrormessStyle}>{dateErrorMessage}</Text>
            </View>
          ) : null}
          {errorMessage ? (
            <View style={Styles.errorView}>
              <Text style={Styles.errormessStyle}>{errorMessage}</Text>
            </View>
          ) : (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <FlatList
                ListHeaderComponent={HeaderComponet}
                keyExtractor={(item) => item.id}
                data={collectionList}
                renderItem={rendercomponent}
              />
            </ScrollView>
          )}
        </View>
      
        <View style={Styles.lastView}>
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
         <View style={{ height: 100 }} />
     {/* </ScrollView> */}
      
      </SafeAreaView>
 
  );
};