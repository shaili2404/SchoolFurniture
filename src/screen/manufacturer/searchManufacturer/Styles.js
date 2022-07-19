import { StyleSheet } from "react-native";
import COLORS from "../../../asset/color";

export default StyleSheet.create({
  buttonStyle: {
    marginTop: 15,
    backgroundColor: COLORS.GreenBox,
    borderRadius: 40,
    height: 48,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  buttonText: {
    color: COLORS.White,
  },
  buttonView: {
    alignItems: "flex-end",
  },
  viewInputStyle: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    width: "100%",
  },
  viewInputS: {
    marginTop: 15,
    width: "100%",
  },
  dropStyle: {
    backgroundColor: COLORS.White,
    width: "48%",
    height: 40,
    paddingLeft: 10,
    marginTop: 15,
    alignSelf: "flex-start",
  },
  textStyle: {
    marginLeft: 10,
    marginTop: 10,
  },
  eyeStyle: {
    marginTop: 6,
    position: "relative",
    top:20,
     right: 50,
  },
  eyeStylee: {
    marginTop: 6,
    position: "relative",
    top:20,
     right: 30,
  },
  imgStyle: {
  },
  imgStylee: {
   
    
  },
  radioView: {
    backgroundColor: COLORS.LightGreen,
  },
  selectSearchText: {
    color: COLORS.Black,
    fontSize: 16,
    marginHorizontal: 30,
    marginTop: 20,
  },
  line: {
    borderBottomColor: COLORS.Black,
    borderBottomWidth: 0.5,
    marginHorizontal: 30,
    marginTop: 20,
  },
  radioDate: {
    marginHorizontal: 30,
  },
  radView: {
    marginTop: 10,
  },
  refrenceStyle: {
    borderRadius: 10,
    backgroundColor: COLORS.White,
    marginTop: 20,
    height: 40,
    width: "100%",
    paddingLeft: 20,
    fontSize: 12,
    borderColor: COLORS.White,
    borderWidth: 5,
  },
});
