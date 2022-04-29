import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../asset/color";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  mainview: {
    width: width,
    marginTop: 60,
  },
  subview: {
    width: width,
    marginTop: 10,
  },
  firstContainer: {
    backgroundColor: COLORS.White,
    height: height,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.Black,
  },
  userText: {
    color: COLORS.Dashboard_green,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
  },
  imgView: {
    height: "60%",
    justifyContent: "center",
  },
  Imageview: {
    width: width,
  },
});
