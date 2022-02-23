import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView
} from "react-native";
// import { removeData, getSaveData } from '../../utils/helpers';
// import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';

import { DRAWER_MENU } from "../routes/Constants";
import Styles from "./styles";

import newLocal from '../assets/Images/Common/Asset2@4x-100.png';
import { AlertMessage } from "../Alert/alert";
import AlertText from "../Alert/AlertText";
import axios from "axios";
import endUrl from "../redux/configration/endUrl";
import { Baseurl } from "../redux/configration/baseurl";

const DrawerSideBar = (props) => {
  const [name, setName] = useState("");
  const { navigation } = props;
  const [alert, setAlert] = useState(false);
  const loginData = useSelector((state) => state?.loginData);

  // useEffect(() => {
  //     async function getUserName() {
  //         const username = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
  //         setName(username)
  //     }
  //     getUserName();
  // }, [userRole]);

  const handleUserLogout = async () => {
    // await removeData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN);
    // await removeData(LOCAL_STORAGE_DATA_KEY.USER_ROLE);
    // // await removeData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
    // setLogin(false);
    setAlert(true);
  };

  const onPressYes = () => {
    // console.log("token", `${Baseurl}${endUrl.logout}`);

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loginData?.user?.data?.access_token}`;

    axios
      .post(`${Baseurl}${endUrl.logout}`)
      .then((res) => {
        console.log("48", JSON.stringify(res));
        if (res?.data?.status === 200) {
          navigation.navigate("LoginScreen");
          setAlert(false);
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  const onNavigation = (screenName) => {
    if (screenName === "logout") {
      handleUserLogout();
    } else {
      navigation.navigate(screenName);
    }
  };

  const onRenderMenu = (index, item) => {
    return (

      <TouchableOpacity
        key={index}
        activeOpacity={0.8}
        onPress={() => onNavigation(item.screenName)}
      >
        <View style={[Styles.menuItemContainer]}>
          <View style={[Styles.iconContainer]}>
            <Image source={item.iconName} />
          </View>
          <Text style={Styles.iconNameContainer}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={Styles.userSectionContainer}>
            <View style={Styles.logoView}>
              <Image source={newLocal} style={Styles.logoImg} />
            </View>
          </View>
          <FlatList
            data={DRAWER_MENU["manufacturer"]}
            keyExtractor={(_, index) => `${index}2`}
            renderItem={({ index, item }) => onRenderMenu(index, item)}
          />
        </View>
      </ScrollView>
      {alert ? (
        <AlertMessage
          visible={alert}
          setmodalVisible={(val) => setAlert(val)}
          mainMessage={AlertText.signout}
          subMessage={AlertText.UndoMessgae}
          type="question"
          onConfirm={() => onPressYes()}
        />
      ) : null}
      </SafeAreaView>
    </>
  );
};

export default DrawerSideBar;
