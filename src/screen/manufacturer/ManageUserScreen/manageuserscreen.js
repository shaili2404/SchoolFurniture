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
} from "react-native";
import COLORS from "../../../asset/color";
import Images from "../../../asset/images";

import constants from "../../../locales/constants";
import axios from "axios";
import endUrl from "../../../redux/configration/endUrl";
import { useSelector } from "react-redux";
import { DataDisplayList } from "../../../component/manufacturer/displayListComman";
import { ListHeaderComman } from "../../../component/manufacturer/ListHeaderComman";
import { AddUserModal } from "../../../component/manufacturer/AddFormModal/AddFormModal";
import Loader from "../../../component/loader";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import AlertText from "../../../Alert/AlertText";

const PAGESIZE = 10;

export const ManageUserScreen = () => {
  const [listData, setListData] = useState([]);
  const loginData = useSelector((state) => state?.loginData);
  const [addUserModal, setAdduserModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [searchtask, setSearchTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const [maximumNumber, setmaximunNumber] = useState(0);
  const [number, setNumber] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPage: 0,
    startIndex: 0,
    endIndex: 0,
  });
  const isFocused = useIsFocused()
  const [permissionId, setPermissionId] = useState({
    userList: false,
    userCreate: false,
    userEdit: false,
    userDelete: false,
  });

  const tableKey = ["name", "surname", "username", "email", "organization"];
  const tableHeader = [
    constants.name,
    constants.surname,
    constants.username,
    constants.emailId,
    constants.organisation,
    constants.manage,
  ];

  useEffect(() => {
    const arr = loginData?.user?.data?.data?.permissions;
    let userList = false,
      userCreate = false,
      userEdit = false,
      userDlt = false;
    arr.forEach((input) => {
      if (input.id === 1) {
        userList = true;
      }
      if (input.id === 2) {
        userCreate = true;
      }
      if (input.id === 3) {
        userEdit = true;
      }
      if (input.id === 4) {
        userDlt = true;
      }
    });
    setPermissionId({
      userList: userList,
      userCreate: userCreate,
      userEdit: userEdit,
      userDelete: userDlt,
    });
  }, []);

  const rendercomponent = ({ item }) => {
    return (
      <DataDisplayList
        item={item}
        tableKey={tableKey}
        reloadList={() => reloadList()}
        Url={endUrl.userList}
        onEdit={(item, task) => onEdit(item, task)}
        mainMessage={AlertText.deleteUser}
        submessage={AlertText.canNotUndo}
        permissionId={permissionId}
      />
    );
  };

  const onEdit = (item, task) => {
    let btnStatus;
    if (task == constants.Edit) {
      btnStatus = "0";
    }
    navigation.navigate("AddNewUsers", { Item: item, btnStatus: btnStatus });
  };

  const HeaderComponet = () => {
    return <ListHeaderComman tableHeader={tableHeader} />;
  };

  const reloadList = () => {
    apicall();
  };

  const onSubmitDetails = async (value) => {
    try {
      const response = await axios.post(`${endUrl.schoolList}`, value);
    } catch (e) {}
  };

  const apicall = (count) => {
    setLoader(true);
    axios
      .get(`${endUrl.userList}?page=${count ? count : number}`)
      .then((res) => {
        setListData(res?.data?.data?.records);
        setmaximunNumber(res?.data?.data?.total_page);
        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
        console.log("apicall", e);
      });
  };

  const onNext = () => {
    let count = number + 1;
    setLoader(true);
    setNumber(number + 1);
    apicall(count);
    setLoader(false);
  };

  const onPrevious = () => {
    let count = number - 1;
    setLoader(true);
    setNumber(number - 1);
    apicall(count);
    setLoader(false);
  };
  const onsearch = () => {
    setLoader(true);
    axios
      .get(`${endUrl.usersearch}${searchtask}`)
      .then((res) => {
        setListData(res?.data?.data);
        setLoader(false);
      })
      .catch((e) => {
        {
          let { message, data, status } = e?.response?.data || {};
          setLoader(false);
          {
            let str = "";
            status == 422
              ? Object.values(data).forEach((value) => {
                  str += `  ${value}`;
                  setErrorMessage(str);
                })
              : setErrorMessage(message);
          }
        }
      });
  };

  useEffect(() => {
    apicall();
  }, [isFocused]);

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
            <>
              <View
                style={
                  pagination.endIndex > 7 ? Styles.listView80 : Styles.listView
                }
              >
                <FlatList
                  ListHeaderComponent={HeaderComponet}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id}
                  data={listData.sort((a, b) => a.name.localeCompare(b.name))}
                  renderItem={rendercomponent}
                />
              </View>
            </>
          </ScrollView>
        )}
      </View>
      <View style={errorMessage ? Styles.lastssView : Styles.lastView}>
        <TouchableOpacity
          onPress={onPrevious}
          disabled={number == 1 ? true : false}
        >
          {number == 1 ? (
            <Image source={Images.leftarrow} />
          ) : (
            <Image
              source={Images.rightarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNext}
          disabled={number == maximumNumber ? true : false}
        >
          {number == maximumNumber ? (
            <Image
              source={Images.leftarrow}
              style={{ transform: [{ rotate: "180deg" }] }}
            />
          ) : (
            <Image source={Images.rightarrow} />
          )}
        </TouchableOpacity>
      </View>
      {permissionId.userCreate && (
        <View style={Styles.plusView}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddNewUsers", { btnStatus: "1" })
            }
          >
            <Image source={Images.addCricleIcon} />
          </TouchableOpacity>
        </View>
      )}

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
