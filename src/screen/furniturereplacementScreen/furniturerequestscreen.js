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
import axios from "axios";
import endUrl from "../../redux/configration/endUrl";
import Loader from "../../component/loader";
import Dropdown from "../../component/DropDown/dropdown";

const PAGESIZE = 4;

export const FurnitureReplacmentManfacturer = () => {
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
  const [collectionList, setCollectionList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [dropData,setDropData] = useState([])
  const [select,setSelect] = useState([])
  const [permissionId, setPermissionId] = useState({
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });
  const organization = useSelector(
    (state) => state?.loginData?.user?.data?.data?.user?.organization
  );

  const getCollectionRequest = () => {
    setLoader(true);
    axios
      .get(`${endUrl.collectionreqList}`)
      .then((res) => {
        setCollectionList(res?.data?.data);
        initialPagination(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => console.log("apicall", e));
  };
  const getstatusList = () => {
    setLoader(true);
    axios
      .get(`${endUrl.statusList}`)
      .then((res) => {
        setDropData(res?.data?.data)
        console.log(res?.data?.data)
      })
      .catch((e) => console.log("apicall", e));
  };

  useEffect(() => {
    getCollectionRequest();
    getstatusList()
  }, []);

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
          (currentPage + 1) * PAGESIZE > collectionList.length
            ? collectionList.length
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
  const tableHeader =
    organization == "School"
      ? [
          constants.dateCreated,
          constants.refrenceNo,
          constants.emisNumber,
          constants.status,
          constants.totalFurnitureCount,
        ]
      : [
          constants.schoolName,
          constants.dateCreated,
          constants.refrenceNo,
          constants.status,
          constants.emis,
          constants.totalFurnitureCount,
        ];
  const tableKey =
    organization == "School"
      ? ['created_at', "ref_number", "status", "emis", "total_furniture"]
      : ["school_name", 'created_at' ,"ref_number", "status", "emis", "total_furniture"];
  const rendercomponent = ({ item }) => {
    return (
      <>
        {organization == "School" ? (
          <DataDisplayList
            tableKey={tableKey}
            item={item}
            permissionId={permissionId}
          />
        ) : (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FurnitureReplacmentProcess", item)
            }
          >
            <DataDisplayList
              tableKey={tableKey}
              item={item}
              permissionId={permissionId}
            />
          </TouchableOpacity>
        )}
      </>
    );
  };
  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.halfView}>
        <View style={Styles.searchButtonView}>
          <Text style={Styles.transactionText}>
            {constants.transactionSearch}
          </Text>
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
          <TextInput
            style={Styles.dropStyle}
            placeholder={constants.emisNumber}
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
          />
        </View>
        <View style={Styles.container}>
        <Dropdown
          label={constants.FurCategory}
          data={dropData}
          onSelect={setSelect}
          task="name"
        />
        </View>
        <View style={Styles.viewInputStyle}>
          <View style={Styles.dropsssssStyle}>
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
          <View style={Styles.dropsssssStyle}>
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
            data={collectionList.slice(
              pagination.startIndex,
              pagination.endIndex
            )}
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
      ) : null}
      <View style={Styles.lastView}>
        <TouchableOpacity
          disabled={pagination.currentPage === 1 ? true : false}
          onPress={onPrevious}
        >
          {pagination.currentPage === 1 ? (
            <Image source={Images.leftarrow} />
          ) : (
            <Image
              source={Images.rightarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          disabled={
            pagination.currentPage === pagination.totalPage ? true : false
          }
          onPress={onNext}
        >
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
