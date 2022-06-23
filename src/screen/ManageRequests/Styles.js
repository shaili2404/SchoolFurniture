import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  mainView: {
    height: height,
    position: "relative",
    backgroundColor: COLORS.White,
  },
  lastView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    position: "absolute",
    bottom: 130,
    alignSelf: "center",
  },
  buttonStyle: {
    marginTop: 15,
    backgroundColor: COLORS.GreenBox,
    borderRadius: 40,
    height: 48,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    color: COLORS.White,
  },
  buttonView: {
    alignItems: "flex-end",
  },
  viewInputStyle: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    width: "100%",
  },
  viewInputS: {
    marginTop: 15,
    width: "100%",
  },
  dropStyle: {
    backgroundColor: COLORS.White,
    width: "48%",
    height: 40,
    paddingLeft: 10,
    marginTop: 15,
    alignSelf: "flex-start",
  },
  textStyle: {
    marginLeft: 10,
    marginTop: 10,
  },
  eyeStyle: {
    top: 20,
  },
  eyeStylee: {
    top: 20,
  },
  imgStyle: {
    marginTop: 6,
    position: "absolute",
    right: 30,
  },
  imgStylee: {
    marginTop: 6,
    position: "absolute",
    right: 30,
  },
  radioView: {
    backgroundColor: COLORS.LightGreen,
  },
  selectSearchText: {
    color: COLORS.Black,
    fontSize: 16,
    marginHorizontal: 30,
    marginTop: 20,
  },
  line: {
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.5,
    marginHorizontal: 30,
    marginTop: 20,
  },
  radioDate: {
    marginHorizontal: 30,
  },
  radView: {
    marginTop: 10,
  },
  refrenceStyle: {
    borderRadius: 10,
    backgroundColor: COLORS.White,
    marginTop: 20,
    height: 40,
    width: "100%",
    paddingLeft: 20,
    fontSize: 12,
    borderColor: COLORS.White,
    borderWidth: 5,
  },
  errorView: {
    width: "100%",
    alignContent: "center",
  },
  errormessStyle: {
    textAlign: "center",
    color: COLORS.red,
    fontSize: 22,
  },
  DateerrormessStyle: {
    marginLeft: "10%",
    color: COLORS.red,
    fontSize: 12,
  },
  dateerrorView: {
    width: "100%",
    alignContent: "flex-start",
    marginBottom: "2%",
  },
  transformStyle: { transform: [{ rotate: "180deg" }] },
  errorMsg: {
    textAlign: "center",
    color: COLORS.ThemeGreen,
    fontSize: 22,
    marginTop: 10,
  },
  errIconStyle: {
    width: 50,
    height: 50,
  },
  errorMsgView: {
    alignItems: "center",
  },
  errrorparentView: { justifyContent: "center", height: "100%" },
  noDataView: {
    backgroundColor: COLORS.LightGreen,
    height: 56,
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.4,
    width: width,
    justifyContent: "center",
  },
  noDataText: {
    fontSize: 16,
    textAlignVertical: "center",
    textAlign: "center",
  },
});
