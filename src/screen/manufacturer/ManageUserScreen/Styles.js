import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default StyleSheet.create({
  mainView: {
    height: height,
    position: "relative",
  },
  halfView: {
    width: width,
  },

  refrenceStyle: {
    backgroundColor: COLORS.LightGreen,
    width: "100%",
    height: 70,
    paddingLeft: 30,
    marginTop: 15,
    fontSize: 16,
  },

  flatlistBackground: {
    backgroundColor: COLORS.LightGreen,
    flex: 1,
  },
  lastView: {
    flexDirection: "row",
    justifyContent:'space-between',
    width: "30%",
    position: "absolute",
    bottom: 130,
    alignSelf: "center",
  },
  plusView: {
    width: "20%",
    position: "absolute",
    bottom:65,
    right:0
  },
  lastText: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.ThemeGreen,
  },
  eyeStyle: {
    alignSelf: "flex-end",
    position: "relative",
    bottom: 45,
    right: 30,
  },

  imgsStyle: {
    width: 20,
    height: 20,
  },
  errormessStyle:{
    textAlign:'center',
    color:COLORS.red,
    fontSize:22
  },
  errorView:{
    width:'100%',
    alignContent:'center'
  }
});
