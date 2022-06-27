import React from "react";
import { Image, View, StyleSheet } from "react-native";
import Images from "../asset/images";

export const LogoImg = () => {
  return (
    <View style={Styles.companyStyle}>
      <Image source={Images.CompanyLogo} />
    </View>
  );
};

const Styles = StyleSheet.create({
  companyStyle: {
    marginTop: 36,
  },
  CompanyLogo: {
    width: 291,
    height: 74,
  },
});
