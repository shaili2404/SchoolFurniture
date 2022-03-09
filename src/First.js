import { View, Text, Button } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import constants from "./locales/constants";


const First = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    let title = constants.dashboard
    navigation.setOptions({ title });
  }, []);

  return (
    <View style={{ height: '100%', justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Welcome</Text>
      {/* <Button title="Submit" onPress={()=> navigation.navigate('Second') } /> */}
    </View>
  );
};

export default First;
