import { StyleSheet } from "react-native";
import COLORS from "../../../../asset/color";

export default StyleSheet.create({
    inputTxtStyle: {
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
      mainView: {
        backgroundColor: "#fff",
        flex: 1,
      },
      buttonStyle: {
        marginTop: 30,
        backgroundColor: "#44A244",
        borderRadius: 40,
        height: 48,
        width: 120,
        alignItems: "center",
        justifyContent: "center",
        // marginBottom: 20,
        marginHorizontal: 20,
      },
      buttonText: {
        color: "#fff",
      },
      buttonView: {
        alignItems: "flex-end",
      },

});