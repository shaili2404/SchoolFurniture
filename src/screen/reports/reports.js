import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView

 
} from "react-native";

import constants from "../../locales/constants";
import Styles from "./style";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import Loader from "../../component/loader";
import Dropdown from "../../component/DropDown/dropdown";
import { ReplanishmentReports } from "./replanishmentReports";


export const Reports = () => {
 
  const navigation = useNavigation();
const [select,setSelect] = useState([])
  const [loader, setLoader] = useState(false);
  const [dropData, setDropData] = useState([]);


  useLayoutEffect(() => {
    const title = constants.Reports;
    navigation.setOptions({ title });
  }, []);


 

 


  return loader ? (
    <Loader />
  ) : (
   
      <SafeAreaView style={Styles.mainView}>
                 <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

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
        <ReplanishmentReports/>
       
     </ScrollView>
    
      </SafeAreaView>
 
  );
};
