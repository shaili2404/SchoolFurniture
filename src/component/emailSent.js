import React from 'react';
import {
    SafeAreaView,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Text
} from "react-native";
import COLORS from '../asset/color';
import Images from "../asset/images";
import constants from "../locales/constants";
import { RFValue } from 'react-native-responsive-fontsize';
import { RfH, RfW } from '../utils/helpers';
import Fonts from '../asset/Fonts';
import { STANDARD_SCREEN_SIZE } from '../utils/constants';
import { useNavigation } from '@react-navigation/native';

const EmailSent = () => { 
    const navigation = useNavigation();
    return (
        <SafeAreaView style={Styles.mainView}>
                <View style={Styles.mainContainer}>
                    <Image style={Styles.imageStyle} source={Images.right} />
                    <Text style={Styles.emailText}>{constants.EmailSent}</Text>
                    <Text style={Styles.emailMsg}>{constants.EmailMsg}</Text>
                </View>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={Styles.BackText}>{constants.BackToLogin}</Text>
        </TouchableOpacity>
        </SafeAreaView>
        
    )
}

export default EmailSent
const Styles = StyleSheet.create({
    mainView: {
        backgroundColor: COLORS.White,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        height: 78,
        width: 78,
    },
    emailText: {
        fontFamily: Fonts.bold,
        fontSize: RFValue(32, STANDARD_SCREEN_SIZE),
        color: COLORS.ThemeGreen,
        marginTop: RfH(30),
    },
    emailMsg: {
        fontFamily: Fonts.regular,
        fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
        color: COLORS.Black,
        marginTop: RfH(15),
        marginHorizontal: RfW(50),
        textAlign: 'center',
    },
    BackText: {
        fontFamily: Fonts.regular,
        fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
        color: COLORS.blue,
        textDecorationLine: "underline",
        marginBottom: RfW(40),
    },
})