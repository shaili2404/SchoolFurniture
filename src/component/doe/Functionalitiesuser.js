import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View,Text, Dimensions } from "react-native";
import COLORS from '../../asset/color'

export const Functionalities = (props)=>{
    const [create,setCreate] = useState(props.create)
    const [read,setRead] = useState(props.read)
    const [update,setUpdate] = useState(props.update)
    const [deletes,setDeletes] = useState(props.deletes)
    return(
     <SafeAreaView style={styles.mainView}>
         <View style={styles.subView}>
             <Text style={styles.textStyles}>Furniture Replacment - Collect Furniture item </Text>
         </View>
         <View style={styles.submainView}>
             <View style={styles.unclickView}>
                 
             </View>
             <View style={styles.clickView}></View>
             <View style={styles.clickView}></View>
             <View style={styles.clickView}></View>
             <View style={styles.clickView}></View>

         </View>
         
     </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainView:{
        backgroundColor:COLORS.LightGreen,
        paddingTop:10
    },
    subView:{
        paddingHorizontal:36
    },
    textStyles:{
        fontSize:13
    },
    clickView:{
        width:'15%',
        height:50,
        borderWidth:0.5
    },
    unclickView:{
      width:'40%',
      height:50,
      borderWidth:0.5
    },
    submainView:{
        flexDirection:'row',
        width:Dimensions.get('window').width,
        marginTop:20
    }
})