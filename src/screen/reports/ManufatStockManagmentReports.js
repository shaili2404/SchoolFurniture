import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  PermissionsAndroid,
  Platform,
  Alert
} from "react-native";
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

export const ManufactStockManageReports = () => {
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const [collectionList, setCollectionList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [dropData, setDropData] = useState([]);
  const [stockItem, setStockItem] = useState([]);
  const [select, setSelect] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchStatus, setSearchStatus] = useState(true);
  const [number, setNumber] = useState(1);
  const [modalloader, setmodalloader] = useState(false);
  const [prevpage, setprevpage] = useState("");
  const [nextPage, setnextpage] = useState("");
  const [collection_List, setCollection_List] = useState([]);

  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });

  const onsearch = () => {
    setSearchStatus(false);
    if (select?.id == null && stockItem?.id == null)
      setErrorMessage(constants.enterSearchData);
    else {
      let str = "";
      if (select?.id) str += `category=${select?.id}&&`;
      if (stockItem?.id) str += `item=${stockItem?.id}&&`;
      setmodalloader(true);

      axios
        .post(`${endUrl.reports_manufacturer_stock_management_report}?${str}`)
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
      .post(
        `${endUrl.reports_manufacturer_stock_management_report}?page=${
          count ? count : number
        }`
      )
      .then((res) => onsuccessapi(res))
      .catch((e) => onerrorapi(e));
  };
  const getallData = () => {
    setLoader(true);
    axios
      .post(`${endUrl.reports_manufacturer_stock_management_report}?all=true`)
      .then((res) =>{
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

  useLayoutEffect(() => {
    const title = constants.Reports;
    navigation.setOptions({ title });
  }, []);

  useEffect(() => {
    getCollectionRequest();
    getfurcategory();
    getfuritem();
    getallData()
  }, [isFocused]);

  const onNext = () => {
    let count = number + 1;
    setLoader(true);
    setNumber(number + 1);
    getCollectionRequest(count);
    setLoader(false);
    getallData()
  };

  const onPrevious = () => {
    let count = number - 1;
    setLoader(true);
    setNumber(number - 1);
    getCollectionRequest(count);
    setLoader(false);
    getallData()
  };

  const onReset = () => {
    setSearchStatus(true);
    setErrorMessage("");
    getCollectionRequest();
    setNumber(1);
    setSelect({});
    setStockItem({});
    getfurcategory();
    getfuritem();
    getallData()
  };

  const tableHeader = [constants.FurCategory, constants.furItem];

  const tableKey = ["furniture_category", "furniture_item"];
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
 console.log('185',collection_List)
   
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(searchStatus ? collection_List : collectionList);
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

    // ws["!rows"] = [
    //   { hpt: 50 },
    //   { hpt: 50 },
    //   { hpt: 50 },
    //   { hpt: 50 },
    //   { hpt: 50 },
    //   { hpt: 50 },
    //   { hpt: 50 },
    //   { hpt: 50 },
    //   { hpt: 50 },
    //   { hpt: 50 },
    // ];
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    const wbout = await XLSX.write(wb, {
      type: "binary",
      bookType: "xlsx",
      compression: false,
    });
    const d = new Date();
   

    var path = RNFS.DocumentDirectoryPath + `/stockreports.xlsx`;

    RNFS.unlink(path, wbout, "ascii")
    .then(() => {
      console.log("FILE DELETED");
    })
    .catch((err) => {
      console.log(err.message);
    });

    RNFS.writeFile(path,wbout, 'ascii')
      .then((res) => {
        Alert.alert(
          "Successfully Exported",
          "Path:" + path,
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open", onPress: () => openfile(path) },
          ],
          { cancelable: true }
        );
      })
      .catch((e) => {
        console.log("Error", e);
      });
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
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (!isPermitedExternalStorage) {
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
          exportDataToExcel();
          console.log("Permission granted");
        } else {
          // Permission denied
          console.log("Permission denied");
        }
      } else {
        exportDataToExcel();
      }
    } catch (e) {
      console.log("Error while checking permission");
      console.log(e);
      return;
    }
  };

  const setCategoryValue = (item) => {
    setSelect(item);
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
        <View style={Styles.containerManu}>
          <Dropdown
            label={constants.FurCategory}
            data={dropData}
            onSelect={(item) => setCategoryValue(item)}
            task="name"
          />
        </View>
        <View style={Styles.containerfurcat}>
          <Dropdown
            label={constants.Furnitureitems}
            data={stockItem}
            onSelect={setStockItem}
            task="name"
          />
        </View>
        <View style={Styles.downloadButtonView}>
          <Text style={Styles.transactionText}>{constants.exportreports}</Text>
          <TouchableOpacity
            style={Styles.downloadButton}
            onPress={() => Platform.OS == 'android'? handleClick() :exportDataToExcel() }
          >
            <Text style={Styles.searchText}>
              {constants.download}
            </Text>
          </TouchableOpacity>
        </View>
       
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
