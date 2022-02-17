import React, { useEffect } from 'react';
import {
  Platform,
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { LoginScreen } from './src/screen/LoginScreen/loginscreen';

import PasswordReset from './src/screen/PasswordReset';
import EmailSent from './src/component/emailSent';
import SplashScreen from 'react-native-splash-screen';
import { FurnitureRequest } from './src/screen/school/FurnitureRequestScreen/furniturerequestscreen';
import { ManageUserDoe } from './src/screen/doe/ManageUserScreen/manageuserscreen';

const App = () => {
  useEffect(() => {
    {
      Platform.OS === 'ios' ?
        null :
        SplashScreen.hide();
    }
  }, [])
  return (
    <Provider store={store}>
      <View>
        {/* <LoginScreen /> */}
        {/* <FurnitureRequest /> */}
        <PasswordReset />
        {/* <EmailSent /> */}
        {/* <ManageUserDoe/> */}
      </View>
    </Provider>
  )
}

export default App;
