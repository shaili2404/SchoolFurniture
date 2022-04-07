import React, { useEffect, useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Image,
    Platform
} from "react-native";
import COLORS from "../asset/color";
import Images from "../asset/images";
import constants from "../locales/constants";

const ShowImage = (props) => {
    const { imageModal, selectedImg, onConfirm, onBack, prevImgData, getResource } = props;
    const [newList, setnewList] = useState([]);

    useEffect(() => {
        if (prevImgData && prevImgData.length > 0) {
            if(getResource == 'Camera'){
                prevImgData.push(selectedImg)
                setnewList(prevImgData);
            }else {
                const newArr = [...prevImgData, ...selectedImg];
                let map = new Map();
                if(Platform.OS === 'ios'){
                    newArr.forEach(eachObj => map.set(eachObj.filename, eachObj));
                }else{
                    newArr.forEach(eachObj => map.set(eachObj.path.substring(eachObj.path.lastIndexOf('/') + 1), eachObj));
                }
                const uniqueArr = Array.from(map.values());
                setnewList(uniqueArr);
            }
            
        } else {
            if(getResource == 'Camera'){
                const a = [];
                a.push(selectedImg);
                setnewList(a);
            }else {
                setnewList(selectedImg);
            }
            
        }
    }, [selectedImg]);

    const onPressCross = (filename) => {
        if(Platform.OS === 'ios'){
            filterList = newList.filter((ele) => ele.filename != filename);
        }else{
            filterList = newList.filter((ele) => ele.path.substring(ele.path.lastIndexOf('/') + 1) != filename);
        }
        setnewList(filterList);
    }

    const renderItem = ({ item }) => {
        const name = Platform.OS == "ios" ? item.filename : item.path.substring(item.path.lastIndexOf('/') + 1)
        return (
            <View style={styles.item}>
                <Text style={styles.ImgName}>{name}</Text>
                <TouchableOpacity style={styles.closeView} onPress={() => onPressCross(name)}>
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
        flex: 0.8,
        fontSize: 18,
    },
    PhotoText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    PhotoContainer: {
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
    closeView: {
        flex: 0.1,
    }

});

export default ShowImage;
