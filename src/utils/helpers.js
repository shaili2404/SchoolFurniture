import AsyncStorage from '@react-native-async-storage/async-storage';


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
      await AsyncStorage.removeItem('token');
    } catch (e) { }
  };

  export const STANDARD_SCREEN_SIZE = 812;