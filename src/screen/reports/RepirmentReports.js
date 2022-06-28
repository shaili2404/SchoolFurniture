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
import axios from "axios";
import endUrl from "../../redux/configration/endUrl";
import Loader from "../../component/loader";
import Dropdown from "../../component/DropDown/dropdown";
import AlertText from "../../Alert/AlertText";
import ModalLoader from "../../component/ModalLoader";
import {
  exportDataToExcel,
  handleClick,
} from "../../component/jsontoPdf/JsonToPdf";
import ConstKey from "../../locales/ApikeyConst";

export const RepairmentReports = () => {
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
  const [errorMessage, setErrorMessage] = useState("");
  const [dateErrorMessage, setDateErrorMessage] = useState("");
  const [startDateStatus, setStartDateStatus] = useState(true);
  const [enddateStatus, setendDatestatus] = useState(true);
  const [searchStatus, setSearchStatus] = useState(true);
  const [number, setNumber] = useState(1);
  const [distList, setDistList] = useState([]);
  const [stockItem, setStockItem] = useState([]);
  const [fur_select, setfur_Select] = useState([]);
  const [furItem_select, setfurItem_Select] = useState([]);
  const [modalloader, setmodalloader] = useState(false);
  const [prevpage, setprevpage] = useState("");
  const [nextPage, setnextpage] = useState("");
  const [collection_List, setCollection_List] = useState([]);

  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });

  const tableHeader = [
    constants.schoolName,
    constants.schoolEmisNumber,
    constants.DistrictOffice,
    constants.ReplanishmentReports_trancRefNo,
    constants.ReplanishmentReports_tranRefDate,
    constants.FurnitureCat,
    constants.furItem,
    constants.RepairReports_Count,
    constants.furniture_full_count,
  ];

  const tableKey = [
    ConstKey.school_name,
    ConstKey.school_emis,
    ConstKey.district_office,
    ConstKey.ref_number,
    ConstKey.transaction_date,
    ConstKey.furniture_category,
    ConstKey.furniture_item,
    ConstKey.repaired_count,
    ConstKey.total_per_school,
  ];

  // Getting If StartDate Is Greater Than EndDate
  useEffect(() => {
    if (startDate.getTime() > endDate.getTime())
      setDateErrorMessage(AlertText.DateError);
    else setDateErrorMessage("");
  }, [startDate, endDate]);

  // Setting Title Of header
  useLayoutEffect(() => {
    const title = constants.Reports;
    navigation.setOptions({ title });
  }, []);

  // Getting ALl The List
  useEffect(() => {
    getCollectionRequest();
    getfurcategory();
    getfuritem();
    getDistrictList();
    getallData();
  }, [isFocused]);

  // Geting Validate Input Field
  const validation = (value) => {
    return value == "" || value == undefined || value == null;
  };

  // On Search Button Clicked
  const onsearch = () => {
    setSearchStatus(false);
    if (
      select?.id == null &&
      fur_select?.id == null &&
      furItem_select?.id == null &&
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
      if (!validation(refnumber))
        str += `${ConstKey.school_name}=${refnumber}&&`;
      if (startDateStatus == false)
        str += `${ConstKey.start_date}=${strtDte}&&`;
      if (enddateStatus == false) str += `${ConstKey.end_date}=${endDte}&&`;
      if (select?.id) str += `${ConstKey.district_office}=${select?.id}&&`;
      if (fur_select?.id) str += `${ConstKey.category_id}=${fur_select?.id}&&`;
      if (furItem_select?.id)
        str += `${ConstKey.item_id}=${furItem_select?.id}&&`;
      setmodalloader(true);
      axios
        .post(`${endUrl.reports_repairment_report}?${str}`)
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

  // On Success OF Getting in Data List
  const onsuccessapi = (res) => {
    setCollectionList(res?.data?.data?.records);
    setprevpage(res?.data?.data?.previous_page);
    setnextpage(res?.data?.data?.next_page);
    setLoader(false);
  };
  // On Error  OF Getting in Data List
  const onerrorapi = (e) => {
    setCollectionList(undefined);
    setLoader(false);
  };

  // Getting Data List According To Pagination
  const getCollectionRequest = (count) => {
    setLoader(true);
    axios
      .post(
        `${endUrl.reports_repairment_report}?page=${count ? count : number}`
      )
      .then((res) => onsuccessapi(res))
      .catch((e) => onerrorapi(e));
  };

  // Getting All Data
  const getallData = () => {
    setLoader(true);
    axios
      .post(`${endUrl.reports_repairment_report}?all=true`)
      .then((res) => {
        setCollection_List(res?.data?.data?.records);
        setLoader(false);
      })
      .catch((e) => onerrorapi(e));
  };

  // Getting School District List
  const getDistrictList = async () => {
    axios
      .get(`${endUrl.schoolDistList}?all=true`)
      .then((res) => {
        setDistList(res?.data?.data?.records);
      })
      .catch((e) => {});
  };

  // Getting Furniture Category
  const getfurcategory = () => {
    setLoader(true);
    axios
      .get(`${endUrl.stockCategoryList}?all=true`)
      .then((res) => setDropData(res?.data?.data?.records))
      .catch((e) => {});
  };

  // Getting Furiture Item
  const getfuritem = (id) => {
    axios
      .get(`${endUrl.categoryWiseItem}/${id}/edit`)
      .then((res) => {
        setStockItem(res?.data?.data);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  // On RIght Arrow Clicked
  const onNext = () => {
    let count = number + 1;
    setLoader(true);
    setNumber(number + 1);
    getCollectionRequest(count);
    setLoader(false);
    getallData();
  };

  // On Left Arrow Clicked
  const onPrevious = () => {
    let count = number - 1;
    setLoader(true);
    setNumber(number - 1);
    getCollectionRequest(count);
    setLoader(false);
    getallData();
  };

  // On Reset Button Clicked
  const onReset = () => {
    setSearchStatus(true);
    setrefNumber("");
    setStartDateStatus(true);
    setendDatestatus(true);
    setErrorMessage("");
    setDateErrorMessage("");
    getCollectionRequest();
    setNumber(1);
    getDistrictList();
    getfurcategory();
    getfuritem();
    setSelect({});
    setfur_Select({});
    setfurItem_Select({});
    getallData();
  };

  // Render Component Of FlatList
  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        tableKey={tableKey}
        item={item}
        permissionId={permissionId}
      />
    );
  };

  // Header Component Of FlatList
  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} lenofContent={"more"} />;
  };
  // On Set On select From DropDown
  const setCategoryValue = (item) => {
    setfur_Select(item);
    getfuritem(item?.id);
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
              onSelect={setSelect}
              task={ConstKey.district_office}
            />
          </View>
        </View>
        <View style={Styles.container}>
          <Dropdown
            label={constants.FurnitureCat}
            data={dropData}
            onSelect={(item) => setCategoryValue(item)}
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
            style={Styles.eyeStyles}
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
        <View style={Styles.containerfurcat}>
          <Dropdown
            label={constants.Furnitureitems}
            data={stockItem}
            onSelect={setfurItem_Select}
            task="name"
          />
        </View>
        {collectionList == undefined ? null : (
          <View style={Styles.downloadButtonView}>
            <Text style={Styles.transactionText}>
              {constants.exportreports}
            </Text>
            <TouchableOpacity
              style={
                errorMessage ? Styles.downloadButtonopac : Styles.downloadButton
              }
              disabled={errorMessage ? true : false}
              onPress={() =>
                Platform.OS == "android"
                  ? handleClick(
                      searchStatus,
                      collection_List,
                      collectionList,
                      "RepairmentReports",
                      tableHeader
                    )
                  : exportDataToExcel(
                      searchStatus,
                      collection_List,
                      collectionList,
                      "RepairmentReports",
                      tableHeader
                    )
              }
            >
              <Text style={Styles.searchText}>{constants.download}</Text>
            </TouchableOpacity>
          </View>
        )}

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
          <>
            {collectionList == undefined ? (
              <>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <ListHeaderComman
                    tableHeader={tableHeader}
                    lenofContent="more"
                  />
                </ScrollView>
                <View style={Styles.noDataView}>
                  <Text style={Styles.noDataText}>
                    {constants.No_Transactions_Found}
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
                  renderItem={rendercomponent}
                  scrollEnabled={false}
                />
              </ScrollView>
            )}
          </>
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
              <Image source={Images.rightarrow} style={Styles.TransformStyle} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onNext}
            disabled={nextPage == null ? true : false}
          >
            {nextPage == null ? (
              <Image source={Images.leftarrow} style={Styles.TransformStyle} />
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
