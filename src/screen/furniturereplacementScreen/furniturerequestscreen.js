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
import COLORS from "../../asset/color";
import DatePicker from "react-native-date-picker";
import Images from "../../asset/images";
import Dummydata from "../../component/dummyData/dummyData";
import constants from "../../locales/constants";
import Styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { DataDisplayList } from "../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../component/manufacturer/ListHeaderComman";
import { useSelector } from "react-redux";

export const FurnitureReplacmentManfacturer = () => {
  const [dummyData, setDummyData] = useState(Dummydata);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPage: 0,
    startIndex: 0,
    endIndex: 0,
  });
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(new Date());
  const [endData, setEndDate] = useState(new Date());
  const [close, setCLose] = useState(false);
  const [open, setOpen] = useState(false);
  const organization = useSelector(
    (state) => state?.loginData?.user?.data?.data?.user?.organization
  );
  console.log(organization);

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
  const tableHeader = [
    constants.dateCreated,
    constants.refrenceNo,
    constants.emisNumber,
    constants.status,
    constants.totalFurnitureCount,
  ];
  const tableKey = [
    "Date",
    "RefrenceNo",
    "emis",
    "status",
    "TotalFurnitureCount",
  ];
  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList tableKey={tableKey} item={item} editDelICon={false} />
    );
  };
  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  return (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.halfView}>
        <View style={Styles.searchButtonView}>
          <Text style={Styles.transactionText}>
            {constants.transactionSearch}
          </Text>
          <TouchableOpacity
            style={Styles.searchButton}
            onPress={() => navigation.navigate("FurnitureReplacmentProcess")}
          >
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
              {`${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`}
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
              {`${endData.getFullYear()}-${endData.getMonth()}-${endData.getDate()}`}
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
      {organization == "School" ? (
        <View style={Styles.plusView}>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddRequestFur")}
          >
            <Image source={Images.addCricleIcon} />
          </TouchableOpacity>
        </View>
      ) : (
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
      )}
    </SafeAreaView>
  );
};
