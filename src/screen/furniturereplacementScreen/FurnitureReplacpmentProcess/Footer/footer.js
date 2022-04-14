import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import constants from "../../../../locales/constants";
import style from "./style";

export const FooterFur = ({
  saveButton,
  submitButton,
  onCancel,
  onSave,
  onSubmit,
}) => {
  return (
    <View style={style.mainVIew}>
      <View>
        <TouchableOpacity onPress={() => onCancel()}>
          <Text style={style.cancelText}>{constants.cancel}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => onSave()}
          style={
            saveButton ? style.buttonsaveDisableView : style.buttonsaveView
          }
          disabled={saveButton ? true : false}
        >
          <Text style={style.buttonSubmitText}>{constants.save}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={
            submitButton ? style.buttonsaveDisableView : style.buttonsaveView
          }
          disabled={submitButton ? true : false}
        >
          <Text style={style.buttonSubmitText}>{constants.submit}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
