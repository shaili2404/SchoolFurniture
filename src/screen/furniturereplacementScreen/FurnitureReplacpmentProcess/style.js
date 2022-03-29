import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../asset/color";
import { RFValue } from "react-native-responsive-fontsize";
import { RfW, RfH } from "../../../utils/helpers";
import Fonts from "../../../asset/Fonts";
import {
  STANDARD_SCREEN_DIMENSIONS,
  STANDARD_SCREEN_SIZE,
} from "../../../utils/constants";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default StyleSheet.create({
  mainView: {
    width: width,
    height: height,
    backgroundColor: COLORS.LightGreen,
    alignSelf: "center",
    position: "absolute",
  },
  furView: {
    width: "90%",
    backgroundColor: COLORS.LightGreen,
    alignSelf: "center",
    justifyContent: "center",
  },
  furText: {
    color: COLORS.ThemeGreen,
    fontSize: 16,
    fontWeight: "600",
    paddingVertical: "5%",
  },
  imagesView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: COLORS.White,
    alignSelf: "center",
    paddingVertical: "2%",
  },
  subImageView: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-around",
  },
  partImageView: {
    width: "10%",
    marginTop: 1,
  },
  labelView: {
    width: 60,
    marginTop: 10,
  },
  labelText: {
    fontSize: 8,
    fontWeight: "500",
  },
  arrowStyle: {
    marginTop: 10,
    marginRight: 30,
  },
  bottomView: {
    position: "relative",
    bottom: 70,
  },
  photoView: {
    backgroundColor: COLORS.White,
    alignSelf: "flex-end",
    position: "absolute",
    top: RfH(300),
    right: RfW(50),
    borderWidth: 1,
    borderStyle: "dashed",
    width: RfW(100),
    height: RfH(30),
    justifyContent: "center",
  },
  photoText: {
    textAlign: "center",
    textDecorationLine: "underline"
  },
  uploadedView: {
    backgroundColor: COLORS.White,
    alignSelf: "flex-end",
    position: "absolute",
    top: RfH(300),
    right: RfW(50),
    width: RfW(100),
    height: RfH(30),
    justifyContent: "center",
    flexDirection: 'row'
  },
  uploadedText: {
    fontSize: 14,
    padding: 2
  },
  viewAllText: {
    color: COLORS.blue,
    left: RfW(10),
    fontSize: 12,
    textDecorationLine: 'underline',
    top: 8
  },
  noOfPhoto: {
    flexDirection: 'column'
  }
});
