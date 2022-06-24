import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../../../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default StyleSheet.create({
  mainView: {
    position: "relative",
    backgroundColor: COLORS.White,
    height: height,
    width: width,
  },

  mainViews: {
    position: "relative",
    backgroundColor: COLORS.White,
  },
  halfView: {
    backgroundColor: COLORS.LightGreen,
    width: width,
  },
  searchButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    width: "90%",
    paddingEnd: 20,
    paddingBottom: 10,
  },

  transactionText: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },

  lastView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    marginTop: 10,
    position: "absolute",
    bottom: 130,
    alignSelf: "center",
  },
  lastViews: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    position: "absolute",
    bottom: 130,
    alignSelf: "center",
  },
  mainVIew:{
    flexDirection:'row',

  },
  dashbarimagesicon:{
    marginTop: 10, 
    height:30
  }
});
