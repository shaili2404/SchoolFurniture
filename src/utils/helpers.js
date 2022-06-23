import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STANDARD_SCREEN_DIMENSIONS } from './constants';
import { navigate } from '../routes/rootNavigation';


export const storeData = async (key, value) => {
    try {
      let v = value;
      if (typeof value !== 'string') {
        v = JSON.stringify(value);
      }
      await AsyncStorage.setItem(key, v);
    } catch (e) {
      throw e;
    }
  };
  
  export const getSaveData = async (key) => {
    return await AsyncStorage.getItem(key);
  };
  
  export const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // clear error
    }
  };
  
  export const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) { }
  };

  export const logout = async () => {
    try {
      await AsyncStorage.removeItem('userDetails');
      navigate('LoginScreen');
    } catch (e) { }
  };

  export const RfW = (value) => {
    const dim = Dimensions.get('window');
    return dim.width * (value / STANDARD_SCREEN_DIMENSIONS.width);
  };
  
  export const RfH = (value) => {
    const dim = Dimensions.get('window');
    return dim.height * (value / STANDARD_SCREEN_DIMENSIONS.height);
  };