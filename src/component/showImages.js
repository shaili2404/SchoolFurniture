import React, { useEffect, useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Image
} from "react-native";
import COLORS from "../asset/color";
import Images from "../asset/images";
import constants from "../locales/constants";

const ShowImage = (props) => {
    const { imageModal, selectedImg, onConfirm, onBack, prevImgData } = props;
    const [newList, setnewList] = useState([]);

    useEffect(() => {
        if (prevImgData && prevImgData.length > 0) {
            const newArr = [...prevImgData, ...selectedImg];
            let map = new Map();
            newArr.forEach(eachObj => map.set(eachObj.filename, eachObj));
            const uniqueArr = Array.from(map.values());
            setnewList(uniqueArr);
        } else {
            setnewList(selectedImg);
        }
    }, [selectedImg]);

    const onPressCross = (filename) => {
        filterList = newList.filter((ele) => ele.filename != filename);
        setnewList(filterList);
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.ImgName}>{item.filename}</Text>
                <TouchableOpacity onPress={() => onPressCross(item.filename)}>
                    <Image source={Images.crossIcon}></Image>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <Modal animationType="slide" transparent={true} visible={imageModal}>
            <View style={styles.mainView}>
                <View style={styles.subView}>
                    <View style={styles.PhotoContainer}>
                        <Text style={styles.PhotoText}>{constants.Photos}</Text>
                    </View>
                    <FlatList
                        data={newList}
                        renderItem={renderItem}
                        keyExtractor={item => item.filename}
                    />
                    <View style={styles.subButtonView}>
                        <TouchableOpacity
                            style={styles.noView}
                            onPress={() => onBack(newList)}
                        >
                            <Text style={styles.noText}>{constants.Back}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.yesView} onPress={() => onConfirm(newList)}>
                            <Text style={styles.yesText}>{constants.nextText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    mainView: {
        backgroundColor: COLORS.transparent,
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subView: {
        backgroundColor: COLORS.LightGreen,
        height: '40%',
        width: '80%',
        borderRadius: 10
    },
    item: {
        backgroundColor: COLORS.LightGreen,
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between'
    },
    ImgName: {
        fontSize: 18,
    },
    PhotoText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    PhotoContainer: {
        height: '15%',
        padding: 10,
        borderBottomWidth: 0.5,
    },
    subButtonView: {
        flexDirection: "row",
        width: "100%",
        borderTopWidth: 0.5
    },
    yesView: {
        width: "50%",
        height: 50,
        justifyContent: "center",
    },
    yesText: {
        fontSize: 22,
        color: COLORS.AlertNoColor,
        alignSelf: "center",
    },
    noView: {
        width: "50%",
        borderRightWidth: 0.5,
        height: 50,
        justifyContent: "center",
    },
    noText: {
        fontSize: 22,
        color: COLORS.AlertYesColor,
        alignSelf: "center",
    },

});

export default ShowImage;
