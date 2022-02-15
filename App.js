import React from 'react';
import 'react-native-gesture-handler';
import {
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './src/routes';

// const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
    <Provider store={store}>
    <AppStack />
      {/* <View>
        <Text>
          Get App
        </Text>
      </View> */}
    </Provider>
    </NavigationContainer>
  )
}

export default App;
