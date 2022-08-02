import React, { useState, useEffect, useCallback } from "react";
import Styles from "../maintenance/SchoolMaintenance/SchoolDistrict/style";
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
import COLORS from "../../../asset/color";
import Images from "../../../asset/images";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import constants from "../../../locales/constants";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import { DataDisplayList } from "../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../component/manufacturer/ListHeaderComman";
import Loader from "../../../component/loader";
import AlertText from "../../../Alert/AlertText";
import DatePicker from "react-native-date-picker";
import ConstKey from "../../../locales/ApikeyConst";

export const Search = () => {
  const [listData, setListData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const radioParam = [
    { label: "Date Range", value: 0 },
    { label: "Reference Number", value: 1 },
  ];
  const [searchValue, setSearchValue] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [close, setCLose] = useState(false);
  const [startDateStatus, setStartDateStatus] = useState(true);
  const [enddateStatus, setendDatestatus] = useState(true);
  const [number, setNumber] = useState(1);
  const [searchNumber, setSearchNumber] = useState(1);
  const [prevpage, setprevpage] = useState("");
  const [nextPage, setnextpage] = useState("");
  const [permissionId, setPermissionId] = useState({
    userList: false,
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [searchStatus, setSearchStatus] = useState(true);

  const tableKey = [
    ConstKey.school_name,
    ConstKey.emis,
    ConstKey.ref_number,
    ConstKey.created_at,
    ConstKey.category_name,
    ConstKey.item_name,
    ConstKey.count,
    ConstKey.status,
  ];

  const tableHeader = [
    constants.School,
    constants.emisNumber,
    constants.refrenceNumber,
    constants.dateCreated,
    constants.FurnitureCat,
    constants.furItem,
    constants.ItemCount,
    constants.status,
  ];

  // render component of flat list
  const rendercomponent = useCallback(({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        permissionId={permissionId}
      />
    );
  },[listData])
  // header component of flatlist
  const HeaderComponet = useCallback(() => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  },[listData])

  const apicall = useCallback((count) => {
    setLoader(true);
    axios
      .get(`${endUrl.get_search_list}?page=${count ? count : number}`)
      .then((res) => {
        setprevpage(res?.data?.data?.previous_page);
        setnextpage(res?.data?.data?.next_page);
        setListData(res?.data?.data?.records);
        setLoader(false);
      })
      .catch((e) => setLoader(false));
  },[listData])
  // on next button clicked
  const onNext = () => {
    let count = number + 1;
    setLoader(true);
    setNumber(number + 1);
    apicall(count);
    setLoader(false);
  };
  // on prevxious button clicked
  const onPrevious = () => {
    let count = number - 1;
    setLoader(true);
    setNumber(number - 1);
    apicall(count);
    setLoader(false);
  };

  
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


  // on search button clicked
  const onsearch = async (count) => {
    setSearchStatus(false);
    let strtDte =
      startDateStatus == false
        ? `${startDate?.getFullYear()}-${
            startDate?.getMonth() + 1
          }-${startDate?.getDate()}`
        : "";
    let endDte =
      enddateStatus == false
        ? `${endDate?.getFullYear()}-${
            endDate?.getMonth() + 1
          }-${endDate.getDate()}`
        : "";

    if (
      startDateStatus == true &&
      enddateStatus == true && searchValue == 0
    )
      setErrorMessage(constants.enterSearchData);
      else if (startDateStatus == true &&
        enddateStatus == false  && searchValue == 0)
        setErrorMessage(constants.startDateIsRequired);
      else if (searchtask == ''&& searchValue != 0)
      setErrorMessage(constants.enterSearchData);
    else {
      let strtDte = `${startDate?.getFullYear()}-${
        startDate?.getMonth() + 1
      }-${startDate?.getDate()}`;
      let endDte = `${endDate?.getFullYear()}-${
        endDate?.getMonth() + 1
      }-${endDate.getDate()}`;

        let str = "";
      if (startDateStatus == false)
        str += `${ConstKey.start_date}=${strtDte}&&`;
      if (enddateStatus == false) str += `${ConstKey.end_date}=${endDte}&&`;

    let obj =
      searchValue != 0
        ? { ref_number: searchtask }
        : { start_date: strtDte, end_date: endDte };
    
    axios
      .post(
        `${
          searchValue != 0
            ? `${endUrl.searchBy_ReferenceNumber}?page=${count ? count : searchNumber}`
            : `${endUrl.searchBy_DateRange}?${str}&search=true&page=${count ? count : searchNumber}`
        }`,
        obj
      )
      .then((res) => {
        setListData(res?.data?.data?.records);
        setprevpage(res?.data?.data?.previous_page);
        setnextpage(res?.data?.data?.next_page);
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
  // get data list

  {
    console.log("11334",nextPage);
  }

  useEffect(() => {
    apicall();
  }, []);

 
// on reset button clicked
const onReset = () => {
  setSearchValue(0);
  setSearchStatus(true);
  apicall();
  setSearchTask("");
  setErrorMessage("");
  setendDatestatus(true);
  setStartDateStatus(true);
  setEndDate(new Date());
  setStartDate(new Date())
  setNumber(1)
  setSearchNumber(1)
};


  const getSearcData = (value)=>{
    setSearchTask(value)
  }

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainView}>
      <View style={styles.radioView}>
        <View>
          <Text style={styles.selectSearchText}>
            {constants.selectSearchOption}
          </Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.radioDate}>
          <View style={styles.radView}>
            <RadioForm
              radio_props={radioParam}
              initial={0}
              formHorizontal={true}
              buttonSize={10}
              buttonColor={"#48A448"}
              selectedButtonColor={"#359934"}
              buttonWrapStyle={{ paddingLeft: 50 }}
              radioStyle={{ paddingRight: 40 }}
              labelStyle={{ fontSize: 16, color: "#000000" }}
              onPress={(value) => 
                setSearchValue(value)}
            />
          </View>
          {searchValue == 0 ? (
            // Search by Date Range
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
                  maximumDate={new Date()}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </TouchableOpacity>
              <View style={styles.dropStyle}>
                <Text style={styles.textStyle}>
                  {enddateStatus
                    ? "End Date"
                    : `${endDate?.getDate()}/${
                        endDate?.getMonth() + 1
                      }/${endDate?.getFullYear()}`}
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
                  date={endDate}
                  mode="date"
                  onConfirm={(date) => {
                    setCLose(false);
                    setEndDate(date);
                    setendDatestatus(false);
                  }}
                  maximumDate={new Date()}
                  onCancel={() => {
                    setCLose(false);
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {/* Search by reference number  */}
              <TextInput
                style={styles.refrenceStyle}
                placeholder={constants.referenceNumber}
                placeholderTextColor={COLORS.Black}
                value={searchtask}
                onChangeText={(value) => getSearcData(value)}
              />
            </View>
          )}
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={searchStatus ? onsearch : onReset}
          >
            <Text style={styles.buttonText}>
              {searchStatus ? constants.search : constants.Reset}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {errorMessage ? (
        <View style={Styles.errorView}>
          <Text style={Styles.errormessStyle}>{errorMessage}</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.radView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <FlatList
            ListHeaderComponent={HeaderComponet}
            keyExtractor={(item, index) => index.toString()}
            data={listData}
            renderItem={rendercomponent}
          />
        </ScrollView>
      )}

      <View style={Styles.lastView}>
        <TouchableOpacity
          onPress={
            searchStatus ?  onPrevious : onSearchPrevious
            }
          disabled={prevpage == null ? true : false}
        >
          {prevpage == null ? (
            <Image source={Images.leftarrow} />
          ) : (
            <Image
              source={Images.rightarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={searchStatus ?  onNext : onSearchNext}
          disabled={nextPage == null ? true : false}
        >
          {nextPage == null ? (
            <Image
              source={Images.leftarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          ) : (
            <Image source={Images.rightarrow} />
          )}
        </TouchableOpacity>
      </View>
      <View style={{ height: 70 }} />
    </SafeAreaView>
  );
};
