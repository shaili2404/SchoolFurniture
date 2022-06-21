import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default StyleSheet.create({
  mainView: {
    height: height,
    width: width,
    alignItems: "center",
    backgroundColor: COLORS.White,
  },
  subContainer: {
    width: "90%",
    height: "100%",
    position: "relative",
  },
  loginView: {
    marginTop: "10%",
  },
  loginText: {
    color: COLORS.ThemeGreen,
    fontWeight: "bold",
    fontSize: 32,
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
  passInputStyle: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    marginEnd: 36,
    width: "100%",
    height: 70,
    paddingLeft: 20,
  },
  passInputStyles: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    marginEnd: 36,
    width: "100%",
    height: 70,
    paddingLeft: 30,
  },
  inputStyles: {
    marginTop: "15%",
  },
  inputStyless: {
    marginTop: "6%",
  },
  inputSty: {
    marginTop: "8%",
  },
  buttonStyle: {
    backgroundColor: COLORS.GreenBox,
    borderRadius: 5,
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.White,
    fontWeight: "bold",
    fontSize: 22,
  },
  ResetStyle: {
    color: COLORS.blue,
    textAlign: "right",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  changeText: {
    fontSize: 10,
  },
  changeView: {
    position: "relative",
    left: 5,
    top: 2,
    backgroundColor: COLORS.White,
    width: 90,
  },
  changeViews: {
    position: "relative",
    left: 5,
    top: 2,
    backgroundColor: COLORS.White,
    width: 90,
  },
  passView: {
    marginTop: 36,
  },
  clearStyle: {
    textAlign: "center",
    color: COLORS.blue,
    textDecorationLine: "underline",
    position: "relative",
    bottom: "5%",
    marginTop: "2%",
  },
  errorStyle: {
    color: COLORS.red,
  },
  eyeStyle: {
    alignSelf: "flex-end",
    position: "relative",
    bottom: 45,
    right: 5,
  },
  eyeStyles: {
    alignSelf: "flex-end",
    position: "relative",
    bottom: 60,
    right: 5,
  },
  imgStyle: {
    width: 20,
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
  messageStyle: {
    flexDirection: "row",
  },
  credStyle: {
    width: 200,
  },
  restpassView:{alignSelf:'flex-end'},
  clearpassView:{alignSelf:'center'},
});
