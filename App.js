import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { LoginScreen } from './src/screen/loginscreen';
import PasswordReset from './src/screen/PasswordReset';
import EmailSent from './src/component/emailSent';

const App = () => {
  return (
    <Provider store={store}>
      <View>
        {/* <LoginScreen /> */}
        <PasswordReset />
        {/* <EmailSent /> */}
      </View>
    </Provider>
  )
}

export default App;
