import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../../asset/color";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "90%",
    height: 70,
    paddingLeft: 20,
    marginTop: "10%",
    marginBottom: "10%",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  mainView: {
    height: height,
    width: width,
    position: "absolute",
    backgroundColor: COLORS.White,
    flex:1
  },
  subview: {
    marginVertical: "8%",
    flexDirection: "row",
    marginHorizontal: "10%",
    justifyContent: "space-between",
  },
  createNewStyle: {
    fontSize: 18,
    fontWeight:"bold",
    color: COLORS.ThemeGreen,
    marginTop: 10,
  },
  crossImg:{
    marginTop:10
      },
  NewStyle:{
    fontSize: 14,
    color: COLORS.Black,
    marginTop: 10,
  },
  listView: {
    marginVertical: "1%",
    flexDirection: "row",
    marginHorizontal: "10%",
    justifyContent: "space-between",
  },
  qutView: {
    flexDirection: "row",
    backgroundColor: COLORS.LightGreen,
    width: 123,
    height: 40,
    justifyContent: "space-around",
    borderRadius: 39,
  },
  plusButton: {
    backgroundColor: COLORS.plusMinusColor,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 39,
    width: 40,
  },
  minusButton: {
    backgroundColor: COLORS.plusMinusColor,
    height: 40,
    justifyContent: "center",
    borderRadius: 39,
    width: 40,
    alignItems: "center",
  },
  qutStyle: {
    paddingTop: 10,
  },
  buttonStyle: {
    height: 70,
    borderRadius: 39,
    alignItems: "center",
    justifyContent: "center",
    width: 350,
  },
  buttonText: {
    color: COLORS.White,
    fontWeight: "bold",
    fontSize: 22,
  },
  backContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 30,
    width: width,
    height: '10%',
  },
  inputTextStyle: {
    borderRadius: 10,
    marginHorizontal: 30,
    backgroundColor: "#F4F9F4",
    marginTop: 30,
    paddingLeft: 20,
    height:70,
    width: "90%",
    alignItems: 'center',
    alignSelf:'center',
    justifyContent: 'center',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.2,
  },
});