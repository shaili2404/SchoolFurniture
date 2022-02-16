import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import COLORS from "../../asset/color";
import Images from "../../asset/images";
import Dummydata from "../../component/dummyData";
import { FurnitureRequestList } from "../../component/school/furniturerequestList";
import { ListHeader } from "../../component/school/listHeader";

export const FurnitureRequest = () => {
  const [dummyData, setDummyData] = useState(Dummydata);
  console.log(dummyData);
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
          <Text style={Styles.lastText}>+ Create New Request</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const Styles = StyleSheet.create({
  mainView: {
    hiegth: height,
  },
  halfView: {
    backgroundColor: COLORS.LightGreen,

    width: width,
  },
  searchButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    width: width - 20,
    paddingEnd: 20,
  },
  refView: {
    marginHorizontal: 20,
    width: width - 20,
    paddingEnd: 20,
  },
  transactionText: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "normal",
    marginTop: 20,
  },
  searchButton: {
    backgroundColor: COLORS.GreenBox,
    borderRadius: 5,
    width: 70,
    height: 30,
    alignSelf: "flex-end",
    paddingTop: 5,
    marginTop: 15,
  },
  searchText: {
    color: COLORS.White,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "normal",
    fontSize: 16,
  },
  refrenceStyle: {
    backgroundColor: COLORS.White,
    width: "100%",
    height: 40,
    paddingLeft: 20,
    marginTop: 15,
  },
  viewInputStyle: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    marginHorizontal: 20,
    width: width - 20,
    paddingEnd: 20,
  },
  dropStyle: {
    backgroundColor: COLORS.White,
    width: "45%",
    height: 40,
    paddingLeft: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  dropsStyle: {
    backgroundColor: COLORS.White,
    width: "45%",
    height: 40,
    marginLeft:20,
    paddingLeft: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  flatlistBackground: {
    backgroundColor: COLORS.LightGreen,
    flex: 1,
  },
  lastView: {
    marginHorizontal: 20,
    width: width - 20,
    paddingEnd: 20,
    paddingTop: 10,
  },
  lastText: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.ThemeGreen,
  },
  lastButton: {
    width: 342,
    height: 78,
    borderColor: COLORS.borderGreen,
    borderWidth: 1.5,
    borderRadius: 5,
    paddingVertical: 20,
  },
  eyeStyle: {
    position: "relative",
    top: 20,
    right: 30,
  },
  imgStyle: {
    width: 20,
  },
  imgsStyle: {
    width: 20,
    height:10
  },
});
