import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../../../asset/color";

const style = StyleSheet.create({
  subContainer: {
    width: "100%",
    paddingHorizontal: 40,
    position: "relative",
    backgroundColor: COLORS.White,
    alignSelf: "center",
  },
  emailInputStyle: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "100%",
    height: 55,
    paddingLeft: 20,
    marginVertical: 2,
  },
  emailInputessStyle: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "50%",
    height: 55,
    paddingLeft: 20,
    marginBottom: 10,
  },
  emailIn:{
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "50%",
    height: 55,
    paddingLeft: 20,
    marginBottom: 10,
    borderWidth:2,
    borderColor:COLORS.GreenBorder,
  },
  changeText: {
    opacity: 0.5,
    fontSize: 12,
  },
  changeTextsss: {
    opacity: 1,
    fontSize: 12,
    fontWeight:'bold',
    color:COLORS.Black
  },
  changeView: {
    position: "relative",
    left: 1,
    top: 1,
    backgroundColor: COLORS.White,
    width: 400,
  },
});
export default style;
