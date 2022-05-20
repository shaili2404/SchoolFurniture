import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryBar, VictoryLabel } from "victory-native";
import { View, Text, Alert, TouchableOpacity,Platform } from "react-native";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import Loader from "../../../component/loader";
import constants from "../../../locales/constants";
import RNFS from "react-native-fs";
import XLSX from "xlsx";
import FileViewer from "react-native-file-viewer";

export const BarChart = () => {
  const [loader, setLoader] = useState(false);
  const [sampleData, setsampleData] = useState([]);
  const [exportData,setExportData] = useState([])
  const getData = () => {
    axios.get(`${endUrl.get_ytd_status}`)
      .then((res) => {
        setLoader(false);
        data = res?.data?.data;
        setsampleData([
          {
            x: 1,
            y: data?.collection_accepted,
            label: "Collection Accepted",
          },
          {
            x: 2,
            y: data?.delivery_confirmed,
            label: "Delivery collection",
          },
          {
            x: 3,
            y: data?.pending_collection,
            label: "Pending Collection",
          },
          {
            x: 4,
            y: data?.pending_delivery,
            label: "Pending Delivery",
          },
          {
            x: 5,
            y: data?.pending_repairs,
            label: "Pending Repair",
          },
          {
            x: 6,
            y: data?.pending_replenishment,
            label: "Pending Replanishment Approval",
          },
          {
            x: 7,
            y: data?.repair_completed,
            label: "Repair Completed",
          },
          {
            x: 8,
            y: data?.replenishment_approved,
            label: "Replanishment Approved",
          },
          {
            x: 9,
            y: data?.replenishment_rejected,
            label: "Replanishment Rejected",
          },
        ]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    setLoader(true);
    getData();
  }, []);

  const onbarclick = () => {
    axios.get(endUrl.ytd_status_report).then((res)=>{
     setExportData(res?.data?.data)
     Platform.OS == 'android'? handleClick() :exportDataToExcel() 
    }).catch((e)=>{
     console.log(e)
    })
  };

  const exportDataToExcel = async () => {
   
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(exportData);
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
   

    var path = RNFS.DocumentDirectoryPath + `/YtdStatusReport.xlsx`  ;
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
    <View>
      <TouchableOpacity onPress={() => onbarclick()}>
        <Text style={{ marginLeft: 20, marginTop: 40, fontWeight: "bold" }}>
          {constants.YTD_Report_Status}
        </Text>
      </TouchableOpacity>
      <VictoryChart domainPadding={{ x: 50 }} width={380} height={400}>
        <VictoryBar
          style={{ data: { fill: "#7DB4EA" } }}
          data={sampleData}
          horizontal
          labels={({ datum }) => `${datum.label}`}
          labelComponent={<VictoryLabel textAnchor={"start"} dy={-14} x={50} />}
        />
      </VictoryChart>
    </View>
  );
};
