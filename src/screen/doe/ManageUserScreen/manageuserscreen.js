import React, { useState } from "react";
import Styles from "./style";
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
import { FurnitureRequestList } from "../../../component/school/furniturerequestList";

import constants from "../../../locales/constants";
import Dummydatauser from "../../../component/dummyData/DummyDatauser";
import { DataDisplayList } from "../../../component/doe/displayListComman";
import { ListHeader } from "../../../component/doe/ListHeaderComman";
export const ManageUserDoe = () => {
  const [dummyData, setDummyData] = useState(Dummydatauser);
  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        Value1={item.Name}
        Value2={item.Surname}
        Value3={item.Username}
        Value4={item.Emailid}
        Value5={item.Organisation}
      />
    );
  };
  const HeaderComponet = () => {
    return (
      <ListHeader
        HeaderTag1={"Name"}
        HeaderTag2={"Surname"}
        HeaderTag3={"username"}
        HeaderTag4={"emaild Id"}
        HeaderTag5={"Organisation"}
      />
    );
  };
  // useEffect(()=>{
  //     setDummyData(Dummydata)
  //     console.log(dummyData.request)
  // },[])
  return (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.halfView}>
        <View>
          <TouchableOpacity style={Styles.eyeStyle}>
            <Image source={Images.SearchIcon} style={Styles.imgsStyle} />
          </TouchableOpacity>
          <TextInput
            style={Styles.refrenceStyle}
            placeholder={constants.searchText}
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
          />
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            ListHeaderComponent={HeaderComponet}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            data={dummyData}
            // horizontal
            // pagingEnabled={true}
            renderItem={rendercomponent}
          />
        </ScrollView>
      </View>
      <View style={Styles.lastView}>
        <TouchableOpacity>
          <Image source={Images.leftarrow} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Images.rightarrow} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
