import React from "react";
import constants from "../../../../locales/constants";
import styles from "./style";
import { SafeAreaView, View, Text, Image } from "react-native";
import Images from "../../../../asset/images";
import { IconBar } from "./iconbar";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TaskSection } from "./TaskSection/taskSection";
import { FooterFur } from "./Footer/footer";

export const FurnitureReplacmentProcess = () => {
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.furView}>
        <Text style={styles.furText}>
          {constants.FurnitureReplacmnetProcess}
        </Text>
      </View>
      <IconBar />
      <TaskSection
        name={constants.coolectFurnitureRequest}
        button={true}
        buttonvalue={constants.Accept}
      />
      <TaskSection
        name={constants.BrokenFurnitureItem}
        button={false}
        buttonvalue={constants.printPickupSLip}
      />
      <FooterFur/>
    </SafeAreaView>
  );
};
