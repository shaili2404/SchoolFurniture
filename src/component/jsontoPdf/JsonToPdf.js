import React from "react";
import RNFS from "react-native-fs";
import XLSX from "xlsx";
import FileViewer from "react-native-file-viewer";
import { Alert, PermissionsAndroid } from "react-native";

export const exportDataToExcel = async (
  searchStatus,
  collection_List,
  collectionList,
  name
) => {
  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(
    searchStatus ? collection_List : collectionList
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
    // `unlink` will throw an error, if the item to unlink does not exist
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
  name
) => {
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
        exportDataToExcel(searchStatus, collection_List, collectionList, name);
      } else {
        // Permission denied
      }
    } else {
      // Already have Permission (calling our exportDataToExcel function)
      exportDataToExcel(searchStatus, collection_List, collectionList, name);
    }
  } catch (e) {
    return;
  }
};
