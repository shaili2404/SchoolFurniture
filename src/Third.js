import { View, Text, Button } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import constants from "./locales/constants";
import Fonts from './asset/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { STANDARD_SCREEN_SIZE } from './utils/constants';


const Third = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    let title = 'Search'
    navigation.setOptions({ title });
  }, []);

  return (
    <View style={{ height: '100%', justifyContent: 'center', backgroundColor: '#fff', 
  }}>
      <Text style={{ textAlign: 'center', fontFamily: Fonts.bold, fontSize: RFValue(18, STANDARD_SCREEN_SIZE)    }}>Search</Text>
      {/* <Button title="Submit" onPress={()=> navigation.navigate('Second') } /> */}
    </View>
  );
};

export default Third;