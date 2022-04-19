import React, { useState, useEffect } from "react";
import Styles from "../maintenance/SchoolMaintenance/SchoolDistrict/style";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Image,
  Text,
} from "react-native";
import styles from "./Styles";
import COLORS from "../../../asset/color";
import Images from "../../../asset/images";

import constants from "../../../locales/constants";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import { useSelector } from "react-redux";
import { DataDisplayList } from "../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../component/manufacturer/ListHeaderComman";
import Loader from "../../../component/loader";
import AlertText from "../../../Alert/AlertText";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from "react-native-date-picker";
import Fonts from "../../../asset/Fonts";
import { STANDARD_SCREEN_SIZE } from "../../../utils/constants";
import { RFValue } from "react-native-responsive-fontsize";

const PAGESIZE = 10;

export const Search = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const [radioParam, setRadioParam] = useState(
      [
          {label: 'Data Range', value: 0 },
          {label: 'Reference Number', value: 1 }
      ]);
  const [searchValue, setSearchValue] =useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endData, setEndDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [close, setCLose] = useState(false);
  const [status, setStatus] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPage: 0,
    startIndex: 0,
    endIndex: 0,
  });
  const [permissionId, setPermissionId] = useState({
    userList: false,
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [permissionArr, setpermissionArr] = useState([]);

  const tableKey = [
    "district_office",
    "director",
    "tel",
    "address1",
    "address2",
    "address3",
    "address4",
    "street_code",
  ];

  const tableHeader = [
    constants.School,
    constants.emisNumber,
    constants.refrenceNumber,
    constants.dateCreated,
    constants.FurnitureCat,
    constants.ItemCount,
    constants.status,
  ];

  const addArray = [
    { key: "district_office", value: constants.DistrictOffice },
    { key: "director", value: constants.Director },
    { key: "tel", value: constants.TelphoneNo },
    { key: "address1", value: constants.Address1 },
    { key: "address2", value: constants.Address2 },
    { key: "address3", value: constants.Address3 },
    { key: "address4", value: constants.Address4 },
    { key: "street_code", value: constants.streetCode },
  ];

  useEffect(() => {
    setpermissionArr(loginData?.user?.data?.data?.permissions);
    let userList = false,
      userCreate = false,
      userEdit = false,
      userDlt = false;
    permissionArr.forEach((input) => {
      if (input.id === 5) {
        // setErrorMessage("");
        userList = true;
      }
      if (input.id === 6) {
        userCreate = true;
      }
      if (input.id === 7) {
        userEdit = true;
      }
      if (input.id === 8) {
        userDlt = true;
      } else if (!userList) {
      }
    });
    setPermissionId({
      userList: userList,
      userCreate: userCreate,
      userEdit: userEdit,
      userDelete: userDlt,
    });
  }, [listData]);

  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        reloadList={() => reloadList()}
        link={endUrl.schoolDistList}
        mainMessage={AlertText.deletedistrict}
        submessage={AlertText.UndoMessgae}
        permissionId={permissionId}
        data={"0"}
      />
    );
  };

  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  const reloadList = () => {
    apicall();
  };

  const apicall = async () => {
    setLoader(true);
    axios
      .get(endUrl.userList)
      .then((res) => {
        initialPagination(res?.data?.data);
        setListData(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => setLoader(false));
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
    setLoader(true);
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
    setLoader(false);
  };

  const onPrevious = () => {
    setLoader(true);
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
    setLoader(false);
  };

  const onsearch = async () => {
    setLoader(true);
    axios
      .get(`${endUrl.districtSearch}${searchtask}`)
      .then((res) => {
        setListData(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => {
        let errorMsg = e?.response?.data?.message;
        setLoader(false);
        setErrorMessage(errorMsg);
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
    // <SafeAreaView style={Styles.mainView}>
    // <View style={styles.radioView}>
    //   <View>
    //     <Text style={styles.selectSearchText}>{constants.selectSearchOption}</Text>
    //     <View style={styles.line}></View>
    //   </View>
    //   <View style={styles.radioDate}>
    //    <View style={styles.radView}>
    //     <RadioForm
    //       radio_props={radioParam}
    //       initial={0}
    //       formHorizontal={true}
    //       buttonSize={10}
    //       buttonColor={'#48A448'}
    //       selectedButtonColor={'#359934'}
    //       buttonWrapStyle={{paddingLeft: 50}}
    //       radioStyle={{paddingRight: 40}}
    //       labelStyle={{fontSize: 16, color: '#000000',}}
    //       onPress={(value) => setSearchValue(value)}
    //     />
    //     </View>
    //     { searchValue == 0 ?
    //       // Search by Date Range
    //       <View style={styles.viewInputStyle}>
    //       <View style={styles.dropStyle}>
    //         <Text style={styles.textStyle}>
    //           {" "}
    //           {`${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`}
    //         </Text>
    //       </View>
    //       <TouchableOpacity
    //         style={styles.eyeStyle}
    //         onPress={() => setOpen(true)}
    //       >
    //         <Image source={Images.Calendar} style={styles.imgStyle} />
    //         <DatePicker
    //           modal
    //           open={open}
    //           date={startDate}
    //           mode="date"
    //           onConfirm={(date) => {
    //             setOpen(false);
    //             setStartDate(date);
    //           }}
    //           onCancel={() => {
    //             setOpen(false);
    //           }}
    //         />
    //       </TouchableOpacity>
    //       <View style={styles.dropStyle}>
    //         <Text style={styles.textStyle}>
    //           {" "}
    //           {`${endData.getDate()}/${endData.getMonth()}/${endData.getFullYear()}`}
    //         </Text>
    //       </View>
    //       <TouchableOpacity
    //         style={styles.eyeStylee}
    //         onPress={() => setCLose(true)}
    //       >
    //         <Image source={Images.Calendar} style={styles.imgStylee} />
    //         <DatePicker
    //           modal
    //           open={close}
    //           date={endData}
    //           mode="date"
    //           onConfirm={(date) => {
    //             setCLose(false);
    //             setEndDate(date);
    //           }}
    //           onCancel={() => {
    //             setCLose(false);
    //           }}
    //         />
    //       </TouchableOpacity>
    //     </View>
    //     : 
    //     <View>
    //      {/* Search by reference number */}
    //      <TextInput
    //         style={styles.refrenceStyle}
    //         placeholder={constants.referenceNumber}
    //         placeholderTextColor={COLORS.Black}
    //         opacity={0.5}
    //         value={searchtask}
    //         onChangeText={(val) => setSearchTask(val)}
    //       />
    //      </View>
    //     }
       
        
       
  
    //   </View>
    //   <View style={styles.buttonView}>
    //     <TouchableOpacity
    //       style={styles.buttonStyle}
    //     //   onPress={editState === true ? onUpdate : onAdd}
    //     >
    //       <Text style={styles.buttonText}>{constants.search}</Text>
    //     </TouchableOpacity>
    //   </View>
    //   </View>
    //   <ScrollView style={styles.radView} horizontal={true} showsHorizontalScrollIndicator={false}>
    //         <FlatList
    //           ListHeaderComponent={HeaderComponet}
    //           showsHorizontalScrollIndicator={false}
    //           keyExtractor={(item) => item.id}
    //           data={listData.slice(pagination.startIndex, pagination.endIndex)}
    //           renderItem={rendercomponent}
    //         />
    //       </ScrollView>
    //   <View style={Styles.lastView}>
    //     <TouchableOpacity onPress={onPrevious}>
    //       {pagination.currentPage === 1 ? (
    //         <Image source={Images.leftarrow} />
    //       ) : (
    //         <Image
    //           source={Images.rightarrow}
    //           style={{ transform: [{ rotate: "180deg" }] }}
    //         />
    //       )}
    //     </TouchableOpacity>

    //     <TouchableOpacity onPress={onNext}>
    //       {pagination.currentPage === pagination.totalPage ? (
    //         <Image
    //           source={Images.leftarrow}
    //           style={{ transform: [{ rotate: "180deg" }] }}
    //         />
    //       ) : (
    //         <Image source={Images.rightarrow} />
    //       )}
    //     </TouchableOpacity>
    //   </View>
    // </SafeAreaView>
    <View style={{ height: '100%', justifyContent: 'center', backgroundColor: '#fff', 
  }}>
      <Text style={{ textAlign: 'center', fontFamily: Fonts.bold, fontSize: RFValue(18, STANDARD_SCREEN_SIZE)    }}>Search</Text>
      {/* <Button title="Submit" onPress={()=> navigation.navigate('Second') } /> */}
    </View>
  );
};
