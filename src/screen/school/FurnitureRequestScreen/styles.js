import { StyleSheet,Dimensions } from "react-native";
import COLORS from "../../../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default StyleSheet.create({
  mainView: {
    hiegth: height,
  },
  halfView: {
    backgroundColor: COLORS.LightGreen,

    width: width,
  },
  searchButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    width: width - 20,
    paddingEnd: 20,
  },
  refView: {
    marginHorizontal: 20,
    width: width - 20,
    paddingEnd: 20,
  },
  transactionText: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "normal",
    marginTop: 20,
  },
  searchButton: {
    backgroundColor: COLORS.GreenBox,
    borderRadius: 5,
    width: 70,
    height: 30,
    alignSelf: "flex-end",
    paddingTop: 5,
    marginTop: 15,
  },
  searchText: {
    color: COLORS.White,
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "normal",
    fontSize: 16,
  },
  refrenceStyle: {
    backgroundColor: COLORS.White,
    width: "100%",
    height: 40,
    paddingLeft: 20,
    marginTop: 15,
  },
  viewInputStyle: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "space-between",
    marginHorizontal: 20,
    width: width - 20,
    paddingEnd: 20,
  },
  dropStyle: {
    backgroundColor: COLORS.White,
    width: "45%",
    height: 40,
    paddingLeft: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  dropsStyle: {
    backgroundColor: COLORS.White,
    width: "45%",
    height: 40,
    marginLeft:20,
    paddingLeft: 10,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  flatlistBackground: {
    backgroundColor: COLORS.LightGreen,
    flex: 1,
  },
  lastView: {
    marginHorizontal: 20,
    width: width - 20,
    paddingEnd: 20,
    paddingTop: 10,
  },
  lastText: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    textAlignVertical: "center",
    color: COLORS.ThemeGreen,
  },
  lastButton: {
    width: 342,
    height: 78,
    borderColor: COLORS.borderGreen,
    borderWidth: 1.5,
    borderRadius: 5,
    paddingVertical: 20,
  },
  eyeStyle: {
    position: "relative",
    top: 20,
    right: 30,
  },
  imgStyle: {
    width: 20,
  },
  imgsStyle: {
    width: 20,
    height:10
  },
});
