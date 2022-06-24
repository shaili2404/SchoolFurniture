import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../../asset/color";
const height = Dimensions.get('window').height

export default StyleSheet.create({
  bottomIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  bottomIcon1: {
    position: "absolute",
    right: 0,
    bottom: 110,
  },
  pieView: {
    flexDirection: "row",
  },
  pieViewss: {
    backgroundColor: COLORS.White,
    alignSelf: "center",
    width: Dimensions.get("window").width,
    height: 250,
    borderRadius: 20,
    marginRight: 10,
  },
  textchart: {
    marginLeft: 20,
    marginTop: 40,
    fontWeight: "bold",
  },
  dashgraphView: {
    backgroundColor: COLORS.White,
    alignSelf: "center",
    width: "95%",
    borderRadius: 20,
    marginVertical: 20,
  },
  barchartView: {
    backgroundColor: COLORS.White,
    alignSelf: "center",
    width: "95%",
    borderRadius: 20,
  },
  dashbarchart: { 
    marginLeft: 20, 
    marginTop: 40, 
    fontWeight: "bold" ,

  },
  mainsecView: {
    position: "relative",
    backgroundColor: COLORS.White,
    flex: 1,
  },
  errIconStyle: {
    width: 50,
    height: 50,
  },
  errorMsgView: {
    alignItems: 'center',
    justifyContent:'center',
    height:height
  },
  errorMsg: {
    textAlign: 'center', 
    color: COLORS.ThemeGreen, 
    fontSize: 22,
    marginTop: 10
  },
  mainVIew:{
    flexDirection:'row',

  },
  dashbarimagesicon:{
    marginTop: 30, 
    height:30
  }
});
