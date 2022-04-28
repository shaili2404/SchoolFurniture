import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../../../asset/color";
import Fonts from "../../../../../asset/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import {
  STANDARD_SCREEN_DIMENSIONS,
  STANDARD_SCREEN_SIZE,
} from "../../../../../utils/constants";
import { RfH, RfW } from "../../../../../utils/helpers";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    borderRadius: RfH(10),
    backgroundColor: COLORS.LightGreen,
    width: "90%",
    height: RfH(70),
    paddingLeft: RfW(20),
    marginVertical: RfH(20),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  mainView: {
    height: height,
    width: width,
    position: "relative",
    backgroundColor: COLORS.White,
  },
  changeText: {
    fontSize: RFValue(10, STANDARD_SCREEN_SIZE),
  },
  changeView: {
    position: "relative",
    left: RfW(25),
    top: RfH(2),
    backgroundColor: COLORS.White,
    width: "30%",
  },
  emailInputStyle: {
    borderRadius: RfH(5),
    backgroundColor: COLORS.LightGreen,
    width: "90%",
    height: RfH(70),
    paddingLeft: RfW(20),
    marginBottom: RfH(20),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  addText: {
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
    color: COLORS.White,
    textAlign: "center",
  },
  addButton: {
    width: RfW(100),
    height: RfH(48),
    borderRadius: RfH(39),
    justifyContent: "center",
  },
  addStyling: {
    marginRight: RfH(15),
    alignSelf: "flex-end",
  },
  searchButton: {
    width: RfW(50),
    height: RfH(50),
    borderRadius: RfH(25),
    backgroundColor: COLORS.GreenBox,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInputStyle: {
    borderRadius: RfH(5),
    backgroundColor: COLORS.LightGreen,
    width: "80%",
    height: RfH(50),
    paddingLeft: RfW(20),
    marginBottom: RfH(20),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  searchBox: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  boxDefault: {
    marginTop: RfH(15),
  },
  main: {
    flexDirection: "row",
  },
  firstView: {
    backgroundColor: COLORS.GreenBox,
    height: RfH(46),
  },
  funcStyle: {
    width: "30%",
    marginTop: RfH(12),
    marginHorizontal: RfW(4),
  },
  textStyle: {
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
    fontWeight: "normal",
    color: COLORS.White,
    textAlign: "left",
    textAlignVertical: "center",
  },
  listStyle: {
    width: "90%",
    alignSelf: "center",
  },
  lastView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    marginTop: 10,
    // position: "absolute",
    // bottom: RfH(110),
    alignSelf: "center",
  },
  errormessStyle: {
    textAlign: "center",
    color: COLORS.red,
    fontSize: RFValue(22, STANDARD_SCREEN_SIZE),
  },
  errorView: {
    width: "100%",
    alignContent: "center",
  },
});
