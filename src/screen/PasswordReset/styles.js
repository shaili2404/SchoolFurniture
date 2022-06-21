import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const style = StyleSheet.create({
  mainView: {
    height: height,
    width: width,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  subContainer: {
    width: "90%",
    height: "100%",
    position: "relative",
  },
  textContainer: {
    marginTop: 133,
  },
  emailInputStyle: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "100%",
    height: 70,
    paddingLeft: 20,
  },
  emailInputStyles: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "100%",
    height: 70,
    paddingLeft: 30,
  },
  resetText: {
    fontWeight: "bold",
    fontSize: 32,
    color: COLORS.ThemeGreen,
  },
  buttonStyle: {
    backgroundColor: COLORS.GreenBox,
    borderRadius: 5,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: COLORS.White,
    fontWeight: "bold",
    fontSize: 22,
  },
  inputStyles: {
    marginTop: 30,
  },
  BackText: {
    fontSize: 16,
    color: COLORS.blue,
    textDecorationLine: "underline",
    textAlignVertical: "bottom",
  },
  errorStyle: {
    color: COLORS.red,
  },
  errIcon: {
    position: "relative",
    alignSelf: "flex-start",
    bottom: 45,
    left: 5,
    marginRight: 30,
  },
  errIconStyle: {
    width: 20,
    height: 20,
  },
  credStyle: {
    width: 400,
  },
  errorStyle: {
    color: COLORS.red,
  },
  clearStyle: {
    textAlign: "center",
    color: COLORS.blue,
    marginTop: 10,
    textDecorationLine: "underline",
  },
  backContainer: {
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: "5%",
    width: "40%",
  },
});
export default style;
