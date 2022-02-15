import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../asset/color";
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const style = StyleSheet.create({
    mainView: {
        paddingEnd: 36,
        marginHorizontal: 36,
        width: width - 36,
        hiegth: height,
    },
    textContainer: {
        marginTop: 133,
    },
    emailInputStyle: {
        borderRadius: 5,
        backgroundColor: COLORS.LightGreen,
        width: '100%',
        height: 70,
        paddingLeft: 20
    },
    resetText: {
        fontWeight: 'bold',
        fontSize: 32,
        color: COLORS.ThemeGreen
    },
    buttonStyle: {
        backgroundColor: COLORS.GreenBox,
        borderRadius: 5,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: COLORS.White,
        fontWeight: 'bold',
        fontSize: 22,
    },
    inputStyles: {
        marginTop: 30
    },
    backContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        //marginTop: '99%'
    },
    BackText: {
        fontSize: 16,
        color: COLORS.blue,
        textDecorationLine: "underline",
        textAlignVertical: 'bottom'
    },
    errorStyle: {
        color: COLORS.red
    },
})
export default style