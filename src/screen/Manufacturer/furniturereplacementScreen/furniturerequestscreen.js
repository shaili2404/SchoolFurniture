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
import DatePicker from "react-native-date-picker";
import Images from "../../../asset/images";
import Dummydata from "../../../component/dummyData/dummyData";
import { FurnitureRequestList } from "../../../component/school/furniturerequestList";
import { ListHeader } from "../../../component/school/listHeader";
import constants from "../../../locales/constants";
import Styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export const FurnitureReplacmentManfacturer = () => {
  const [dummyData, setDummyData] = useState(Dummydata);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPage: 0,
    startIndex: 0,
    endIndex: 0,
  });
  const navigation = useNavigation()
  const [startDate, setStartDate] = useState(new Date());
  const [endData, setEndDate] = useState(new Date());
  const [close, setCLose] = useState(false);
  const [open, setOpen] = useState(false);

  const initialPagination = (list) => {
    const len = list.length;
    const totalPage = Math.ceil(len / PAGESIZE);
    setPagination({
      currentPage: 1,
      totalPage: totalPage,
      startIndex: 0,
      endIndex: len > PAGESIZE ? PAGESIZE : len,
    });
  };

  const onNext = () => {
    let { currentPage, totalPage } = pagination;
    if (currentPage === totalPage) {
      return;
    }
    setPagination((prevState) => {
      return {
        ...prevState,
        currentPage: currentPage + 1,
        startIndex: currentPage * PAGESIZE,
        endIndex:
          (currentPage + 1) * PAGESIZE > listData.length
            ? listData.length
            : (currentPage + 1) * PAGESIZE,
      };
    });
  };
  const onPrevious = () => {
    let { currentPage } = pagination;
    if (currentPage === 1) {
      return;
    }
    setPagination((prevState) => {
      return {
        ...prevState,
        currentPage: currentPage - 1,
        startIndex: (currentPage - 2) * PAGESIZE,
        endIndex: (currentPage - 1) * PAGESIZE,
      };
    });
  };

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

  return (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.halfView}>
        <View style={Styles.searchButtonView}>
          <Text style={Styles.transactionText}>
            {constants.transactionSearch}
          </Text>
          <TouchableOpacity style={Styles.searchButton} onPress={()=>navigation.navigate('FurnitureReplacmentProcess')}>
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
          <TextInput
            style={Styles.dropStyle}
            placeholder={constants.emisNumber}
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
          />
        </View>
        <View style={Styles.viewInputS}>
          <TextInput
            style={Styles.dropS}
            placeholder={constants.status}
            placeholderTextColor={COLORS.Black}
            opacity={1}
          />
          <TouchableOpacity style={Styles.dropdowwnButton}>
            <Image source={Images.DownArrow} style={Styles.imgsStyle} />
          </TouchableOpacity>
        </View>
        <View style={Styles.viewInputStyle}>
          <View style={Styles.dropStyle}>
            <Text style={Styles.textStyle}>
              {" "}
              {`${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`}
            </Text>
          </View>
          <TouchableOpacity
            style={Styles.eyeStyle}
            onPress={() => setOpen(true)}
          >
            <Image source={Images.Calender} style={Styles.imgStyle} />
            <DatePicker
              modal
              open={open}
              date={startDate}
              mode="date"
              onConfirm={(date) => {
                setOpen(false);
                setStartDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </TouchableOpacity>
          <View style={Styles.dropStyle}>
            <Text style={Styles.textStyle}>
              {" "}
              {`${endData.getDate()}/${endData.getMonth()}/${endData.getFullYear()}`}
            </Text>
          </View>
          <TouchableOpacity
            style={Styles.eyeStyle}
            onPress={() => setCLose(true)}
          >
            <Image source={Images.Calender} style={Styles.imgStyle} />
            <DatePicker
              modal
              open={close}
              date={endData}
              mode="date"
              onConfirm={(date) => {
                setCLose(false);
                setEndDate(date);
              }}
              onCancel={() => {
                setCLose(false);
              }}
            />
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
        <TouchableOpacity onPress={onPrevious}>
          {pagination.currentPage === 1 ? (
            <Image source={Images.leftarrow} />
          ) : (
            <Image
              source={Images.rightarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onNext}>
          {pagination.currentPage === pagination.totalPage ? (
            <Image
              source={Images.leftarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          ) : (
            <Image source={Images.rightarrow} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
