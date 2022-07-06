import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../../asset/color";
import { RfH, RfW } from "../../../../utils/helpers";

const width = Dimensions.get("window").width;
export default StyleSheet.create({
  buttonCol: {
    backgroundColor: COLORS.certificateboxGreen,
    height: 40,
    marginVertical: 10,
    justifyContent: "center",
    borderRadius: 5,
  },
  buttonColopacity: {
    backgroundColor: COLORS.certificateboxGreen,
    opacity:0.5,
    height: 40,
    marginVertical: 10,
    justifyContent: "center",
    borderRadius: 5,
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
    marginLeft: 5,
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
  checkboxRightStyle: {
    height: 15,
    width: 15,
    alignSelf: "center",
    position: "absolute",
    top: 4,
  },
  photoText: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
  uploadedView: {
    backgroundColor: COLORS.White,
    width: '100%',
    height: RfH(30),
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  uploadedText: {
    fontSize: 14,
    padding: 2,
  },
  viewAllText: {
    color: COLORS.blue,
    fontSize: 18,
    paddingLeft:10,
    textDecorationLine: "underline",
  },
  noOfPhoto: {
    // flexDirection: "column",
  },
  textStyle: {
    fontSize: 10,
    padding: 10,
    color: COLORS.ThemeGreen,
    textAlign: "center",
  },
  noDataView: {
    backgroundColor: COLORS.LightGreen,
    height: 56,
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.4,
    width: width,
    justifyContent: "center",
  },
  noDataText: {
    fontSize: 16,
    textAlignVertical: "center",
    textAlign: "center",
  },
  photoView: {
    backgroundColor: COLORS.White,
    borderWidth: 1,
    borderStyle: "dashed",
    width: '100%',
    height: RfH(30),
    justifyContent: "center",
  },
  redText:{
    fontSize:16,
    color:COLORS.red,
    padding:10
  }
});
