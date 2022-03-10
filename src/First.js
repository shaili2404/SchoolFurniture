import { View, Text, Button } from 'react-native';
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

const First = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>School</Text>
      <Button title="Submit" onPress={()=> navigation.navigate('Second') } />
    </View>
  );
};

export default First;
