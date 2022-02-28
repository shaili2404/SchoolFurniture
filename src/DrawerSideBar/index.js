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

import { DRAWER_MENU } from "../routes/Constants";
import Styles from "./styles";

import newLocal from '../assets/Images/Common/Asset2@4x-100.png';
import dropdownOpen from '../assets/Images/Common/Iconmaterial-arrow-drop-down.png';
import dropdownClose from '../assets/Images/Common/arrow-drop-down.png';
import { AlertMessage } from "../Alert/alert";
import AlertText from "../Alert/AlertText";
import axios from "axios";
import endUrl from "../redux/configration/endUrl";
import { Baseurl } from "../redux/configration/baseurl";
import { storeData, getSaveData, removeData, clearAll } from "../utils/helpers";

const DrawerSideBar = (props) => {
    const [name, setName] = useState("");
    const { navigation } = props;
    const [status, setStatus] = useState(false);
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
        const tokenRemove =  await removeData("token");
        console.log("tokenRemove",tokenRemove);
        // await removeData(LOCAL_STORAGE_DATA_KEY.USER_ROLE);
        // // await removeData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
        // setLogin(false);
        setAlert(true);
    };

    const onPressYes = () => {
        const token = loginData?.user?.data?.access_token;
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;

        axios
            .post(`${Baseurl}${endUrl.logout}`)
            .then((res) => {
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

    const showHide = () => {
        setStatus(!status)
    }

    const onSubMenu = () => {   
        if(status) {
            DRAWER_MENU["submenu"].map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8} onPress={() => onSubNavigation(item.screenName)}>
                        <View
                            style={[Styles.menuItemContainer]}>
                            <View style = {[Styles.iconContainer]}>
                            <Image source={item.iconName} />
                            </View>
                            <Text style={Styles.iconNameContainer}>Rammm</Text>
                        </View>
                    </TouchableOpacity>
                )
            }
            )
        }    else {
            return null ;
        }
        
    }

    const onRenderMenu = (index, item) => {
        if(item.name == "Maintenance"){
            return (
                <View>
                <View style={Styles.menuItemContainera}> 
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.8} onPress={() => onNavigation(item.screenName)}>
                    <View
                        style={[Styles.menuItemContainerb]}>
                        <View 
                        style = {[Styles.iconContainer]}>
                        <Image source={item.iconName} />
                        </View>
                        <Text style={Styles.iconNameContainer}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{marginTop: 10, marginLeft: 20}}>
                <TouchableOpacity
                    activeOpacity={0.8} onPress={() => showHide()}>
                { status ?
                 <Image source={dropdownClose} />
                :
                <Image source={dropdownOpen} />
                }      
                </TouchableOpacity>
                </View>
                
                </View>
                {
                //    onSubMenu()
                status ?
                DRAWER_MENU["submenu"].map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            activeOpacity={0.8} onPress={() => onNavigation(item.screenName)}>
                            <View
                                style={[Styles.menuItemContainerc]}>
                                <View style = {[Styles.iconContainer]}>
                                <Image source={item.iconName} />
                                </View>
                                <Text style={Styles.iconNameContainer}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
                )
                : null
                }
                </View>
            )
        } else { 
            return (
                <TouchableOpacity
                    key={index}
                    activeOpacity={0.8} onPress={() => onNavigation(item.screenName)}>
                    <View
                        style={[Styles.menuItemContainer]}>
                        <View 
                        style = {[Styles.iconContainer]}>
                        <Image source={item.iconName} />
                        </View>
                        <Text style={Styles.iconNameContainer}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        
    }
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
