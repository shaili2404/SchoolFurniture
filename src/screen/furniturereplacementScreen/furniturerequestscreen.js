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
import Styles from "./styles";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { DataDisplayList } from "../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../component/manufacturer/ListHeaderComman"; 
import { useSelector } from "react-redux";
import axios from "axios";
import endUrl from "../../redux/configration/endUrl";
import Loader from "../../component/loader";
import Dropdown from "../../component/DropDown/dropdown";
import AlertText from "../../Alert/AlertText";
import Screen from "../../locales/navigationConst";
import ConstKey from "../../locales/ApikeyConst";
import ScreenTitle from "../../locales/ScreenTitle";
import { ListHeader } from "./FurnitureReplacpmentProcess/ListDisplay/HeaderList";
import CommonService from "../../locales/service";

export const FurnitureReplacmentManfacturer = () => {
  const isFocused = useIsFocused();
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
  const [searchNumber, setSearchNumber] = useState(1);
  const [prevpage, setprevpage] = useState("");
  const [nextPage, setnextpage] = useState("");

  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
    createCollectionRequest: false,
    collectionRequestList: false,
    usercollectReuqest: false,
  });
  const organization = useSelector(
    (state) => state?.loginData?.user?.data?.data?.user?.organization
  );
  const loginData = useSelector((state) => state?.loginData);

  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    const [collectionRequest, requestList, collectReuqest] =
      CommonService.getPermission(arr, [22, 21, 25]);
    setPermissionId({
      createCollectionRequest: collectionRequest,
      collectionRequestList: requestList,
      usercollectReuqest: collectReuqest,
    });
  }, []);

  const validation = (value) => {
    return value == "" || value == undefined || value == null;
  };

  const tableHeader = [
    constants.schoolName,
    constants.dateCreated,
    constants.refrenceNo,
    constants.status,
    constants.emis,
    constants.Learner_Enrolment_Count,
  ];

  const tableKey = [
    ConstKey.school_name,
    ConstKey.created_at,
    ConstKey.ref_number,
    ConstKey.status,
    ConstKey.emis,
    ConstKey.total_furniture,
  ];

  const onsearch = (count) => {
    setSearchStatus(false);
    if (
      select?.id == null &&
      validation(emisNumber) &&
      startDateStatus == true &&
      enddateStatus == true &&
      validation(refnumber)
    )
      setErrorMessage(constants.enterSearchData);
    else {
      let strtDte = `${startDate?.getFullYear()}-${
        startDate?.getMonth() + 1
      }-${startDate?.getDate()}`;
      let endDte = `${endDate?.getFullYear()}-${
        endDate?.getMonth() + 1
      }-${endDate.getDate()}`;
      let str = "";
      if (!validation(refnumber)) str += `${ConstKey.ref_number}=${refnumber}&`;
      if (startDateStatus == false) str += `${ConstKey.start_date}=${strtDte}&`;
      if (enddateStatus == false) str += `${ConstKey.end_date}=${endDte}&`;
      if (!validation(emisNumber)) str += `${ConstKey.emis}=${emisNumber}&`;
      if (select?.id) str += `${ConstKey.status_id}=${select?.id}&`;
      setLoader(true);
      axios.defaults.headers.common["Content-Type"] = "application/json";
      axios
        .get(`${endUrl.searchfurRequest}?${str}&page=${count ? count : searchNumber}`)
        .then((res) => {
          setCollectionList(res?.data?.data?.records);
          setprevpage(res?.data?.data?.previous_page);
        setnextpage(res?.data?.data?.next_page);
          setLoader(false);
        })
        .catch((e) => {
          onerrorapi(e);
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

  {
    console.log("11234",collectionList);
  }

    // On search Right Button Click
    const onSearchNext = () => {
      let count = searchNumber + 1;
      setLoader(true);
      setSearchNumber(searchNumber + 1);
      onsearch(count);
      setLoader(false);
    };
  
    // On search Left Previous Button Click
    const onSearchPrevious = () => {
      let count = searchNumber - 1;
      setLoader(true);
      setSearchNumber(searchNumber - 1);
      onsearch(count);
      setLoader(false);
    };

  const onsuccessapi = (res) => {
    setCollectionList(res?.data?.data?.records);
    setmaximunNumber(res?.data?.data?.total_page);
    setLoader(false);
  };

  const onerrorapi = (e) => {
    setCollectionList(undefined);
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
      .catch((e) => {});
  };

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
    setSelect({});

    setEndDate(new Date());
  setStartDate(new Date())
  setSearchNumber(1)
  };

  useLayoutEffect(() => {
    const title = ScreenTitle.Furniture_Replacement;
    navigation.setOptions({ title });
  }, []);

  useEffect(() => {
    getCollectionRequest();
    getstatusList();
  }, [isFocused]);

  useEffect(() => {
    if (refnumber == "") {
      getCollectionRequest();
      getstatusList();
    }
  }, [refnumber]);

  useEffect(() => {
    if (startDate.getTime() > endDate.getTime())
      setDateErrorMessage(AlertText.DateError);
    else setDateErrorMessage("");
  }, [startDate, endDate]);

  const rendercomponent = ({ item }) => {
    return (
      <>
        {permissionId.usercollectReuqest ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(Screen.Furniture_Replacment_Process, item)
            }
          >
            <DataDisplayList
              tableKey={tableKey}
              item={item}
              permissionId={permissionId}
            />
          </TouchableOpacity>
        ) : (
          <DataDisplayList
            tableKey={tableKey}
            item={item}
            permissionId={permissionId}
          />
        )}
      </>
    );
  };
  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainView}>
      {permissionId.collectionRequestList ||
      permissionId.createCollectionRequest ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={Styles.halfView}>
            <View style={Styles.searchButtonView}>
              <Text style={Styles.transactionText}>
                {constants.transactionSearch}
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
                placeholder={constants.refrenceNumber}
                placeholderTextColor={COLORS.Black}
                opacity={0.5}
                value={refnumber}
                onChangeText={(val) => setrefNumber(val)}
              />
              <TextInput
                style={Styles.dropStyle}
                placeholder={constants.emisNumber}
                placeholderTextColor={COLORS.Black}
                opacity={0.5}
                value={emisNumber}
                onChangeText={(val) => setEmisNumber(val)}
              />
            </View>
            <View style={Styles.container}>
              <Dropdown
                label={constants.status}
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
                  maximumDate={new Date()}
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
                style={Styles.eyeStyle}
                onPress={() => setCLose(true)}
              >
                <Image source={Images.Calender} style={Styles.imgStyle} />
                <DatePicker
                  modal
                  open={close}
                  date={endDate}
                  maximumDate={new Date()}
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
              <View style={Styles.dateerrorView}>
                <Text style={Styles.DateerrormessStyle}>
                  {dateErrorMessage}
                </Text>
              </View>
            ) : null}
            {organization == constants.school ? (
              <View style={Styles.plusView}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Screen.Furniture_Replacment_Process)
                  }
                  style={Styles.buttonStyle}
                >
                  <Text style={Styles.buttonText}>
                    {constants.createNewReq}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {errorMessage ? (
              <View style={Styles.errorView}>
                <Text style={Styles.errormessStyle}>{errorMessage}</Text>
              </View>
            ) : (
              <>
                {collectionList == undefined ? (
                  <>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      <ListHeader
                        tableHeader={tableHeader}
                        lenofContent="more"
                      />
                    </ScrollView>
                    <View style={Styles.noDataView}>
                      <Text style={Styles.noDataText}>
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
                      data={collectionList}
                      scrollEnabled={false}
                      renderItem={rendercomponent}
                    />
                  </ScrollView>
                )}
              </>
            )}
          </View>

          {/* {searchStatus ? ( */}
            <View style={Styles.lastView}>
              <TouchableOpacity
                onPress={searchStatus ?  onPrevious : onSearchPrevious}
                // disabled={number == 1 ? true : false}
                disabled={prevpage == null ? true : false}
              >
                {/* {number == 1 ? ( */}
                  {prevpage == null ? (
                  <Image source={Images.leftarrow} />
                ) : (
                  <Image
                    source={Images.rightarrow}
                    style={Styles.transformStyle}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={searchStatus ?  onNext : onSearchNext}
                // disabled={number == maximumNumber ? true : false}
                disabled={nextPage == null ? true : false}
              >
                {/* {number == maximumNumber ? ( */}
                  {nextPage == null ? (
                  <Image
                    source={Images.leftarrow}
                    style={Styles.transformStyle}
                  />
                ) : (
                  <Image source={Images.rightarrow} />
                )}
              </TouchableOpacity>
            </View>
           {/* ) : null} */}
          <View style={Styles.lastViewStyle} />
        </ScrollView>
      ) : (
        <View style={Styles.errrorparentView}>
          <View style={Styles.errorMsgView}>
            <Image source={Images.error} style={Styles.errIconStyle} />
            <Text style={Styles.errorMsg}>
              {constants.Error_Permission_Msg}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};
