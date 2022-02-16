import React, { useState,useEffect } from 'react';
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
import { regExpEmail } from "../../locales/regexp";
import { LogoImg } from '../../atoms/logo';
import constants from "../../locales/constants";
import style from './styles';
import COLORS from '../../asset/color';

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [defaultState, setDefaultState] = useState(false);
    const [errorMessage1, setErrorMessage1] = useState(false);
    const [loader, setLoader] = useState(false);
    const resetData = useSelector(state => state.resetpassData);

    useEffect(() => {
        if (resetData) setLoader(false);
    }, [resetData]);

    const onPressReset = () => {
        setLoader(false);
        var data = {
            "email": email
        }
        useDispatch(resetRequest(data));
    }

    const onChangeEmail = (email) => {
        if (email == '' || !regExpEmail.test(email)) {
            setErrorMessage1(false)
            setEmail(email)
        } else {
            setErrorMessage1(true)
            setEmail(email)
        }
    }

    return (
        loader ? <Loader /> :
            <SafeAreaView style={style.mainView}>
                <View style={style.subContainer}>
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
                        {defaultState === true ?
                        <>
                        {errorMessage1===true?
                            <View style={style.inputStyles}>
                                <TouchableOpacity style={style.buttonStyle} onPress={onPressReset}>
                                    <Text style={style.buttonText}>{constants.Reset}</Text>
                                </TouchableOpacity>
                            </View> :
                            <View style={style.inputStyles}>
                            <TouchableOpacity style={style.buttonStyle} onPress={onPressReset} disabled>
                                <Text style={style.buttonText}>{constants.Reset}</Text>
                            </TouchableOpacity>
                        </View>}
                            </>
                            :
                            null}
                    </KeyboardAvoidingView>
                    <View style={style.backContainer}>
                        <Text style={style.BackText}>{constants.BackToLogin}</Text>
                    </View>
                </View>
            </SafeAreaView>
    )
}

export default PasswordReset;