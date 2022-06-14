import { StyleSheet, Dimensions, Platform } from "react-native";
import COLORS from "../../../../../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default StyleSheet.create({
  mainView: {
    height: height,
    position: "relative",
    width: width,
    backgroundColor: COLORS.White,
  },
  halfView: {
    width: width,
  },

  refrenceStyle: {
    backgroundColor: COLORS.LightGreen,
    width: "100%",
    height: 70,
    paddingLeft: 20,
    fontSize: 16,
  },

  flatlistBackground: {
    backgroundColor: COLORS.LightGreen,
    flex: 1,
  },
  lastView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    marginTop: 10,
    alignSelf: "center",
  },
  lastssView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    marginTop: 10,
    position: "absolute",
    bottom: 130,
    alignSelf: "center",
  },
  plusView: {
    width: "20%",
    position: "absolute",
    bottom: Platform.OS === "android" ? 25 : 65,
    right: 10,
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
    position: "absolute",
    bottom: 25,
    right: 30,
  },

  imgsStyle: {
    width: 20,
    height: 20,
  },
  errormessStyle: {
    textAlign: "center",
    color: COLORS.red,
    fontSize: 22,
  },
  errorView: {
    width: "100%",
    alignContent: "center",
  },
  searchButton: {
    backgroundColor: COLORS.GreenBox,
    borderRadius: 5,
    width: 70,
    height: 30,
    alignSelf: "center",
    paddingTop: 5,
    marginTop: 15,
  },
  searchText: {
    color: COLORS.White,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "normal",
    fontSize: 16,
  },
  transformStyle: { transform: [{ rotate: "180deg" }] },
});
