import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView,TouchableOpacity,Text,View } from 'react-native';
import constants from '../../../../locales/constants';


import style from './style';
export const StockMaintenanceScreen = ()=>{
    const navigation = useNavigation();
    return(
      <SafeAreaView style={style.container}>
           <View>
               <TouchableOpacity style={style.districtButton} onPress={()=> navigation.navigate("StockCategory")} >
                   <Text style={style.stockCategory}>
                    {constants.stockCategory}
                   </Text>
               </TouchableOpacity >
               <TouchableOpacity style={style.stockitemButton} onPress={()=> navigation.navigate("Stock Item")}  >
                   <Text style={style.stockitems}>
                   {constants.stockitems}
                   </Text>
               </TouchableOpacity>
           </View>
      </SafeAreaView>
    )
}