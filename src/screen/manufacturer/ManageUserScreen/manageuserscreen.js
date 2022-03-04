import React, { useState, useEffect } from "react";
import Styles from "./Styles";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import COLORS from "../../../asset/color";
import Images from "../../../asset/images";
import { FurnitureRequestList } from "../../../component/school/furniturerequestList";

import constants from "../../../locales/constants";
import axios from "axios";
import Dummydatauser from "../../../component/dummyData/DummyDatauser";
import { Baseurl } from "../../../redux/configration/baseurl";
import endUrl from "../../../redux/configration/endUrl";
import { useSelector } from "react-redux";
import { DataDisplayList } from "../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../component/manufacturer/ListHeaderComman";
import { AddUserModal } from "../../../component/manufacturer/AddFormModal/AddFormModal";
import { Token } from "../../../component/dummyData/Token";
import Loader from "../../../component/loader";
import { useNavigation } from "@react-navigation/native";

const PAGESIZE = 7;

export const ManageUserScreen = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [addUserModal, setAdduserModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPage: 0,
    startIndex: 0,
    endIndex: 0,
  });
  const navigation = useNavigation();
  const tableKey = [
    "name",
    "surname",
    "username",
    "email",
    "organization",
    // "tel",
    // "emis",
    // "district_name",
    // "school_principal",
  ];
  const tableHeader = [
    constants.name,
    constants.surname,
    constants.username,
    constants.emailId,
    constants.organisation,
    constants.manage,
  ];

  const addArray = [
    { key: "name", value: constants.School },
    { key: "emis", value: constants.schoolEmisNumber },
    { key: "district_name", value: constants.SchoolDistrict },
    { key: "School Principle", value: constants.SchoolPrinciple },
    { key: "tel", value: constants.SchoolTelno },
    { key: "address1", value: constants.Address1 },
    { key: "address2", value: constants.Address2 },
    { key: "address3", value: constants.Address3 },
    { key: "address4", value: constants.Address4 },
    { key: "street_code", value: constants.streetCode },
  ];

  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        reloadList={() => reloadList()}
        Url={endUrl.userList}
        onEdit={(item, task) => onEdit(item, task)}
      />
    );
  };

  const onEdit = (item, task) => {
    let btnStatus;
    if (task == "Edit") {
      btnStatus = '0'
    }
    navigation.navigate('AddNewUsers', { Item: item, btnStatus: btnStatus });
  }

  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  const reloadList = () => {
    apicall();
  };
  const onSubmitDetails = async (value) => {
    const a = "${loginData?.user?.data?.access_token}";
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;

    try {
      const response = await axios.post(
        `${Baseurl}${endUrl.schoolList}`,
        value
      );
    } catch (e) {}
  };

  const apicall = () => {
    setLoader(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    axios
      .get(`${Baseurl}${endUrl.userList}`)
      .then((res) => {
        initialPagination(res?.data?.data);
        setListData(res?.data?.data);
        setLoader(false);
      })
      .catch((e) =>{ 
        setLoader(false)
         console.log("apicall", e)
      })
      ;
  };

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
  const onsearch = () => {
    setLoader(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;
    axios
      .get(`${Baseurl}${endUrl.usersearch}${searchtask}`)
      .then((res) => {
        setListData(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => {
        console.log("search error", e);
        setLoader(false);
        setErrorMessage(constants.userNotFound);
      });
  };

  useEffect(() => {
    apicall();
  }, []);

  useEffect(() => {
    if (listData) setLoader(false);
  }, [listData]);

  useEffect(() => {
    if (searchtask == "") {
      apicall();
      setErrorMessage("");
      setLoader(false);
    }
  }, [searchtask]);

  return loader ? (
    <Loader />
  ) : (
    <SafeAreaView style={Styles.mainView}>
      <View style={Styles.halfView}>
        <View>
          <TextInput
            style={Styles.refrenceStyle}
            placeholder={constants.searchuser}
            placeholderTextColor={COLORS.Black}
            opacity={0.5}
            value={searchtask}
            onChangeText={(val) => setSearchTask(val)}
          />
          <TouchableOpacity style={Styles.eyeStyle} onPress={() => onsearch()}>
            <Image source={Images.SearchIcon} style={Styles.imgsStyle} />
          </TouchableOpacity>
        </View>
        {errorMessage ? (
          <View style={Styles.errorView}>
            <Text style={Styles.errormessStyle}>{errorMessage}</Text>
          </View>
        ) : (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <FlatList
              ListHeaderComponent={HeaderComponet}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              data={listData.sort((a, b) => a.name.localeCompare(b.name)).slice(pagination.startIndex, pagination.endIndex)}
              renderItem={rendercomponent}
            />
          </ScrollView>
        )}
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
      <View style={Styles.plusView}>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddNewUsers", { btnStatus: "1" })}
        >
          <Image source={Images.addCricleIcon} />
        </TouchableOpacity>
      </View>

      {addUserModal ? (
        <AddUserModal
          visible={addUserModal}
          setmodalVisible={(val) => setAdduserModal(val)}
          onSubmitDetails={(value) => onSubmitDetails(value)}
          data={addArray}
          name={constants.School}
        />
      ) : null}
    </SafeAreaView>
  );
};
