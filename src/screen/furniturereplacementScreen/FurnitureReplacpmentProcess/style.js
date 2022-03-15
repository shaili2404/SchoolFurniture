import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../asset/color";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
export default StyleSheet.create({
    mainView:{
        width:width,
        height:height,
        backgroundColor:COLORS.LightGreen,
        alignSelf:'center',
        position:'absolute'
    },
    furView:{
     width:'90%',
     backgroundColor:COLORS.LightGreen,
     alignSelf:'center',
     justifyContent:'center'
    },
    furText:{
        color:COLORS.ThemeGreen,
        fontSize:16,
        fontWeight:'600',
        paddingVertical:'5%',
    },
    imagesView:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-around',
        backgroundColor:COLORS.White,
        alignSelf:'center',
        paddingVertical:'5%'
    },
    subImageView:{
        flexDirection:'row',
        width:'70%',
        justifyContent:'space-around',
    },
    partImageView:{
        width:'10%',
        alignSelf:'center'
    },
    labelView:{
     width:60,
     marginTop:10

    },
    labelText:{
        fontSize:8,
        fontWeight:'500'
    },
    arrowStyle:{
      marginTop:10,
      marginRight:30
    },
    bottomView:{
     position:'relative',
     bottom:70,
    }
})