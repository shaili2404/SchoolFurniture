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
  disableStyle: {
    backgroundColor: COLORS.GreenBox,
    borderRadius: 5,
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5
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
  container: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "100%",
    height: 70,
    paddingLeft: 20,
    marginBottom: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  eyeStyle: {
    position: "relative",
    bottom: 55,
    left: 310,
  },
  imgsStyle: {
    width: 20,
    height: 10
  },
  mandatory: {
    fontWeight: 'bold'
  },
  changeView: {
    position: "relative",
    left: 10,
    top: 3,
    backgroundColor: COLORS.White,
    width: 400,
  },
  errorcol:{
    color:COLORS.red,
    fontSize:14,
    position:'absolute',
    bottom:8,
    left:5
  }
});
export default style;