import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView,TouchableOpacity,Text,View } from 'react-native';
import constants from '../../../../locales/constants';


import style from './style';
export const Schoolmaintenancescreen = ()=>{
    const navigation = useNavigation();
    return(
      <SafeAreaView style={style.container}>
           <View>
               <TouchableOpacity style={style.districtButton} onPress={()=>navigation.navigate('School District')}>
                   <Text style={style.districttext}>
                    {constants.SchoolDistrict}
                   </Text>
               </TouchableOpacity >
               <TouchableOpacity style={style.schoolButton} onPress={()=>navigation.navigate('School')}>
                   <Text style={style.schooldistrict}>
                   {constants.School}
                   </Text>
               </TouchableOpacity>
           </View>
      </SafeAreaView>
    )
}