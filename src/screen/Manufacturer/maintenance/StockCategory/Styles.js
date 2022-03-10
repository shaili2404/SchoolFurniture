import { StyleSheet } from "react-native";
import COLORS from "../../../../asset/color";

export default StyleSheet.create({
    inputTxtStyle: {
        borderRadius: 10,
        marginHorizontal: 30,
        backgroundColor: "#F4F9F4",
        marginTop: 30,
        paddingLeft: 20,
        height:70,
        width: "90%",
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
      },
      mainView: {
        backgroundColor: "#fff",
        flex: 1,
      },
      buttonStyle: {
        marginTop: 30,
        backgroundColor: "#44A244",
        borderRadius: 40,
        height: 48,
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        // marginBottom: 20,
        marginHorizontal: 20,
      },
      buttonText: {
        color: "#fff",
      },
      buttonView: {
        alignItems: "flex-end",
      },
      listStyle:{
        width:'90%',
        alignSelf:'center'
    },
    changeText: {
      fontSize: 10,
    },
    changeView: {
      position: "relative",
      left: 25,
      top: 2,
      backgroundColor: COLORS.White,
      width: 90,
    },
    boxDefault:{
      marginTop:'10%'
    },
    searchInputStyle: {
      borderRadius: 5,
      backgroundColor: COLORS.LightGreen,
      width: "80%",
      height: 50,
      paddingLeft: 20,
      marginBottom: 20,
      alignItems: "center",
      alignSelf:'center',
      justifyContent: "center",
    },
    searchBox:{
        flexDirection:'row',
        width:'90%',
        justifyContent:'space-between',
        alignSelf:'center',
    },
    searchButton:{
      width:50,
      height:50,
      borderRadius:25,
      backgroundColor:COLORS.GreenBox,
      justifyContent:'center',
      alignItems:'center'
  },
  errorView: {
    width: '100%',
    alignContent: 'center'
  },
  errormessStyle: {
    textAlign: 'center',
    color: COLORS.red,
    fontSize: 22
  },
  lastView: {
    flexDirection: "row",
    justifyContent: 'space-between',
    width: "30%",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },

});