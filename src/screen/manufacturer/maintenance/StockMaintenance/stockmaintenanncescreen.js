import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, TouchableOpacity, Text, View } from 'react-native';
import constants from '../../../../locales/constants';
import { useSelector } from "react-redux";

import style from './style';
export const StockMaintenanceScreen = () => {
    const loginData = useSelector((state) => state?.loginData);
    const [permissionId, setPermissionId] = useState({
        stockItem: false,
        stockCat: false,
    });
    const navigation = useNavigation();

    useEffect(() => {
        const arr = loginData?.user?.data?.data?.permissions;
        let stockItem = false, stockCat = false;

        arr.forEach((input) => {
            if (input.id === 5) {
                stockItem = true;
            } if (input.id === 9) {
                stockCat = true;
            }
        })
        setPermissionId({
            stockItem: stockItem,
            stockCat: stockCat
        })
    }, []);
    return (
        <SafeAreaView style={style.container}>
            <View>
                {permissionId.stockCat && (
                    <TouchableOpacity style={style.districtButton} onPress={() => navigation.navigate("StockCategory")} >
                        <Text style={style.stockCategory}>
                            {constants.stockCategory}
                        </Text>
                    </TouchableOpacity >
                )}
                {permissionId.stockItem && (
                    <TouchableOpacity style={style.stockitemButton} onPress={() => navigation.navigate("Stock Item")}  >
                        <Text style={style.stockitems}>
                            {constants.stockitems}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    )
}