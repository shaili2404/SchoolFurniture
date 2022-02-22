import React from 'react';
import {
    SafeAreaView,
    View,
    Image,
    KeyboardAvoidingView,
    StyleSheet,
    Text
} from "react-native";
import COLORS from '../asset/color';
import Images from "../asset/images";
import constants from "../locales/constants";

const EmailSent = () => { 
    return (
        <SafeAreaView style={Styles.mainContainer}>
            <KeyboardAvoidingView>
                <View style={Styles.mainContainer}>
                    <Image source={Images.right}
                        style={Styles.imageStyle}>
                    </Image>
                    <View style={Styles.EmailContainer}>
                        <Text style={Styles.emailText}>{constants.EmailSent}</Text>
                    </View>
                    <View style={Styles.EmailMsgContainer}>
                        <Text style={Styles.emailMsg}>{constants.EmailMsg}</Text>
                    </View>
                    <View style={Styles.backContainer}>
                        <Text style={Styles.BackText}>{constants.BackToLogin}</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default EmailSent
const Styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        marginTop: '35%'
    },
    imageStyle: {
        height: 78,
        width: 78
    },
    EmailContainer: {
        marginTop: 16
    },
    emailText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.ThemeGreen
    },
    EmailMsgContainer: {
        width: '80%',
        marginTop: 16
    },
    emailMsg: {
        fontSize: 16,
        textAlign: 'center'
    },
    backContainer: {
        marginTop: '99%'
    },
    BackText: {
        fontSize: 16,
        color: COLORS.blue,
        textDecorationLine: "underline",
    },
})