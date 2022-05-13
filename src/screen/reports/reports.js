import React, { useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";

import constants from "../../locales/constants";
import Styles from "./style";
import { useNavigation } from "@react-navigation/native";

import Loader from "../../component/loader";
import Dropdown from "../../component/DropDown/dropdown";
import { ReplanishmentReports } from "./replanishmentReports";
import { DisposalReports } from "./DisposalReports";
import { ManufactStockManageReports } from "./ManufatStockManagmentReports";
import { SchoolFullFurReports } from "./SchoolFullFurCountReorts";
import { RepairmentReports } from "./RepirmentReports";
import { TransactionSummaryReports } from "./TransactionSummaryReports";
import { TransactionStatusReports } from "./TransactionStatusReports";
import { useSelector } from "react-redux";


export const Reports = () => {
  const navigation = useNavigation();
  const organization = useSelector(
    (state) => state?.loginData?.user?.data?.data?.user?.organization
  );

  const dropDownData = 
  // organization == constants.school?  [
  //   {id:0,name:constants.Replenishment_Report},
  //   {id:1,name:constants.Disposal_Report},
  //   {id:2,name:constants.Manufacturer_Stock},
  //   {id:3,name:constants.School_Furniture_Count_Report},
  //   {id:4,name:constants.Repairment_Report},
  // ] :
  [
    {id:0,name:constants.Replenishment_Report},
    {id:1,name:constants.Disposal_Report},
    {id:2,name:constants.Manufacturer_Stock},
    {id:3,name:constants.School_Furniture_Count_Report},
    {id:4,name:constants.Repairment_Report},
    {id:5,name:constants.Transactions_Summary_Report},
    {id:6,name:constants.Transactions_Status_Report},
  ]
  const [select, setSelect] = useState([]);
  const [loader, setLoader] = useState(false);
  const [dropData, setDropData] = useState(dropDownData);
  

 useEffect(()=>{
  ListShowaccDrop()
 },[select?.id])

const ListShowaccDrop =()=>{
  if (select?.id == 0) return <ReplanishmentReports/>
  else if (select?.id == 1) return <DisposalReports/>
  else if (select?.id == 2) return <ManufactStockManageReports/>
  else if (select?.id == 3) return <SchoolFullFurReports/>
  else if (select?.id == 4) return <RepairmentReports/>
  else if (select?.id == 5) return <TransactionSummaryReports/>
  else if (select?.id == 6) return <TransactionStatusReports/>
  else return <ReplanishmentReports/>

}
  useLayoutEffect(() => {
    const title = constants.Reports;
    navigation.setOptions({ title });
  }, []);



  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainsecView}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={Styles.changeView}>
            <Text style={Styles.changeText}>{constants.selReports}</Text>
          </View>
          <View style={Styles.containersup}>
            <Dropdown
              label={constants.Reports}
              data={dropData}
              onSelect={setSelect}
              task="name"
            />
          </View>
        </View>
      <ListShowaccDrop/>
      </ScrollView>
    </SafeAreaView>
  );
};
