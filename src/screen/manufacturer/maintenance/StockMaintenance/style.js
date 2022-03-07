import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../../../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    width: width,
    height: height,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor:COLORS.White
  },
  districtButton: {
    width: "60%",
    height: 78,
    backgroundColor: COLORS.LightGreen,
    borderColor: COLORS.borderGreen,
    borderWidth: 1,
    alignSelf: "center",
    marginBottom: "10%",
    justifyContent: "center",
    borderRadius: 39,
  },
  stockCategory: {
    fontSize: 22,
    color: COLORS.borderGreen,
    textAlign: "center",
    fontWeight: "bold",
  },
  stockitemButton: {
    width: "60%",
    height: 78,
    backgroundColor: COLORS.ThemeGreen,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 39,
  },
  stockitems: {
    fontSize: 22,
    color: COLORS.White,
    textAlign: "center",
    fontWeight: "bold",
  },
});
