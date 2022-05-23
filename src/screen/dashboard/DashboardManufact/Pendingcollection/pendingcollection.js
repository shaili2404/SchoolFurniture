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
  Alert,
  Platform
} from "react-native";
import Images from "../../../../asset/images";
import constants from "../../../../locales/constants";
import Styles from "./style";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { DataDisplayList } from "../../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../../component/manufacturer/ListHeaderComman";
import axios from "axios";
import endUrl from "../../../../redux/configration/endUrl";
import Loader from "../../../../component/loader";

import RNFS from "react-native-fs";
import XLSX from "xlsx";
import FileViewer from "react-native-file-viewer";

export const DashPendingCollection = () => {
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const [collectionList, setCollectionList] = useState([]);
  const [loader, setLoader] = useState(true);

  const [number, setNumber] = useState(1);
  const [prevpage, setprevpage] = useState("");
  const [nextPage, setnextpage] = useState("");

  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });

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
      .get(`${endUrl.get_pendingCollectionapi}?page=${count ? count : number}`)
      .then((res) => onsuccessapi(res))
      .catch((e) => onerrorapi(e));
  };

  useLayoutEffect(() => {
    const title = constants.dashboard;
    navigation.setOptions({ title });
  }, []);

  useEffect(() => {
    getCollectionRequest();
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

  const tableHeader = [
    constants.schoolName,
    constants.collectioncount,
    constants.dateCreated,
    constants.dateinWaiting,
  ];

  const tableKey = [
    "school_name",
    "collection_count",
    "date_created",
    "days_in_waiting",
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
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  const exportDataToExcel = async () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(collectionList);
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

    XLSX.utils.book_append_sheet(wb, ws, "Users");
    const wbout = await XLSX.write(wb, {
      type: "binary",
      bookType: "xlsx",
      compression: false,
    });
    const d = new Date();

    var path = RNFS.DocumentDirectoryPath + `/PendingCOllectionReports.xlsx`;
    RNFS.unlink(path, wbout, "ascii")
      .then(() => {})
      .catch((err) => {});
    RNFS.writeFile(path, wbout, "ascii")
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
      .catch((e) => {});
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
        } else {
        }
      } else {
        exportDataToExcel();
      }
    } catch (e) {
      return;
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.halfView}>
        <View style={Styles.searchButtonView}>
          <TouchableOpacity onPress={() =>  Platform.OS == 'android'? handleClick() :exportDataToExcel() }>
            <Text style={Styles.transactionText}>
              {constants.Status_PendingCollection}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            ListHeaderComponent={HeaderComponet}
            keyExtractor={(item) => item.id}
            data={collectionList}
            renderItem={rendercomponent}
          />
        </ScrollView>
      </View>
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
    </SafeAreaView>
  );
};
