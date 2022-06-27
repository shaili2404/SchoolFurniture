import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { DRAWER_MENU } from "../routes/Constants";
import Styles from "./styles";

import { AlertMessage } from "../Alert/alert";
import AlertText from "../Alert/AlertText";
import axios from "axios";
import endUrl from "../redux/configration/endUrl";
import constants from "../locales/constants";
import Images from "../asset/images";

const DrawerSideBar = (props) => {
  const [name, setName] = useState("");
  const { navigation } = props;
  const [status, setStatus] = useState(false);
  const [alert, setAlert] = useState(false);
  const loginData = useSelector((state) => state?.loginData);
  const schooldetails = useSelector(
    (state) => state?.loginData?.user?.data?.data?.user?.organization
  );

  const token = loginData?.user?.data?.access_token;
  const role = loginData?.user?.data?.data?.user?.organization;


  const handleUserLogout = async () => {
    setAlert(true);
  };

  const onPressYes = () => {
    axios
      .post(`${endUrl.logout}`)
      .then((res) => {
        if (res?.data?.status === 200) {
          navigation.navigate("LoginScreen");
          setAlert(false);
        }
      })
      .catch((err) => {});
  };

  const onNavigation = (screenName) => {
    if (screenName === "logout") {
      handleUserLogout();
    } else {
      navigation.navigate(screenName);
    }
  };

  const showHide = () => {
    setStatus(!status);
  };


  const onRenderMenu = (index, item) => {
    if (item.name == "Maintenance") {
      return (
        <View>
          <View style={Styles.menuItemContainera}>
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => showHide()}
            >
              <View style={[Styles.menuItemContainerb]}>
                <View style={[Styles.iconContainer]}>
                  <Image source={item.iconName} />
                </View>
                <Text style={Styles.iconNameContainer}>{item.name}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 10, marginLeft: 20 }}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => showHide()}>
                {status ? (
                  <Image source={Images.arrow_drop_down} />
                ) : (
                  <Image source={Images.Iconmaterial_arrow_drop_down} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {
            //    onSubMenu()
            status
              ? DRAWER_MENU["submenu"].map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.8}
                      onPress={() => onNavigation(item.screenName)}
                    >
                      <View style={[Styles.menuItemContainerc]}>
                        <View style={[Styles.iconContainer]}>
                          <Image source={item.iconName} />
                        </View>
                        <Text style={Styles.iconNameContainer}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })
              : null
          }
        </View>
      );
    } else {
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
    }
  };
  return (
    <>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={Styles.userSectionContainer}>
              <View style={Styles.logoView}>
                <Image source={Images.Asset2} style={Styles.logoImg} />
              </View>
            </View>
           
            <FlatList
                    data={DRAWER_MENU[role]}
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
            type={constants.dropdown_Type}
            onConfirm={() => onPressYes()}
          />
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default DrawerSideBar;
