import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { LoginScreen } from './src/screen/loginscreen';

const App = () => {
  return (
    <Provider store={store}>
      <View>
        {/* <Text>
          Get App browser
        </Text> */}
        <LoginScreen />
      </View>
    </Provider>
  )
}

export default App;
