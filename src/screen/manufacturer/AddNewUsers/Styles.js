import { StyleSheet,  } from 'react-native';
import COLORS from '../../../asset/color';

export default StyleSheet.create({
    mainView: {
      backgroundColor: "#fff",
      flex: 1,
    },
    userPicker: {
        backgroundColor: "#F4F9F4",
        marginTop: 50,
        marginHorizontal: 30,
    },
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
      inputTextStyle: {
        borderRadius: 10,
        marginHorizontal: 30,
        // marginLeft: 30,
        // marginRight: 10,
        backgroundColor: "#F4F9F4",
        marginTop: 30,
        paddingLeft: 20,
        height:70,
        width: "90%",
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
      },
      buttonStyle: {
        backgroundColor: "#44A244",
        borderRadius: 40,
        // width: "100%",
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        marginHorizontal: 30,
      },
      buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 22,
      },
      container: {
        borderRadius: 5,
        backgroundColor: COLORS.LightGreen,
        width: "90%",
        height: 70,
        paddingLeft: 20,
        marginBottom: 20,
        alignItems: 'center',
        alignSelf:'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop:20
      },
});
