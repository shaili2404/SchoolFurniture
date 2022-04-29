import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default StyleSheet.create({
  mainMessage: {
    fontSize: 18,
    color: COLORS.Black,
    fontWeight: "bold",
    textAlign: "center",
  },
  subContainer: {
    height: height,
    justifyContent: "center",
    //   backgroundColor:COLORS.White
  },
  alertView: {
    marginHorizontal: "20%",
    alignSelf: "center",
    position: "absolute",
    height: 200,
    width: width,
    backgroundColor: COLORS.White,

    borderRadius: 25,
    paddingTop: 50,
  },
  Container: {
    backgroundColor: COLORS.ThemeGreen,
    opacity: 0.9,
    height: height,
  },
  subMessage: {
    fontSize: 16,
    color: COLORS.Black,
    fontWeight: "normal",
    textAlign: "center",
  },
  buttonView: {
    borderTopWidth: 0.5,
    position: "absolute",
    bottom: "0%",
  },
  subButtonView: {
    flexDirection: "row",
    width: "100%",
  },
  yesView: {
    width: "50%",
    height: 50,
    justifyContent: "center",
  },
  yesText: {
    fontSize: 22,
    color: COLORS.AlertYesColor,
    alignSelf: "center",
  },
  noView: {
    width: "50%",
    borderRightWidth: 0.5,
    height: 50,
    justifyContent: "center",
  },
  doneView: {
    width: "100%",
    borderRightWidth: 0.5,
    height: 50,
    justifyContent: "center",
  },
  noText: {
    fontSize: 22,
    color: COLORS.AlertNoColor,
    alignSelf: "center",
  },
  DoneText: {
    fontSize: 22,
    color: COLORS.AlertDoneColor,
    alignSelf: "center",
  },
});
