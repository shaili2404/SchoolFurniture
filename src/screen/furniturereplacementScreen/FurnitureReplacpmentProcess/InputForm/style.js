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
  changeText: {
    opacity: 0.5,
    fontSize: 12,
  },
  changeView: {
    position: "relative",
    left: 10,
    top: 3,
    backgroundColor: COLORS.White,
    width: 400,
  },
});
export default style;
