import React, { useState } from "react";
import constants from "../../../locales/constants";
import styles from "./style";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Images from "../../../asset/images";
import { IconBar } from "./iconbar";
import { TaskSection } from "./TaskSection/taskSection";
import { FooterFur } from "./Footer/footer";
import { InputForm } from "./InputForm/InputForm";
import Dummydata from "../../../component/dummyData/dummyData";
import { ListHeader } from "../../../component/school/listHeader";
import { FurnitureRequestList } from "../../../component/school/furniturerequestList";

export const FurnitureReplacmentProcess = () => {
  const [data, setData] = useState(Dummydata);

  const addArray = [
    { key: "name", value: constants.School },
    { key: "emis", value: constants.schoolEmisNumber },
    { key: "district_name", value: constants.SchoolDistrict },
  ];
  const renderComponent = ({ item }) => {
    return (
      <FurnitureRequestList
        Date={item.Date}
        RefrenceNo={item.RefrenceNo}
        emis={item.emis}
        status={item.status}
        TotalFurnitureCount={item.TotalFurnitureCount}
      />
    ); 
  };
  const HeaderComponent = () => {
    return <ListHeader />;
  };
  return (
    <ScrollView contentContainerStyle={{flex:1,height:Dimensions.get('window').height}}>
    <SafeAreaView style={styles.mainView}>
    
      <View style={styles.furView}>
        <Text style={styles.furText}>
          {constants.FurnitureReplacmnetProcess}
        </Text>
      </View>
      <IconBar />
      <TaskSection
        name={constants.coolectFurnitureRequest}
        button={true}
        buttonvalue={constants.Accept}
      />

      <InputForm data={addArray} />

      <TaskSection
        name={constants.BrokenFurnitureItem}
        button={false}
        buttonvalue={constants.printPickupSLip}
      />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FlatList
          ListHeaderComponent={HeaderComponent}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderComponent}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
     <View style={styles.bottomView}>
      <FooterFur />
      </View >
      
    </SafeAreaView>
    </ScrollView>
  );
};
