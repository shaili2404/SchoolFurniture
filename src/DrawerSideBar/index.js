import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { removeData, getSaveData } from '../../utils/helpers';
// import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';

import { DRAWER_MENU } from "../routes/Constants";
import Styles from "./styles";

import newLocal from '../assets/Images/Common/Asset2@4x-100.png';

const DrawerSideBar = (props) => {
    const [name, setName] = useState("");
    const { navigation } = props;

    // useEffect(() => {
    //     async function getUserName() {
    //         const username = await getSaveData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
    //         setName(username)
    //     }
    //     getUserName();
    // }, [userRole]);

    // const handleUserLogout = async () => {
    //     await removeData(LOCAL_STORAGE_DATA_KEY.JWT_TOKEN);
    //     await removeData(LOCAL_STORAGE_DATA_KEY.USER_ROLE);
    //     // await removeData(LOCAL_STORAGE_DATA_KEY.USER_NAME);
    //     setLogin(false);
    // };

    const onNavigation = (screenName) => {
        if (screenName === 'logout') {
            handleUserLogout();
        } else {
            navigation.navigate(screenName) 
        }
    }

    const onRenderMenu = (index, item) => {
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
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <View style={Styles.userSectionContainer}>
                    <View style={Styles.logoView}>
                        <Image source={newLocal}  style = {Styles.logoImg}/>
                    </View>
                </View>
                <FlatList
                    data={DRAWER_MENU["manufacturer"]}
                    keyExtractor={(_, index) => `${index}2`}
                    renderItem={({ index, item }) => onRenderMenu(index, item)}
                />
            </View>
        </ScrollView>
    )
}

export default DrawerSideBar;