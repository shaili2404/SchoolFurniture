import React, { useState, useEffect } from "react";
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
  const [radioParam, setRadioParam] = useState([
    { label: "Date Range", value: 0 },
    { label: "Reference Number", value: 1 },
  ]);
  const [searchValue, setSearchValue] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [close, setCLose] = useState(false);
  const [startDateStatus, setStartDateStatus] = useState(true);
  const [enddateStatus, setendDatestatus] = useState(true);
  const [number, setNumber] = useState(1);
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
    ConstKey.ref_number,
    ConstKey.category_name,
    ConstKey.count,
    ConstKey.status,
  ];

  const tableHeader = [
    constants.School,
    constants.emisNumber,
    constants.refrenceNumber,
    constants.dateCreated,
    constants.FurnitureCat,
    constants.ItemCount,
    constants.status,
  ];

  const addArray = [
    { key: ConstKey.district_office, value: constants.DistrictOffice },
    { key: ConstKey.director, value: constants.Director },
    { key: ConstKey.tel, value: constants.TelphoneNo },
    { key: ConstKey.address1, value: constants.Address1 },
    { key: ConstKey.address2, value: constants.Address2 },
    { key: ConstKey.address3, value: constants.Address3 },
    { key: ConstKey.address4, value: constants.Address4 },
    { key: ConstKey.street_code, value: constants.streetCode },
  ];

  

  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        reloadList={() => reloadList()}
        link={endUrl.schoolDistList}
        mainMessage={AlertText.deletedistrict}
        submessage={AlertText.UndoMessgae}
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

  const apicall = (count) => {
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

    let obj =
      searchValue != 0
        ? { ref_number: searchtask }
        : { start_date: strtDte, end_date: endDte };
    axios
      .post(
        `${
          searchValue != 0
            ? endUrl.searchBy_ReferenceNumber
            : endUrl.searchBy_DateRange
        }`,
        obj
      )
      .then((res) => {
        setListData(res?.data?.data?.records);
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
  };

  useEffect(() => {
    apicall();
  }, []);
  const onReset = () => {
    setSearchStatus(true);
    apicall();
    setErrorMessage("");
    setSearchTask("");
    setendDatestatus(true);
    setStartDateStatus(true);
  };

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
              onPress={(value) => setSearchValue(value)}
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
                opacity={0.5}
                value={searchtask}
                onChangeText={(val) => setSearchTask(val)}
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
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={listData}
            renderItem={rendercomponent}
          />
        </ScrollView>
      )}

      <View style={Styles.lastView}>
        <TouchableOpacity
          onPress={onPrevious}
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
          onPress={onNext}
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
