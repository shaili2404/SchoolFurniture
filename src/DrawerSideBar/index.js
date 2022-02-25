import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { removeData, getSaveData } from '../../utils/helpers';
// import { LOCAL_STORAGE_DATA_KEY } from '../../utils/constants';

import { DRAWER_MENU } from "../routes/Constants";
import Styles from "./styles";

import newLocal from '../assets/Images/Common/Asset2@4x-100.png';
import dropdownOpen from '../assets/Images/Common/Iconmaterial-arrow-drop-down.png';
import dropdownClose from '../assets/Images/Common/arrow-drop-down.png';

const DrawerSideBar = (props) => {
    const [name, setName] = useState("");
    const { navigation } = props;
    const [status, setStatus] = useState(false);

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
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                <View style={Styles.userSectionContainer}>
                    <View style={Styles.logoView}>
                        <Image source={newLocal}  style = {Styles.logoImg}/>
                    </View>
                </View>
                
                {/* <View style={Styles.userSectionContainer}>
                    <View style={{marginLeft: 10, marginRight: 10}}>
                        <Image source={newLocal}  style = {Styles.userProfile}/>
                    </View>
                    <View style={{flex: 1, marginRight: 10}}>
                        <Text style={{fontSize: 18, color: '#000'}}>School User Name</Text>
                        <Text style={{fontSize: 18, color: '#000'}}>Active Since</Text>
                  
                    </View>
                </View> */}

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