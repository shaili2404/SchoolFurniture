import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../../asset/color";

const width = Dimensions.get("window").width;
export default StyleSheet.create({
  buttonCol: {
    backgroundColor: COLORS.ThemeGreen,
    height: 40,
    marginVertical: 10,
    justifyContent: "center",
  },
  textCOl: {
    color: COLORS.White,
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    paddingLeft: 10,
  },
  mainView: {
    backgroundColor: COLORS.White,
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
  },
  container: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "100%",
    height: 40,
    paddingLeft: 20,
    marginVertical: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  bottonView: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  checkVIew: {
    width: 25,
    height: 25,
    backgroundColor: COLORS.LightGreen,
    borderWidth: 1,
    borderColor: COLORS.GreenBorder,
  },
  cecktext: {
    fontSize: 14,
    color: COLORS.Black,
    marginTop: 2,
  },
  printView: {
    flexDirection: "row",
    alignSelf: "center",
  },
  rightTick: {
    height: 15,
    width: 15,
    alignSelf: "center",
    position: "absolute",
    top: 4,
  },
});
