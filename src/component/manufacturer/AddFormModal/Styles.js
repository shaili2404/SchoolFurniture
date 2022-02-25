import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../../../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const style = StyleSheet.create({
  mainView: {
    height: height,
    width: width,
    alignItems: "center",
    position: "relative",
    flex: 1
  },
  subContainer: {
    width: "90%",
    height: "90%",
  },
  textContainer: {
    marginTop: '10%'
  },
  emailInputStyle: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "100%",
    height: 70,
    paddingLeft: 20,
    marginBottom: 20,
  },
  emailInputStyles: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "100%",
    height: 70,
    paddingLeft: 30,
  },
  EditText: {
    fontWeight: "bold",
    fontSize: 22,
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  backContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    width: "90%",
    height: '10%'
  },

});
export default style;