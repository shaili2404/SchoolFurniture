import React from "react";
import { Text, TouchableOpacity,View } from "react-native";
import constants from "../../../../../locales/constants";
import style from "./style";


export const FooterFur = ()=>{
    return(
        <View style={style.mainVIew}>
            <View>
                <TouchableOpacity>
                    <Text>
                     {constants.cancel}
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={style.buttonsaveView}>
                    <Text style={style.buttonSubmitText}>
                     {constants.save}
                    </Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={style.buttonsubmitView}>
                    <Text style={style.buttonSubmitText}>
                        {constants.submit}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}