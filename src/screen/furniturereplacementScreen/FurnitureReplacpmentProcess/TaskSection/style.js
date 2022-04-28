import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../../../asset/color";

export default StyleSheet.create({
  mainView: {
    backgroundColor: COLORS.LightGreen,
    paddingVertical: "3%",
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
    height: 62,
  },
  textView: {
    fontWeight: "500",
    fontSize: 16,
    color: COLORS.ThemeGreen,
    marginTop: 8,
  },
  buttonView: {
    width: 100,
    height: 40,
    borderRadius: 21,
    justifyContent: "center",
    backgroundColor: COLORS.ThemeGreen,
  },
  buttonText: {
    fontWeight: "500",
    fontSize: 16,
    color: COLORS.White,
    alignSelf: "center",
  },
  pickSlip: {
    fontSize: 14,
    textDecorationLine: "underline",
    color: COLORS.Black,
    alignSelf: "center",
  },
  lastView: {
    flexDirection: "row",
    marginTop: 7,
  },
});
