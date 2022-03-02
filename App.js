import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/routes';
import { navigationRef } from './src/routes/rootNavigation';
import SplashScreen from 'react-native-splash-screen';
import { FurnitureRequest } from './src/screen/school/FurnitureRequestScreen/furniturerequestscreen';
import { Functionalities } from './src/component/manufacturer/Functionalitiesuser';
import { setBasseUrl } from './src/redux/configration';

const App = () => {
  useEffect(() => {
    Platform.OS === 'ios' ?
      null :
      SplashScreen.hide();
    //setBasseUrl();
  }, [])
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <Functionalities />
      </Provider>
    </NavigationContainer>
  )
}

export default App;
