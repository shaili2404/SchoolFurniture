import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import COLORS from "../../../asset/color";
import Images from "../../../asset/images";
import Dummydata from "../../../component/dummyData/dummyData";
import { FurnitureRequestList } from "../../../component/school/furniturerequestList";
import { ListHeader } from "../../../component/school/listHeader";
import constants from "../../../locales/constants";
import Styles from "./styles";

export const FurnitureRequest = () => {
  const [dummyData, setDummyData] = useState(Dummydata);
  const rendercomponent = ({ item }) => {
    return (
      <FurnitureRequestList
        Date={item.Date}
        RefrenceNo={item.RefrenceNo}
        status={item.status}
        EmisNumber={item.EmisNumber}
        TotalFurnitureCount={item.TotalFurnitureCount}
      />
    );
  };
  const HeaderComponet = () => {
    return <ListHeader />;
  };
  // useEffect(()=>{
  //     setDummyData(Dummydata)
  //     console.log(dummyData.request)
  // },[])
  return (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.halfView}>
        <View style={Styles.searchButtonView}>
          <Text style={Styles.transactionText}>Transaction Search</Text>
          <TouchableOpacity style={Styles.searchButton}>
            <Text style={Styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.refView}>
          <TextInput
            style={Styles.refrenceStyle}
            placeholder="Refrence Number"
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
          />
        </View>
        <View style={Styles.viewInputStyle}>
          <TextInput
            style={Styles.dropStyle}
            placeholder="Status"
            placeholderTextColor={COLORS.Black}
            opacity={1}
          />
          <TouchableOpacity style={Styles.eyeStyle}>
            <Image source={Images.DownArrow} style={Styles.imgsStyle} />
          </TouchableOpacity>
          <TextInput
            style={Styles.dropStyle}
            placeholder="Start Date"
            placeholderTextColor={COLORS.Black}
            opacity={1}
          />
          <TouchableOpacity style={Styles.eyeStyle}>
            <Image source={Images.Calender} style={Styles.imgStyle} />
          </TouchableOpacity>
        </View>
        <View style={Styles.viewInputStyle}>
          <TextInput
            style={Styles.dropStyle}
            placeholder="EMIS Number"
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
          />
          <TextInput
            style={Styles.dropsStyle}
            placeholder="End Date"
            placeholderTextColor={COLORS.Black}
            opacity={1}
          />
          <TouchableOpacity style={Styles.eyeStyle}>
            <Image source={Images.Calender} style={Styles.imgStyle} />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            ListHeaderComponent={HeaderComponet}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={dummyData}
            renderItem={rendercomponent}
          />
        </ScrollView>
      </View>
      <View style={Styles.lastView}>
        <TouchableOpacity style={Styles.lastButton}>
          <Text style={Styles.lastText}>{constants.createNewReq}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
