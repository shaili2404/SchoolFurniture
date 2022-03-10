import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";

import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import constants from '../../../../locales/constants';
import style from './style';

export const Schoolmaintenancescreen = () => {
    const loginData = useSelector((state) => state?.loginData);
    const [permissionId, setPermissionId] = useState({
        districtList: false,
        schoolList: false,
    });
    const navigation = useNavigation();

    useEffect(() => {
        const arr = loginData?.user?.data?.data?.permissions;
        let disList = false, sclList = false;

        arr.forEach((input) => {
            if (input.id === 5) {
                disList = true;
            } if (input.id === 9) {
                sclList = true;
            }
        })
        setPermissionId({
            districtList: disList,
            schoolList: sclList
        })
    }, []);

    return (
        <SafeAreaView style={style.container}>
            <View>
                {permissionId.districtList && (
                    <TouchableOpacity style={style.districtButton} onPress={() => navigation.navigate('School District')}>
                        <Text style={style.districttext}>
                            {constants.SchoolDistrict}
                        </Text>
                    </TouchableOpacity >
                )}
                {permissionId.schoolList && (
                    <TouchableOpacity style={style.schoolButton} onPress={() => navigation.navigate('School')}>
                        <Text style={style.schooldistrict}>
                            {constants.School}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    )
}