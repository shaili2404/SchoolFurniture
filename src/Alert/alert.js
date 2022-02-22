import React, { useState } from "react";
import {
  TouchableOpacity,
  Alert,
  Text,
  View,
  SafeAreaView,
  Modal,
} from "react-native";
import AlertText from "./AlertText";
import Styles from "./Styles";

export const AlertMessage = (props) => {
  const [modalVisible, setModalVisible] = useState(props.modalVisible);

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={Styles.noText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={Styles.yesView}>
                    <Text style={Styles.yesText}>Yes</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={Styles.subButtonView}>
                  <TouchableOpacity
                    style={Styles.doneView}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={Styles.DoneText}>Done</Text>
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
