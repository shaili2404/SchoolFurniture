import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../asset/color";
import { RfW, RfH } from "../../../utils/helpers";


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
    height: 62,
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
    bottom: 60,
  },
  photoView: {
    backgroundColor: COLORS.White,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 10,
    right: RfW(40),
    borderWidth: 1,
    borderStyle: "dashed",
    width: RfW(124),
    height: RfH(54),
    justifyContent: "center",
  },
  addplusView: {
    backgroundColor: COLORS.White,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 2,
    right: RfW(0),
    width: RfW(164),
    height: RfH(75),
    justifyContent: "center",
  },
  photoText: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
  responsiveHiegth: { height: 230 },
  photoText: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
  uploadedView: {
    backgroundColor: COLORS.White,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 10,
    right: RfW(40),
    width: RfW(124),
    height: RfH(54),
    justifyContent: "center",
    flexDirection: "row",
  },
  uploadedText: {
    fontSize: 14,
    padding: 2,
  },
  viewAllText: {
    color: COLORS.blue,
    left: RfW(10),
    fontSize: 12,
    textDecorationLine: "underline",
    top: 8,
  },
  noOfPhoto: {
    flexDirection: "column",
  },
  textStyle: {
    fontSize: 10,
    padding: 10,
    color: COLORS.ThemeGreen,
    textAlign: "center",
  },
  noDataView:{
    backgroundColor:COLORS.LightGreen,
    height: 56,
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.4,
    width:width,
    justifyContent:'center'
  },
  noDataText:{
    fontSize:16,
    textAlignVertical:'center',
    textAlign:'center'
  },
  buttonStyle: {
    backgroundColor: COLORS.GreenBox,
    borderRadius: 5,
    width: "60%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft:30
  },
  buttonText: {
    color: COLORS.White,
    fontWeight: "bold",
    fontSize: 14,
  },
});
