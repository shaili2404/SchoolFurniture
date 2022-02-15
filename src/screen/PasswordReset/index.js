import React, { useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { resetRequest } from '../../redux/actions/resetAction';
import constants from "../../locales/constants";
import style from './styles';
import { LogoImg } from '../../atoms/logo';
import COLORS from '../../asset/color';
import { regExpEmail } from "../../locales/regexp";

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [defaultState, setDefaultState] = useState(false);
    const [errorMessage1, setErrorMessage1] = useState('');

    const onPressReset = () => {
        var data = {
            "email": email
        }
        useDispatch(resetRequest(data));
    }

    const resetData = useSelector(state => state.resetpassData)
    //console.log("getData", resetData)

    const onChangeEmail = (email) => {
        if (email == '' || !regExpEmail.test(email)) {
            setErrorMessage1(constants.ValidEmail)
            setEmail(email)
        } else {
            setErrorMessage1('')
            setEmail(email)
        }
    }

    return (
        <SafeAreaView style={style.mainView}>
            <KeyboardAvoidingView>
                <View>
                    <LogoImg />
                </View>
                <View style={style.textContainer}>
                    <Text style={style.resetText}>{constants.ResetPassword}</Text>
                </View>
                <View style={style.inputStyles}>
                    {defaultState === true ?
                        <View style={style.changeView}>
                            <Text style={style.changeText}>{constants.EnterUsername}</Text>
                        </View>
                        : null}
                    <View>
                        <TextInput
                            style={style.emailInputStyle}
                            placeholder={defaultState === true ? " " : constants.EnterUsername}
                            placeholderTextColor={COLORS.Black}
                            value={email}
                            onFocus={() => setDefaultState(true)}
                            onBlur={() => setDefaultState(false)}
                            onChangeText={(email) => onChangeEmail(email)}
                            opacity={defaultState === true ? 1 : 0.5} />
                        {errorMessage1 ?
                            <Text style={style.errorStyle}>{errorMessage1}</Text> : null}
                    </View>
                </View>
                {email != '' ?
                    <View style={style.inputStyles}>
                        <TouchableOpacity style={style.buttonStyle} >
                            <Text style={style.buttonText}>{constants.Reset}</Text>
                        </TouchableOpacity>
                    </View> :
                    null}
                <View style={style.backContainer}>
                    <Text style={style.BackText}>{constants.BackToLogin}</Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default PasswordReset;