import React from "react";
import styles from "./style";
import { View,Text,Image } from "react-native";
import Images from "../../../asset/images";
import constants from "../../../locales/constants";


export const IconBar = () =>{
    return(
        <View style={styles.imagesView}>
        <View style={styles.partImageView}>
          <Image source={Images.transactionlist} />
          <View style={styles.labelView}>
            <Text style={styles.labelText}>{constants.TransactionList}</Text>
          </View>
        </View>
        <View style={styles.subImageView}>
          <View>
            <Image source={Images.createRequestSuccess} />
            <View style={styles.labelView}>
              <Text style={styles.labelText}>{constants.createRequest}</Text>
            </View>
          </View>
          <View style={styles.arrowStyle}>
            <Image source={Images.rightArrowSuccess} />
          </View>
          <View>
            <Image source={Images.collectFurnitureScccess} />
            <View style={styles.labelView}>
              <Text style={styles.labelText}>
                {constants.coolectFurnitureRequest}
              </Text>
            </View>
          </View>
          <View style={styles.arrowStyle}>
            <Image source={Images.rightArrowSuccess} />
          </View>
          <View>
            <Image source={Images.repairReplanishSuccess} />
            <View style={styles.labelView}>
              <Text style={styles.labelText}>{constants.RepairReplnish}</Text>
            </View>
          </View>
          <View style={styles.arrowStyle}>
            <Image source={Images.rightArrowSuccess} />
          </View>
          <View>
            <Image source={Images.dilveryIconInProgress} />
            <View style={styles.labelView}>
              <Text style={styles.labelText}>{constants.DilverFurItem}</Text>
            </View>
          </View>
        </View>
      </View>
    )
}