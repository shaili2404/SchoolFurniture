import React from "react";
import styles from "./style";
import { View, Text, Image } from "react-native";
import Images from "../../../asset/images";
import constants from "../../../locales/constants";
import { TouchableOpacity } from "react-native-gesture-handler";

export const IconBar = ({
  createRequestIcon,
  collectFurItem,
  repairIcon,
  dilverFurIcon,
  onTransactionListPress,

}) => {
  return (
    <View style={styles.imagesView}>
      <View style={styles.partImageView}>
        <TouchableOpacity onPress={()=>onTransactionListPress()}>
        <Image source={Images.transactionlist} />
        </TouchableOpacity>
        <View style={styles.labelView}>
          <Text style={styles.labelText}>{constants.TransactionList}</Text>
        </View>
      </View>
      <View style={styles.subImageView}>
        <View>
          {createRequestIcon === constants.inprogress ? (
            <Image source={Images.createRequestInprogress} />
          ) : (
            <Image source={Images.createRequestSuccess} />
          )}
          <View style={styles.labelView}>
            <Text style={styles.labelText}>{constants.createRequest}</Text>
          </View>
        </View>
        <View style={styles.arrowStyle}>
          {createRequestIcon === constants.inprogress ? (
            <Image source={Images.rightarrowBlack} />
          ) : (
            <Image source={Images.rightArrowSuccess} />
          )}
        </View>
        <View>
          {collectFurItem == constants.inprogress ? (
            <Image source={Images.collectFurnitureInprogress} />
          ) : (
            <>
              {collectFurItem == constants.success ? (
                <Image source={Images.collectFurnitureScccess} />
              ) : (
                <Image source={Images.collectFurnitureIcon} />
              )}
            </>
          )}

          <View style={styles.labelView}>
            <Text style={styles.labelText}>
              {constants.collectFurnitureRequest}
            </Text>
          </View>
        </View>
        <View style={styles.arrowStyle}>
          {collectFurItem == constants.success ? (
            <Image source={Images.rightArrowSuccess} />
          ) : (
            <Image source={Images.rightarrowBlack} />
          )}
        </View>
        <View>
          {repairIcon == constants.inprogress ? (
            <Image source={Images.repairReplanishInprogress} />
          ) : (
            <>
              {repairIcon == constants.success ? (
                <Image source={Images.repairReplanishSuccess} />
              ) : (
                <Image source={Images.repairReplanishIcon} />
              )}
            </>
          )}

          <View style={styles.labelView}>
            <Text style={styles.labelText}>{constants.RepairReplnish}</Text>
          </View>
        </View>
        <View style={styles.arrowStyle}>
          {repairIcon == constants.success ? (
            <Image source={Images.rightArrowSuccess} />
          ) : (
            <Image source={Images.rightarrowBlack} />
          )}
        </View>
        <View>
          {dilverFurIcon == constants.inprogress ? (
            <Image source={Images.dilveryIconInProgress} />
          ) : (
            <Image source={Images.dilveryIcon} />
          )}
          <View style={styles.labelView}>
            <Text style={styles.labelText}>{constants.DilverFurItem}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
