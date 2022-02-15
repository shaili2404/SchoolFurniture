import React,{useEffect} from 'react';
import {
  Platform,
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { LoginScreen } from './src/screen/loginscreen';
import SplashScreen from 'react-native-splash-screen';


const App = () => {
  useEffect(() => {
    {Platform.OS === 'ios'?
    null:
    SplashScreen.hide();}
  }, [])
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
