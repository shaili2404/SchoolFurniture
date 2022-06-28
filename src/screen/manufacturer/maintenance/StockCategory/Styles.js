import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../../asset/color";
import Fonts from "../../../../asset/Fonts";
import { RFValue } from "react-native-responsive-fontsize";
import { STANDARD_SCREEN_SIZE } from "../../../../utils/constants";
import { RfH, RfW } from "../../../../utils/helpers";

export default StyleSheet.create({
  inputTxtStyle: {
    borderRadius: 10,
    marginHorizontal: RfW(30),
    backgroundColor: "#F4F9F4",
    marginTop: RfH(30),
    paddingLeft: RfW(20),
    height: 70,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  mainView: {
    backgroundColor: "#fff",
    flex: 1,
    height: Dimensions.get("window").height,
  },
  buttonStyle: {
    marginTop: RfH(30),
    backgroundColor: "#44A244",
    borderRadius: 40,
    height: 48,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 20,
    marginHorizontal: RfW(20),
  },
  buttonText: {
    color: "#fff",
    fontFamily: Fonts.semiBold,
    fontSize: RFValue(16, STANDARD_SCREEN_SIZE),
  },
  buttonView: {
    alignItems: "flex-end",
  },
  listStyle: {
    width: "90%",
    alignSelf: "center",
  },
  changeText: {
    fontSize: 10,
  },
  changeView: {
    position: "relative",
    left: 25,
    top: 2,
    backgroundColor: COLORS.White,
    width: 90,
  },
  boxDefault: {
    marginTop: "10%",
  },
  searchInputStyle: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "80%",
    height: 50,
    paddingLeft: RfW(20),
    marginBottom: RfH(20),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  searchBox: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  searchButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.GreenBox,
    justifyContent: "center",
    alignItems: "center",
  },
  errorView: {
    width: "100%",
    alignContent: "center",
  },
  errormessStyle: {
    textAlign: "center",
    color: COLORS.red,
    fontSize: 22,
  },
  lastView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    marginTop: 10,
    alignSelf: "center",
  },
  lastssView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "30%",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  transformStyle: { transform: [{ rotate: "180deg" }] },
});
