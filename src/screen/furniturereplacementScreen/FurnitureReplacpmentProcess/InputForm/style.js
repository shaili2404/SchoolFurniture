import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../../../asset/color";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const style = StyleSheet.create({

  subContainer: {
    width: '100%',
    paddingHorizontal:40,
    position: "relative",
    backgroundColor:COLORS.White,
    alignSelf:'center'
  },
  emailInputStyle: {
    borderRadius: 5,
    backgroundColor: COLORS.LightGreen,
    width: "100%",
    height: 40,
    paddingLeft: 20,
    marginVertical: 7,
  },
  
});
export default style;
