import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../../asset/color";

export default StyleSheet.create({
  bottomIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  bottomIcon1: {
    position: "absolute",
    right: 0,
    bottom: 110,
  },
  pieView: {
    flexDirection: "row",
  },
  pieViewss: {
    backgroundColor: COLORS.White,
    alignSelf: "center",
    width: Dimensions.get("window").width,
    height: 250,
    borderRadius: 20,
    marginRight: 10,
  },
  textchart: {
    marginLeft: 20,
    marginTop: 40,
    fontWeight: "bold",
  },
  dashgraphView: {
    backgroundColor: COLORS.White,
    alignSelf: "center",
    width: "95%",
    borderRadius: 20,
    marginVertical: 20,
  },
  barchartView: {
    backgroundColor: COLORS.White,
    alignSelf: "center",
    width: "95%",
    borderRadius: 20,
  },
});
