import React from 'react';
import { SafeAreaView,TouchableOpacity,Text,View } from 'react-native';
import constants from '../../../../locales/constants';


import style from './style';
export const Schoolmaintenancescreen = ()=>{
    return(
      <SafeAreaView style={style.container}>
           <View>
               <TouchableOpacity style={style.districtButton}>
                   <Text style={style.districttext}>
                    {constants.SchoolDistrict}
                   </Text>
               </TouchableOpacity>
               <TouchableOpacity style={style.schoolButton}>
                   <Text style={style.schooldistrict}>
                   {constants.School}
                   </Text>
               </TouchableOpacity>
           </View>
      </SafeAreaView>
    )
}