import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View,Text, Image } from "react-native";
import COLORS from "../../../../asset/color";
import Images from "../../../../asset/images";
import Dropdown from "../../../../component/DropDown/dropdown";
import constants from "../../../../locales/constants";
import style from "./style";


export const DisposalDIlveryButton = () =>{
const [checkBoxStatus1,setCheckBoxStatus1] = useState(false)
const [checkBoxStatus2,setCheckBoxStatus2] = useState(false)

return(
<View style={{backgroundColor:COLORS.White}}>
<SafeAreaView style={style.mainView}>
    <View>
    <View style={style.bottonView}>
            <TouchableOpacity onPress={()=>setCheckBoxStatus1(checkBoxStatus1?false:true)}>
            <View style={style.checkVIew}/>
              {checkBoxStatus1?
                <Image source={Images.rightIcon} style={style.rightTick}/>
                : false}
            </TouchableOpacity>
            <View>
            
             <Text style={style.cecktext}>{constants.Delivery_hasreadytoDilvered}</Text>
             </View>
        </View>
        <TouchableOpacity style={style.buttonCol}>
            <View style={style.printView}>
            <View>
                <Image source={Images.printIconWhite} />
                </View>
                <View>
                <Text style={style.textCOl}>
                   {constants.Delivery_Note}
                </Text>
            </View>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonCol}>
            <View>
                <Text style={style.textCOl}>
                   {constants.Delivery_signedCopy}
                </Text>
            </View>
        </TouchableOpacity> 
        <View style={style.bottonView}>
            <TouchableOpacity onPress={()=>setCheckBoxStatus2(checkBoxStatus2?false:true)}>
            <View style={style.checkVIew}/>
              {checkBoxStatus2?
                <Image source={Images.rightIcon} style={{height:15,width:15,alignSelf:'center',position:'absolute',top:4}}/>
                : false}
            </TouchableOpacity>
            <View>
            
             <Text style={style.cecktext}>{constants.Delivery_hasDelivered}</Text>
             </View>
        </View>
    </View>
    </SafeAreaView>
    </View>


);
}