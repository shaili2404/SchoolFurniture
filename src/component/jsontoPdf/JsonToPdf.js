import React from "react";
import RNFS from "react-native-fs";
import XLSX from "xlsx";
import FileViewer from "react-native-file-viewer";
import { Alert, PermissionsAndroid } from "react-native";
import constants from "../../locales/constants";

export const exportDataToExcel = async (
  searchStatus,
  collection_List,
  collectionList,
  name,
  headersTitle
) => {
  const headerColumns = [headersTitle];
  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(
    searchStatus ? collection_List : collectionList,
    { origin: "A2", skipHeader: true }
  );
 
  XLSX.utils.sheet_add_aoa(ws, headerColumns, { origin: "A1" });
  // ws["A1"].s = {font: {
  //   bold: true,
  //   }}
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

  var path = RNFS.DocumentDirectoryPath + `/${name}.xlsx`;
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
    .catch((error) => {});
};

export const handleClick = async (
  searchStatus,
  collection_List,
  collectionList,
  name,
  headersTitle
) => {
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
        exportDataToExcel(
          searchStatus,
          collection_List,
          collectionList,
          name,
          headersTitle
        );
      } else {
      }
    } else {
      exportDataToExcel(
        searchStatus,
        collection_List,
        collectionList,
        name,
        headersTitle
      );
    }
  } catch (e) {
    return;
  }
};
