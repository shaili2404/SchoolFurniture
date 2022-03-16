import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../../../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  mainVIew: {
    backgroundColor: COLORS.White,
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    paddingHorizontal: "10%",
  },
  buttonsaveView: {
    width: 90,
    height: 50,
    borderRadius: 21,
    justifyContent: "center",
    backgroundColor: COLORS.ThemeGreen,
    alignSelf: "center",
  },
  buttonsaveDisableView: {
    width: 90,
    height: 50,
    borderRadius: 21,
    justifyContent: "center",
    backgroundColor: COLORS.ThemeGreen,
    alignSelf: "center",
    opacity:0.5
  },
  buttonSaveText: {
    fontWeight: "500",
    fontSize: 16,
    color: COLORS.White,
    alignSelf: "center",
  },
  buttonSubmitText: {
    fontWeight: "500",
    fontSize: 16,
    color: COLORS.White,
    alignSelf: "center",
  },
  cancelText: {
    marginTop: 10,
    textDecorationLine: "underline",
    fontSize: 18,
  },
});
