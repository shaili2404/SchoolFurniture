import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import COLORS from "../asset/color";
import Images from "../asset/images";
import constants from "../locales/constants";

const ImagePickerModal = (props) => {
  const { imageModal, setmodalVisible } = props;
  return (
    <Modal animationType="slide" transparent={true} visible={imageModal}>
      <View style={styles.mainView}>
        <View style={styles.subView}>
          <View style={styles.firstSubView}>
            <View style={styles.cammeraView}>
              <Image source={Images.cameraIcon} />
              <Text style={styles.textStyle}>{constants.camera}</Text>
            </View>
            <View style={styles.photoView}>
              <Image source={Images.photoIcon} />
              <Text style={styles.textStyle}>{constants.Photos}</Text>
            </View>
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
    </Modal>
  );
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: COLORS.graybackground,
    height: height,
    width: width,
    justifyContent: "flex-end",
  },
  subView: {
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
