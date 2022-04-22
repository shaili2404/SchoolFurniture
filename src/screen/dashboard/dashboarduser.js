import React,{useLayoutEffect} from "react";
import { SafeAreaView,View,Text, Image } from "react-native";
import { useSelector } from "react-redux";
import Images from "../../asset/images";
import constants from "../../locales/constants";
import style from "./style";
import {
    useNavigation,
  } from "@react-navigation/native";

export const DashboardUser = ()=>{
    const navigation = useNavigation();

    const schooldetails = useSelector(
        (state) => state?.loginData?.user?.data?.data?.user?.name
      );
      useLayoutEffect(() => {
        const title = constants.dashboard;
        navigation.setOptions({ title });
      }, []);


    return(
        <SafeAreaView style={style.firstContainer}>
          <View style={style.mainview}>
             <Text style={style.welcomeText}>
                 {constants.Welcome}
             </Text>
          </View>
          <View style={style.subview}>
             <Text style={style.userText}>
                 {schooldetails}
             </Text>
          </View>
          <View style={style.imgView}>
          <Image source={Images.dashboardlogo} style={style.Imageview}  resizeMode='contain'/>
          </View>
        </SafeAreaView>
    )
}