import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../../../asset/color";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "90%",
    height: 70,
    paddingLeft: 20,
    marginBottom: 20,
    alignItems: "center",
    alignSelf:'center',
    justifyContent: "center",
    flexDirection: "column",
  },
  mainView: {
    height: height,
    width: width,
    position: "relative",
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
  emailInputStyle: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "90%",
    height: 70,
    paddingLeft: 20,
    marginBottom: 20,
    alignItems: "center",
    alignSelf:'center',
    justifyContent: "center",
  },
  addText:{
    fontSize:16,
    color:COLORS.White,
    textAlign:'center'
  },
  addButton:{
    width:100,
    height:48,
    borderRadius:39,
    justifyContent:'center',
  },
  addStyling:{
      marginRight:15,
      alignSelf:"flex-end",
  },
  searchButton:{
      width:50,
      height:50,
      borderRadius:25,
      backgroundColor:COLORS.GreenBox,
      justifyContent:'center',
      alignItems:'center'
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
      marginTop:'15%'
  },
  main: {
    flexDirection: "row",
},
firstView: {
    backgroundColor: COLORS.GreenBox,
    height: 46,
},
funcStyle: {
    width: "30%",
    marginTop: 12,
    marginHorizontal: 4,
},
textStyle: {
    fontSize: 16,
    fontWeight: "normal",
    color: COLORS.White,
    textAlign: "left",
    textAlignVertical: "center",
},
listStyle:{
    width:'90%',
    alignSelf:'center'
}
});
