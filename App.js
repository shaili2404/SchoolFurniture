import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/routes';
import { navigationRef } from './src/routes/rootNavigation';
import SplashScreen from 'react-native-splash-screen';
import { setBasseUrl } from './src/redux/configration';

const App = () => {

  useEffect(() => {
    Platform.OS === 'ios' ?
      null :
      SplashScreen.hide();
    setBasseUrl();
  }, [])

  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();//Ignore all log notifications
  })

  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <AppStack />
        {/* <Search /> */}
      </Provider>
    </NavigationContainer>
  )
}

export default App;
