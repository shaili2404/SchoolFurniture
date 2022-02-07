import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <View>
        <Text>
          Get App
        </Text>
      </View>
    </Provider>
  )
}

export default App;
