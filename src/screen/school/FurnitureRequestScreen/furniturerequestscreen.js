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
import DatePicker from 'react-native-date-picker'
import COLORS from "../../../asset/color";
import Images from "../../../asset/images";
import Dummydata from "../../../component/dummyData/dummyData";
import { FurnitureRequestList } from "../../../component/school/furniturerequestList";
import { ListHeader } from "../../../component/school/listHeader";
import constants from "../../../locales/constants";
import Styles from "./styles";

export const FurnitureRequest = () => {
  const [dummyData, setDummyData] = useState(Dummydata);
  const [pagination, setPagination] = useState({ currentPage: 0, totalPage: 0, startIndex: 0, endIndex: 0 });
  const [startDate, setStartDate] = useState(new Date())
  const [open, setOpen] = useState(false)

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

  console.log("startDate", startDate.substring(1, 10))
  return (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.halfView}>
        <View style={Styles.searchButtonView}>
          <Text style={Styles.transactionText}>{constants.transactionSearch}</Text>
          <TouchableOpacity style={Styles.searchButton}>
            <Text style={Styles.searchText}>{constants.search}</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.refView}>
          <TextInput
            style={Styles.refrenceStyle}
            placeholder={constants.refrenceNumber}
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
          />
        </View>
        <View style={Styles.viewInputStyle}>
          <TextInput
            style={Styles.dropStyle}
            placeholder={constants.status}
            placeholderTextColor={COLORS.Black}
            opacity={1}
          />
          <TouchableOpacity style={Styles.eyeStyle}>
            <Image source={Images.DownArrow} style={Styles.imgsStyle} />
          </TouchableOpacity>
          <TextInput
            style={Styles.dropStyle}
            placeholder={constants.emisNumber}
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
          />
        </View>
        <View style={Styles.viewInputStyle}>
          <TextInput
            style={Styles.dropStyle}
            // placeholder={constants.startDate}
            placeholderTextColor={COLORS.Black}
            opacity={1}
            value={startDate}
          />
          <TouchableOpacity style={Styles.eyeStyle} onPress={() => setOpen(true)}>
            <Image source={Images.Calender} style={Styles.imgStyle} />
            <DatePicker
              modal
              open={open}
              date={startDate}
              mode="date"
              onConfirm={(date) => {
                setOpen(false)
                setStartDate(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </TouchableOpacity>
          <TextInput
            style={Styles.dropsStyle}
            placeholder={constants.endDate}
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
