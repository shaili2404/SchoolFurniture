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
    height: 50,
    paddingLeft: 30,
    marginTop: 15,
    borderWidth: 1,
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
    bottom: 30,
    alignSelf: "center",
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
    top: 50,
    right: 30,
  },

  imgsStyle: {
    width: 20,
    height: 20,
  },
});
