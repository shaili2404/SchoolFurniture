import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Modal,
} from "react-native";
import Styles from "./Styles";
import constants from "../locales/constants";

export const AlertMessage = (props) => {
  const { visible, setmodalVisible, onConfirm } = props;

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <SafeAreaView style={Styles.Container}>
        <View style={Styles.subContainer}>
          <View style={Styles.alertView}>
            <Text style={Styles.mainMessage}>{props.mainMessage}</Text>
            <Text style={Styles.subMessage}>{props.subMessage}</Text>
            <View style={Styles.buttonView}>
              {props.type === "question" ? (
                <View style={Styles.subButtonView}>
                  <TouchableOpacity
                    style={Styles.noView}
                    onPress={() => setmodalVisible(false)}
                  >
                    <Text style={Styles.noText}>{constants.No}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.yesView} onPress={() => onConfirm()}>
                    <Text style={Styles.yesText}>{constants.Yes}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={Styles.subButtonView}>
                  <TouchableOpacity
                    style={Styles.doneView}
                    onPress={() => setmodalVisible(false)}
                  >
                    <Text style={Styles.DoneText}>{constants.Done}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};