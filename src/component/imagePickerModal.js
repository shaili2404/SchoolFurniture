import React, { useState, useEffect } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";
import COLORS from "../asset/color";
import Images from "../asset/images";
import constants from "../locales/constants";
import ImagePicker from 'react-native-image-crop-picker';
import ShowImages from "../component/showImages";

const ImagePickerModal = (props) => {
    const { imageModal, setmodalVisible, onConfirm } = props;
    const [viewImage, setViewImage] = useState(false);
    const [selectedImg, setSelectedImg] = useState([]);
    const [hideModal, setHideModal] = useState(false);
    const [imgData, setImgData] = useState([]);
    const [getResource, setGetResource] = useState("");

    openImageGallery = () => {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            setGetResource('Gallery')
            setSelectedImg(images)
            setViewImage(true);
            setHideModal(true);
            console.log("imagegal",images)
        });
    }

    openImageCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            // cropping: true,
        }).then(image => {
            setGetResource('Camera')
            setSelectedImg(image)
            setViewImage(true);
            setHideModal(true);
            console.log("imagecam",image)
        }).catch(err => {
            console.log(err, "err")
        })
    }

    const onBack = (data) => {
        setImgData(data);
        setHideModal(false);
        setViewImage(false);
    }

    return (
        <Modal animationType="slide" transparent={true} visible={imageModal}>
            {hideModal ? <View style={styles.hideContainer}></View> :
                <View style={styles.mainContainer}>
                    <View style={styles.subContainer}>
                        <View style={styles.firstSubView}>
                            <TouchableOpacity style={styles.cammeraView} onPress={() => openImageCamera()}>
                                <Image source={Images.cameraIcon} />
                                <Text style={styles.textStyle}>{constants.camera}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.photoView} onPress={() => openImageGallery()}>
                                <Image source={Images.photoIcon} />
                                <Text style={styles.textStyle}>{constants.Photos}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.firstSubView}>
                            <TouchableOpacity
                                style={styles.cancelView}
                                onPress={() => setmodalVisible(false)}
                            >
                                <Text style={styles.cancelStyle}>{constants.cancel}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
            {imageModal ?
                <ShowImages
                    imageModal={viewImage}
                    setmodalVisible={(val) => setViewImage(val)}
                    selectedImg={selectedImg}
                    onConfirm={(data) => { onConfirm(data) }}
                    onBack={(getPrevImgData) => onBack(getPrevImgData)}
                    prevImgData={imgData}
                    getResource={getResource}
                />
                : null}
        </Modal>
    );
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
    hideContainer: {
        backgroundColor: COLORS.transparent,
        height: height,
        width: width,
        justifyContent: "flex-end",
    },
    mainContainer: {
        backgroundColor: COLORS.graybackground,
        height: height,
        width: width,
        justifyContent: "flex-end",
    },
    subContainer: {
        backgroundColor: COLORS.viewGray,
    },
    cammeraView: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        padding: 15,
    },
    cancelView: {
        padding: 15,
        alignSelf: "center",
    },
    photoView: {
        flexDirection: "row",
        padding: 15,
    },
    firstSubView: {
        backgroundColor: COLORS.LightGreen,
        margin: 10,
        borderRadius: 20,
    },
    textStyle: {
        fontSize: 22,
        fontWeight: "300",
        marginLeft: 20,
    },
    cancelStyle: {
        fontSize: 22,
        fontWeight: "400",
        color: COLORS.blue,
    },
});

export default ImagePickerModal;

