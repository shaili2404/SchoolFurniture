import React, {useEffect} from 'react';
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
import { navigationRef } from './src/routes/rootNavigation';
// import SplashScreen from 'react-native-splash-screen';

// const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer ref={navigationRef}>
    <Provider store={store}>
    <AppStack />
    </Provider>
    </NavigationContainer>
  )
}

export default App;
