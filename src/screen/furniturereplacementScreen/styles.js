import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default StyleSheet.create({
  mainView: {
    height: height,
    position: 'relative'
  },
  halfView: {
    backgroundColor: COLORS.LightGreen,
    width: width,
  },
  searchButtonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    width: '90%',
    paddingEnd: 20,
  },
  refView: {
    width: '90%',
    flexDirection:'row',
    justifyContent:"space-between",
    alignSelf:'center'
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
    width: "45%",
    height: 40,
    paddingLeft: 20,
    marginTop: 15,
  },
  viewInputStyle: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
    width: '90%',
    alignSelf:'center'
  },
  viewInputS: {
    marginVertical: 10,
    marginHorizontal: 20,
    width: '100%',
  },
  dropStyle: {
    backgroundColor: COLORS.White,
    width: "45%",
    height: 40,
    paddingLeft: 20,
    marginTop: 15,
  },
  dropsssssStyle: {
    backgroundColor: COLORS.White,
    width: "45%",
    height: 40,
    paddingLeft: 20,
  },
  dropS: {
    backgroundColor: COLORS.White,
    width: "90%",
    height: 40,
    paddingLeft: 10,
    marginTop: 15,
    alignSelf: "flex-start",
  },
  textStyle:{
    marginTop:10
  } , 
  dropsStyle: {
    backgroundColor: COLORS.White,
    width: "45%",
    height: 40,
    marginLeft: 20,
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
    width: '80%',
    paddingEnd: 20,
    paddingTop: 10,
    position: 'absolute',
    bottom: 30
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
    top: 10,
    right: 30,
  },
  dropdowwnButton: {
    position: "absolute",
    bottom: 15,
left:310  },
  imgStyle: {
    // width: 20,
  },
  imgsStyle: {
    width: 20,
    height: 10
  },
  lastView: {
    flexDirection: "row",
    justifyContent:'space-between',
    width: "30%",
    position: "absolute",
    bottom: 130,
    alignSelf: "center",
  },
  plusView: {
    flexDirection: "row",
    justifyContent: 'flex-end',
    width: "100%",
    position: "absolute",
    bottom: 85,
  },
});
