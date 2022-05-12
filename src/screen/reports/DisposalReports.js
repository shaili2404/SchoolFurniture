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
  PermissionsAndroid,
  Platform,
} from "react-native";
import COLORS from "../../asset/color";
import DatePicker from "react-native-date-picker";
import Images from "../../asset/images";
import constants from "../../locales/constants";
import Styles from "./style";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { DataDisplayList } from "../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../component/manufacturer/ListHeaderComman";
import { useSelector } from "react-redux";
import axios from "axios";
import endUrl from "../../redux/configration/endUrl";
import Loader from "../../component/loader";
import Dropdown from "../../component/DropDown/dropdown";
import AlertText from "../../Alert/AlertText";
import ModalLoader from "../../component/ModalLoader";
import RNFS from "react-native-fs";
import XLSX from "xlsx";
import FileViewer from "react-native-file-viewer";

export const DisposalReports = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [close, setCLose] = useState(false);
  const [open, setOpen] = useState(false);
  const [collectionList, setCollectionList] = useState([]);
  const [collection_List, setCollection_List] = useState([]);
  const [loader, setLoader] = useState(true);
  const [dropData, setDropData] = useState([]);
  const [select, setSelect] = useState([]);
  const [selectdist, setSelectdist] = useState([]);
  const [refnumber, setrefNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [dateErrorMessage, setDateErrorMessage] = useState("");
  const [startDateStatus, setStartDateStatus] = useState(true);
  const [enddateStatus, setendDatestatus] = useState(true);
  const [searchStatus, setSearchStatus] = useState(true);
  const [number, setNumber] = useState(1);
  const [distList, setDistList] = useState([]);
  const [modalloader, setmodalloader] = useState(false);
  const [prevpage, setprevpage] = useState("");
  const [nextPage, setnextpage] = useState("");

  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });

  const getDistrictList = async () => {
    axios
      .get(`${endUrl.schoolDistList}?all=true`)
      .then((res) => {
        setDistList(res?.data?.data?.records);
      })
      .catch((e) => {});
  };
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
    if (
      select?.id == null &&
      selectdist?.id == null &&
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
      if (!validation(refnumber)) str += `school_name=${refnumber}&&`;
      if (startDateStatus == false) str += `start_date=${strtDte}&&`;
      if (enddateStatus == false) str += `end_date=${endDte}&&`;
      if (select?.id) str += `category_id=${select?.id}&&`;
      if (selectdist?.id) str += `district_office=${selectdist?.id}&&`;
      setmodalloader(true);
      axios
        .post(`${endUrl.reports_DisposalReports}?${str}`)
        .then((res) => {
          setCollectionList(res?.data?.data?.records);
          setmodalloader(false);
        })
        .catch((e) => {
          setmodalloader(false);
          setErrorMessage(e?.response?.data?.message);
        });
    }
  };

  const onsuccessapi = (res) => {
    setprevpage(res?.data?.data?.previous_page);
    setnextpage(res?.data?.data?.next_page);
    setCollectionList(res?.data?.data?.records);
    setLoader(false);
  };

  const onerrorapi = (e) => {
    setLoader(false);
  };

  const getCollectionRequest = (count) => {
    setLoader(true);
    axios
      .post(`${endUrl.reports_DisposalReports}?page=${count ? count : number}`)
      .then((res) => onsuccessapi(res))
      .catch((e) => onerrorapi(e));
  };
  const getallData = () => {
    setLoader(true);
    axios
      .post(`${endUrl.reports_DisposalReports}?all=true`)
      .then((res) => {
        setCollection_List(res?.data?.data?.records);
        setLoader(false);
      })
      .catch((e) => onerrorapi(e));
  };

  const getfurcategory = () => {
    setLoader(true);
    axios
      .get(`${endUrl.stockCategoryList}?all=true`)
      .then((res) => setDropData(res?.data?.data?.records))
      .catch((e) => {});
  };

  useLayoutEffect(() => {
    const title = constants.Reports;
    navigation.setOptions({ title });
  }, []);

  useEffect(() => {
    getCollectionRequest();
    getfurcategory();
    getDistrictList();
    getallData();
  }, [isFocused]);

  const onNext = () => {
    let count = number + 1;
    setLoader(true);
    setNumber(number + 1);
    getCollectionRequest(count);
    setLoader(false);
    getallData();
  };

  const onPrevious = () => {
    let count = number - 1;
    setLoader(true);
    setNumber(number - 1);
    getCollectionRequest(count);
    setLoader(false);
    getallData();
  };

  const onReset = () => {
    setSearchStatus(true);
    setrefNumber("");
    setStartDateStatus(true);
    setendDatestatus(true);
    setErrorMessage("");
    setDateErrorMessage("");
    getCollectionRequest();
    setNumber(1);
    setSelect({});
    setDistList({});
    getDistrictList();
    getfurcategory();
    getallData();
  };

  const tableHeader = [
    constants.schoolName,
    constants.schoolEmisNumber,
    constants.DistrictOffice,
    constants.ReplanishmentReports_trancRefNo,
    constants.ReplanishmentReports_tranRefDate,
    constants.FurnitureCat,
    constants.DisposalReports_DisposalCount,
    constants.ReplanishmentReports_TotalPerSchool,
  ];

  const tableKey = [
    "school_name",
    "school_emis",
    "district_office",
    "ref_number",
    "transaction_date",
    "furniture_category",
    "replenishment_count",
    "total_per_school",
  ];
  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        tableKey={tableKey}
        item={item}
        permissionId={permissionId}
      />
    );
  };
  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} lenofContent={"more"} />;
  };
  const exportDataToExcel = async () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(
      searchStatus ? collectionList : collection_List
    );

    ws["!cols"] = [
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
      { width: 30 },
    ];

    ws["!rows"] = [
      { hpt: 50 },
      { hpt: 50 },
      { hpt: 50 },
      { hpt: 50 },
      { hpt: 50 },
      { hpt: 50 },
      { hpt: 50 },
      { hpt: 50 },
      { hpt: 50 },
      { hpt: 50 },
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Users");
    const wbout = await XLSX.write(wb, {
      type: "binary",
      bookType: "xlsx",
      compression: false,
    });

    var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    var random_name = "ReplanishmentReports"+timestamp ;
    console.log( String(timestamp));

    var path = RNFS.DocumentDirectoryPath + `/ReplanishmentReports.xlsx`;
    RNFS.writeFile(path, wbout, "ascii")
      .then((res) => {})
      .catch((e) => {
        console.log("Error", e);
      });
    openfile(path);
  };

  const openfile = async (path) => {
    await FileViewer.open(path)
      .then((r) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (!isPermitedExternalStorage) {
        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage permission needed",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          exportDataToExcel();
          console.log("Permission granted");
        } else {
          // Permission denied
          console.log("Permission denied");
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        exportDataToExcel();
      }
    } catch (e) {
      console.log("Error while checking permission");
      console.log(e);
      return;
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainView}>
      <View>
        <View style={Styles.changeView}>
          <Text style={Styles.changeText}>{constants.selReports}</Text>
        </View>
      </View>
      <View style={Styles.halfView}>
        <View style={Styles.searchButtonView}>
          <Text style={Styles.transactionText}>{constants.Filter}</Text>
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
              data={distList}
              onSelect={setSelectdist}
              task="district_office"
            />
          </View>
        </View>
        <View style={Styles.container}>
          <Dropdown
            label={constants.FurnitureCat}
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
        <View style={Styles.downloadButtonView}>
          <Text style={Styles.transactionText}>{constants.exportreports}</Text>
          <TouchableOpacity
            style={Styles.downloadButton}
            onPress={() =>
              Platform.OS == "android" ? handleClick() : exportDataToExcel()
            }
          >
            <Text style={Styles.searchText}>{constants.download}</Text>
          </TouchableOpacity>
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList
              ListHeaderComponent={HeaderComponet}
              keyExtractor={(item) => item.id}
              data={collectionList}
              renderItem={rendercomponent}
            />
          </ScrollView>
        )}
      </View>
      {searchStatus ? (
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
      ) : null}
      {modalloader ? <ModalLoader visible={modalloader} /> : null}
    </SafeAreaView>
  );
};